"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuX } from "react-icons/lu";

// TODO: point this at the real GoHighLevel webhook
const WEBHOOK_URL = "";

const PROPERTY_TYPES = ["Villa", "Appartement", "Local professionnel"];
const BILL_RANGES = [
  "Moins de 1 000 DH",
  "1 000 – 2 500 DH",
  "2 500 – 4 000 DH",
  "Plus de 4 000 DH",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20";

const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

export default function LeadFormDialog({ trigger }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    propertyType: "",
    bill: "",
    consent: false,
  });

  // Capture UTM / click ids so the CRM can attribute the lead to the ad
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "gclid",
    ];
    const data = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) data[k] = v;
    });
    data.page_url = window.location.href;
    data.event_id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    setTracking(data);

    // Warm the confirmation route so the post-submit redirect is instant
    router.prefetch("/merci");
  }, [router]);

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const isValid =
    form.fullName.trim().length > 1 &&
    form.phone.trim().length >= 9 &&
    form.city.trim() &&
    form.propertyType &&
    form.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || sending) return;

    setSending(true);
    setError("");

    try {
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, ...tracking }),
        });
        if (!res.ok) throw new Error("Request failed");
      }

      // Meta Pixel — client-side Lead event (dedup with the server CAPI call
      // via the shared event_id)
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: tracking.event_id });
      }

      // Dedicated confirmation URL — gives Meta/Google a clean destination
      // conversion to track, on top of the Pixel event above.
      router.push("/merci");
    } catch {
      setError(
        "Une erreur est survenue. Merci de réessayer ou de nous contacter par WhatsApp."
      );
      setSending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={trigger} />

      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden rounded-3xl border-none p-0"
      >
        {/* Header */}
        <div className="relative bg-black px-7 pb-7 pt-7 sm:px-10">
          <DialogClose
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <LuX size={18} />
          </DialogClose>

          <span className="block t-eyebrow text-brand-indigo">
            Étude gratuite
          </span>
          <DialogTitle className="mt-2 pr-12 text-2xl sm:text-3xl font-extrabold text-white">
            Recevez votre étude solaire
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-gray-400">
            Sans engagement · Réponse en moins de 24h
          </DialogDescription>
        </div>

        {/* Body — two columns on desktop so the form fits without scrolling */}
        <div className="max-h-[75vh] overflow-y-auto bg-white px-7 py-8 sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Prénom et nom *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="Youssef Bennani"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Téléphone / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="06 00 00 00 00"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  Ville *
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={update("city")}
                  placeholder="Casablanca"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="bill" className={labelClass}>
                  Facture d&apos;électricité mensuelle
                </label>
                <select
                  id="bill"
                  value={form.bill}
                  onChange={update("bill")}
                  className={inputClass}
                >
                  <option value="">Sélectionner…</option>
                  {BILL_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full width */}
              <div className="sm:col-span-2">
                <span className={labelClass}>Type de bien *</span>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, propertyType: type }))
                      }
                      className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                        form.propertyType === type
                          ? "border-brand-indigo bg-brand-indigo text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <label className="sm:col-span-2 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={update("consent")}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#1b2464]"
                />
                <span className="text-xs leading-relaxed text-gray-500">
                  J&apos;accepte d&apos;être contacté par RENEX au sujet de ma
                  demande. *
                </span>
              </label>
            </div>

            {error && (
              <p className="mt-4 text-xs font-medium text-brand-red">{error}</p>
            )}

            {/* Footer row — button sits beside the reassurance copy on desktop */}
            <div className="mt-7 flex flex-col sm:flex-row-reverse sm:items-center gap-4">
              <button
                type="submit"
                disabled={!isValid || sending}
                className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-brand-indigo px-10 py-4 text-sm font-semibold text-white transition hover:bg-brand-indigo-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Envoi…" : "Recevoir mon étude gratuite"}
              </button>

              <p className="text-center sm:text-left text-[11px] leading-relaxed text-gray-400">
                🔒 Vos données restent confidentielles. Pas de spam.
                <br className="hidden sm:block" /> Réponse en moins de 24h.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
