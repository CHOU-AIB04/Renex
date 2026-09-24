"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FORM_OPTIONS } from "@/lib/content";

// Posts to our own API routes, which forward to the n8n webhooks server-side.
// See app/api/lead/route.js — this sidesteps CORS and hides the webhook URLs.
const SUBMIT_ENDPOINT = "/api/lead";
// Relance : quand le visiteur revient depuis un ancien message de rappel, la
// soumission part sur ce webhook-là, avec le contact_id du CRM.
const RECOVERY_ENDPOINT = "/api/lead-recovery";

// Params posés par le CRM sur le lien de relance :
// ?contact_id=…&name=…&phone=…&city=… (+ les utm_* repassés tels quels)

// Tolérance sur le nommage des params, au cas où le workflow n8n change
const readParam = (params, names) => {
  for (const n of names) {
    const v = params.get(n);
    if (v) return v.trim();
  }
  return "";
};

// "+212612345678", "0612345678", "212 6 12 34 56 78" → "612345678"
const toLocalPhone = (raw) =>
  String(raw || "")
    .replace(/\D/g, "")
    .replace(/^0+/, "")
    .replace(/^212/, "")
    .replace(/^0+/, "")
    .slice(0, 9);

// Attribution keys. Always present in every payload (empty string when
// unknown) so the n8n mapping never has to deal with a missing field.
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  // Orthographe utilisée côté CRM — envoyée en plus de utm_campaign, et
  // acceptée en entrée : les deux clés portent toujours la même valeur.
  "utm_compaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
];

// Clés qui doivent rester synchronisées entre elles (variantes d'écriture)
const TRACKING_MIRRORS = [["utm_campaign", "utm_compaign"]];

// UTMs only exist on the landing URL. Persisting them means a visitor who
// navigates, reloads, or opens the popup on another page still submits the
// attribution of the ad they arrived from.
const TRACKING_STORAGE_KEY = "renex_attribution";

const emptyTracking = () =>
  TRACKING_KEYS.reduce((acc, k) => ({ ...acc, [k]: "" }), {});

const readStoredTracking = () => {
  try {
    const raw =
      window.sessionStorage.getItem(TRACKING_STORAGE_KEY) ||
      window.localStorage.getItem(TRACKING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const storeTracking = (data) => {
  try {
    const raw = JSON.stringify(data);
    window.sessionStorage.setItem(TRACKING_STORAGE_KEY, raw);
    window.localStorage.setItem(TRACKING_STORAGE_KEY, raw);
  } catch {
    /* private mode / storage full — attribution falls back to the URL only */
  }
};

/**
 * Lead capture form, en une seule étape.
 *
 * Retour au formulaire unique à 6 champs après une semaine en 2 étapes
 * (18-24/09) : 2,5 leads qualifiés pour 100 $ contre 9,9 avec ce formulaire,
 * et 0,9 % des visites converties contre 4,6 %. Les contacts arrêtés à
 * l'étape 1 se sont révélés à 74 % des clics par erreur ("Mistake" en CRM).
 * "Profil" et "stade du projet" sont retirés : ils se demandent au téléphone.
 *
 * `tone="dark"` for the inline section on the dark CTA band,
 * `tone="light"` inside the white popup.
 */
export default function LeadForm({ tone = "light" }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const tracking = useRef({});
  // Renseigné uniquement quand on arrive depuis le lien de relance
  const [recovery, setRecovery] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    housing: "",
    roof: "",
    bill: "",
    consent: false,
  });

  // Capture UTM / click ids so the CRM can attribute the lead to the ad.
  // Priority for each key: current URL → stored earlier in the visit → "".
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = readStoredTracking();

    const attribution = emptyTracking();
    let foundInUrl = false;

    TRACKING_KEYS.forEach((k) => {
      const fromUrl = params.get(k);
      if (fromUrl) {
        attribution[k] = fromUrl;
        foundInUrl = true;
      } else if (stored[k]) {
        attribution[k] = stored[k];
      }
    });

    // utm_campaign / utm_compaign : peu importe l'orthographe reçue dans l'URL,
    // les deux repartent renseignées vers n8n.
    TRACKING_MIRRORS.forEach(([a, b]) => {
      if (attribution[a] && !attribution[b]) attribution[b] = attribution[a];
      else if (attribution[b] && !attribution[a]) attribution[a] = attribution[b];
    });

    // Keep the entry point of the visit, not the page the form sits on
    attribution.landing_url =
      (foundInUrl ? window.location.href : stored.landing_url) ||
      window.location.href;
    attribution.referrer = stored.referrer || document.referrer || "";

    storeTracking(attribution);

    tracking.current = {
      ...attribution,
      page_url: window.location.href,
      event_id: `lead_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 9)}`,
    };

    /* ─── Relance ───────────────────────────────────────────────────────────
       Les liens de rappel déjà envoyés portent
       ?contact_id=…&name=…&phone=…&city=… : on préremplit ce que le visiteur
       a déjà donné, il ne lui reste que les questions sur son projet. */
    const contactId = readParam(params, ["contact_id", "contactId", "cid"]);
    const name = readParam(params, ["name", "fullName", "full_name", "nom"]);
    const phoneParam = readParam(params, ["phone", "telephone", "tel"]);
    const cityParam = readParam(params, ["city", "ville"]);

    if (contactId || (name && phoneParam)) {
      const localPhone = toLocalPhone(phoneParam);

      setForm((f) => ({
        ...f,
        fullName: name || f.fullName,
        phone: localPhone || f.phone,
        city: cityParam || f.city,
        // Le consentement a déjà été donné lors de la première visite
        consent: true,
      }));

      setRecovery({
        contact_id: contactId,
        name,
        phone: phoneParam,
        city: cityParam,
      });


      pushDataLayer({
        event: "form_recovery_open",
        form_name: "contact-form",
        contact_id: contactId,
        event_id: tracking.current.event_id,
      });
    }

    router.prefetch("/merci");
  }, [router]);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  /**
   * Phone: the +212 prefix is fixed in the UI, so we only keep the local part.
   * Strips non-digits, drops a leading 0 (Moroccans habitually type "06…"),
   * and caps at 9 digits — the length of a Moroccan number without its 0.
   */
  const handlePhoneChange = (e) => {
    const local = e.target.value
      .replace(/\D/g, "")
      // Order matters: 00 (intl. exit code) → 212 (country) → 0 (trunk).
      // Handles 0612…, +212 6…, 00212 6… and 212 6… without doubling the
      // prefix. Safe to strip 212: no Moroccan local number starts with it.
      .replace(/^0+/, "")
      .replace(/^212/, "")
      .replace(/^0+/, "")
      .slice(0, 9);

    setForm((f) => ({ ...f, phone: local }));
  };

  // Full international number, built from the fixed prefix + what was typed
  const fullPhone = `+212${form.phone}`;

  const formValid =
    form.fullName.trim().length > 1 &&
    // 9 digits exactly, once the leading 0 is stripped (e.g. 612345678)
    form.phone.length === 9 &&
    form.city &&
    form.housing &&
    form.roof &&
    form.bill &&
    form.consent;

  const pushDataLayer = (payload) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid || sending) return;

    setSending(true);
    setError("");

    try {
      // Relance : le lead existe déjà dans le CRM, l'étape 2 part donc sur le
      // webhook de récupération avec son contact_id, pas sur le webhook normal.
      const res = await fetch(recovery ? RECOVERY_ENDPOINT : SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the phone in full international form so the CRM can dial /
        // WhatsApp it directly, plus the raw local part for reference.
        body: JSON.stringify({
          ...form,
          phone: fullPhone,
          phone_local: form.phone,
          // Champs retirés du formulaire, gardés vides pour le mapping n8n
          profile: "",
          stage: "",
          form_stage: recovery ? "recovered" : "complete",
          recovered: Boolean(recovery),
          contact_id: recovery?.contact_id || "",
          ...emptyTracking(),
          ...tracking.current,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Tracking centralise dans GTM : le container ecoute cet evenement et
      // declenche lui-meme le Lead Meta. On transmet event_id pour que le tag
      // le passe en eventID, ce qui permet la deduplication avec l'event
      // serveur (CAPI) portant le meme identifiant.
      pushDataLayer({
        event: "generate_lead",
        form_name: "contact-form",
        form_stage: recovery ? "recovered" : "complete",
        contact_id: recovery?.contact_id || "",
        event_id: tracking.current.event_id,
      });

      router.push("/merci");
    } catch {
      setError(
        "Une erreur est survenue. Merci de réessayer ou de nous contacter par WhatsApp."
      );
      setSending(false);
    }
  };

  const dark = tone === "dark";

  const label = `block text-xs font-semibold mb-1.5 ${
    dark ? "text-white/80" : "text-gray-700"
  }`;

  const field = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    dark
      ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/10 [&>option]:bg-[#0A0A0A]"
      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20"
  }`;

  const primaryBtn =
    "flex w-full sm:w-auto shrink-0 items-center justify-center rounded-full bg-white text-brand-indigo px-10 py-4 text-sm font-semibold transition hover:scale-102 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <form onSubmit={handleSubmit} id="contact-form">
      {/* Relance : on rassure le visiteur, ses infos sont déjà enregistrées */}
      {recovery && (
        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
            dark
              ? "border-white/15 bg-white/[0.06] text-white/75"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          {recovery.name ? (
            <>
              Bon retour <strong>{recovery.name}</strong> — vos coordonnées sont
              déjà enregistrées.
            </>
          ) : (
            <>Vos coordonnées sont déjà enregistrées.</>
          )}{" "}
          Il ne reste que quelques informations sur votre projet pour recevoir
          votre étude gratuite.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {/* Nom */}
        <div>
          <label htmlFor="fullName" className={label}>
            Nom et prénom *
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Youssef Bennani"
            className={field}
          />
        </div>

        {/* Téléphone — +212 is fixed, the visitor types the local number only */}
        <div>
          <label htmlFor="phone" className={label}>
            Téléphone *
          </label>
          <div
            className={`flex items-stretch overflow-hidden rounded-xl border transition ${
              dark
                ? "border-white/15 bg-white/[0.06] focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10"
                : "border-gray-200 bg-white focus-within:border-brand-indigo focus-within:ring-2 focus-within:ring-brand-indigo/20"
            }`}
          >
            {/* No flag emoji: Windows renders regional-indicator pairs as
                bare letters ("MA"), which wrapped onto a second line. */}
            <span
              className={`flex shrink-0 select-none items-center whitespace-nowrap border-r px-3.5 text-sm font-semibold ${
                dark
                  ? "border-white/15 bg-white/[0.04] text-white/80"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
            >
              +212
            </span>

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="6 00 00 00 00"
              aria-describedby="phone-hint"
              className={`w-full bg-transparent px-4 py-3 text-sm outline-none ${
                dark
                  ? "text-white placeholder:text-white/35"
                  : "text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </div>

          <p
            id="phone-hint"
            className={`mt-1.5 text-[11px] ${
              dark ? "text-white/40" : "text-gray-400"
            }`}
          >
            Sans le 0 initial — ex. 6 12 34 56 78
          </p>
        </div>

        {/* Ville */}
        <div className="sm:col-span-2">
          <label htmlFor="city" className={label}>
            Ville *
          </label>
          <select
            id="city"
            required
            value={form.city}
            onChange={set("city")}
            className={field}
          >
            <option value="">Sélectionner…</option>
            {FORM_OPTIONS.cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Logement */}
        <div>
          <label htmlFor="housing" className={label}>
            Type de logement *
          </label>
          <select
            id="housing"
            required
            value={form.housing}
            onChange={set("housing")}
            className={field}
          >
            <option value="">Sélectionner…</option>
            {FORM_OPTIONS.housing.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Toiture */}
        <div>
          <label htmlFor="roof" className={label}>
            Type de toiture *
          </label>
          <select
            id="roof"
            required
            value={form.roof}
            onChange={set("roof")}
            className={field}
          >
            <option value="">Sélectionner…</option>
            {FORM_OPTIONS.roof.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Facture */}
        <div className="sm:col-span-2">
          <label htmlFor="bill" className={label}>
            Facture mensuelle moyenne *
          </label>
          <select
            id="bill"
            required
            value={form.bill}
            onChange={set("bill")}
            className={field}
          >
            <option value="">Sélectionner…</option>
            {FORM_OPTIONS.bills.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Consentement */}
        <label className="sm:col-span-2 flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={set("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#1b2464]"
          />
          <span
            className={`text-xs leading-relaxed ${
              dark ? "text-white/55" : "text-gray-500"
            }`}
          >
            J&apos;accepte d&apos;être contacté par RENEX au sujet de ma
            demande. *
          </span>
        </label>
      </div>

      {error && <p className="mt-4 text-xs font-medium text-brand-red">{error}</p>}

      <div className="mt-7 flex flex-col sm:flex-row-reverse sm:items-center gap-4">
        <button
          type="submit"
          disabled={!formValid || sending}
          className={primaryBtn}
        >
          {sending ? "Envoi…" : "Obtenir mon étude gratuite"}
        </button>

        <p
          className={`text-center sm:text-left text-[11px] w-full leading-relaxed ${
            dark ? "text-white/40" : "text-gray-400"
          }`}
        >
          🔒 Vos données restent confidentielles. Pas de spam. Réponse en moins de 24h.
        </p>
      </div>
    </form>
  );
}
