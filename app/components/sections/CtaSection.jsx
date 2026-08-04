"use client";

import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import LeadFormDialog from "../LeadFormDialog";
import { motion } from "framer-motion";
import { LuCheck, LuPhone, LuMail, LuMapPin, LuArrowRight } from "react-icons/lu";

// TODO: replace with the real client contact details
const PHONE = "06 00 00 00 00";
const PHONE_HREF = "tel:+212600000000";
const EMAIL = "contact@renex.ma";

const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

const guarantees = [
  "Étude gratuite",
  "Sans engagement",
  "Réponse en moins de 24h",
];

const contacts = [
  { icon: LuPhone, label: "Appelez-nous", value: PHONE, href: PHONE_HREF },
  { icon: LuMail, label: "Écrivez-nous", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: LuMapPin,
    label: "Basés à Casablanca",
    value: "Intervention partout au Maroc",
  },
];

const CtaSection = () => {
  return (
    <section id="contact" className="px-[5%] pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-black">
        {/* Background */}
        <Image
          src={IMG}
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />

        <Wrapper className="relative py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-center"
          >
            {/* Left — message */}
            <div>
              <span className="block t-eyebrow text-amber-500 ">
                Votre avenir commence maintenant
              </span>
              <h2 className="mt-4 max-w-lg t-h2 text-white">
                Construisons votre indépendance énergétique.
              </h2>

              <ul className="mt-8 space-y-3">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                      <LuCheck size={13} className="text-brand-green" />
                    </span>
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — CTA card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
              <p className="text-lg font-bold text-white">
                Recevez votre étude solaire personnalisée
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Dites-nous en deux minutes où vous en êtes. Un conseiller RENEX
                vous rappelle sous 24h avec une estimation de production et de
                rentabilité.
              </p>

              <LeadFormDialog
                trigger={
                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-indigo py-4 text-sm font-semibold text-white transition hover:bg-brand-indigo-dark">
                    Demander mon étude gratuite
                    <LuArrowRight size={18} />
                  </button>
                }
              />

              <p className="mt-4 text-center text-[11px] text-gray-500">
                🔒 Vos données restent confidentielles. Pas de spam.
              </p>
            </div>
          </motion.div>

          {/* Contact strip */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {contacts.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15">
                    <Icon size={17} className="text-white" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white">
                      {label}
                    </span>
                    <span className="block text-xs text-gray-400">{value}</span>
                  </span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 transition hover:opacity-80"
                >
                  {content}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default CtaSection;
