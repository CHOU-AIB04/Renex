"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FORM_OPTIONS } from "@/lib/content";

// Posts to our own API route, which forwards to the n8n webhook server-side.
// See app/api/lead/route.js — this sidesteps CORS and hides the webhook URL.
const SUBMIT_ENDPOINT = "/api/lead";

/**
 * Lead capture form — fields exactly as specified in the client report.
 * `tone="dark"` for the inline section on the dark CTA band,
 * `tone="light"` inside the white popup.
 */
export default function LeadForm({ tone = "light" }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const tracking = useRef({});

  const [form, setForm] = useState({
    fullName: "",
    profile: "",
    phone: "",
    city: "",
    housing: "",
    roof: "",
    bill: "",
    stage: "",
    consent: false,
  });

  // Capture UTM / click ids so the CRM can attribute the lead to the ad
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "gclid",
    ].forEach((k) => {
      const v = params.get(k);
      if (v) data[k] = v;
    });
    data.page_url = window.location.href;
    data.event_id = `lead_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;
    tracking.current = data;

    router.prefetch("/merci");
  }, [router]);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const pick = (key, value) => setForm((f) => ({ ...f, [key]: value }));

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

  const isValid =
    form.fullName.trim().length > 1 &&
    form.profile &&
    // 9 digits exactly, once the leading 0 is stripped (e.g. 612345678)
    form.phone.length === 9 &&
    form.city &&
    form.housing &&
    form.roof &&
    form.bill &&
    form.stage &&
    form.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || sending) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the phone in full international form so the CRM can dial /
        // WhatsApp it directly, plus the raw local part for reference.
        body: JSON.stringify({
          ...form,
          phone: fullPhone,
          phone_local: form.phone,
          ...tracking.current,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: tracking.current.event_id });
      }

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

  const chip = (active) =>
    `rounded-full border px-4 py-2 text-xs font-semibold transition ${
      active
        ? "border-brand-indigo bg-brand-indigo text-white"
        : dark
          ? "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/35"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit}>
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

        {/* Vous êtes ? */}
        <div className="sm:col-span-2">
          <span className={label}>Vous êtes ? *</span>
          <div className="flex flex-wrap gap-2">
            {FORM_OPTIONS.profile.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => pick("profile", opt)}
                className={chip(form.profile === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Ville */}
        <div>
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
        <div>
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

        {/* Avancement */}
        <div className="sm:col-span-2">
          <span className={label}>Où en êtes-vous dans votre projet ? *</span>
          <div className="flex flex-wrap gap-2">
            {FORM_OPTIONS.stage.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => pick("stage", opt)}
                className={chip(form.stage === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
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
          disabled={!isValid || sending}
          className="flex w-full sm:w-auto shrink-0 items-center justify-center rounded-full bg-brand-indigo px-10 py-4 text-sm font-semibold text-white transition hover:bg-brand-indigo-dark disabled:cursor-not-allowed disabled:opacity-40"
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
