import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import GhlForm from "../GhlForm";
import Reveal from "../motion/Reveal";
import { CONTACT, IMG } from "@/lib/content";
import { LuCheck, LuPhone, LuMail, LuMapPin } from "react-icons/lu";

const guarantees = [
  "Étude gratuite",
  "Sans engagement",
  "Réponse en moins de 24h",
];

const contacts = [
  {
    icon: LuPhone,
    label: "Appelez-nous",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    icon: LuMail,
    label: "Écrivez-nous",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: LuMapPin,
    label: "Basés à Casablanca",
    value: "Intervention partout au Maroc",
  },
];

const CtaSection = () => {
  return (
    <section id="contact" className="px-[2%] md:px-[5%] pb-20 sm:pb-28">
      <div className="grain relative overflow-hidden rounded-3xl bg-black">
        <Image
          src={IMG}
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />

        <Wrapper className="relative py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
            {/* Left — message */}
            <Reveal>
              <span className="block t-eyebrow text-zinc-300">
                Votre avenir commence maintenant
              </span>
              <h2 className="mt-4 max-w-md t-h2 text-white">
                Demandez votre simulation solaire.
              </h2>
              <p className="mt-4 max-w-sm t-body text-gray-400">
                Remplissez le formulaire, un conseiller RENEX analyse votre
                situation et vous rappelle sous 24h.
              </p>

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
            </Reveal>

            {/* Right — embedded form, inline on the page.
                White card: the embed carries its own light theme, so a dark
                glass wrapper would leave it looking pasted on. */}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-[0_2px_6px_rgba(0,0,0,0.18),0_30px_60px_-24px_rgba(0,0,0,0.5)] sm:p-4">
                <GhlForm />
              </div>
            </Reveal>
          </div>

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
