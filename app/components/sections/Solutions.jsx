import React from "react";
import ScrollLink from "../ScrollLink";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";
import { LuSunMedium, LuBatteryCharging, LuArrowRight } from "react-icons/lu";

/**
 * Two solar formulas — grid-tied (60 %) vs hybrid with storage (90 %).
 * Light card + brand-filled card, following the reference layout but using
 * the RENEX indigo/navy palette instead of the reference's cyan.
 */

const solutions = [
  {
    icon: LuSunMedium,
    name: "Solaire autoconsommation",
    value: 60,
    label: "d'économie sur votre facture",
    description:
      "Vous produisez votre électricité en journée et consommez directement ce que vous générez. La solution la plus rapide à installer et la plus accessible.",
    points: ["Sans batterie", "Installation en 2 à 5 jours", "Retour sur investissement rapide"],
    featured: false,
  },
  {
    icon: LuBatteryCharging,
    name: "Solaire + stockage",
    value: 90,
    label: "d'économie sur votre facture",
    description:
      "Votre surplus de production est stocké dans une batterie et réutilisé le soir. Vous atteignez une quasi-indépendance énergétique.",
    points: [
      "Batterie Huawei incluse",
      "Énergie disponible la nuit",
      "Protection contre les coupures",
    ],
    featured: true,
  },
];

const Solutions = () => {
  return (
    <section id="solutions" className="surface-base section-lg">
      <Wrapper>
        {/* Soft gradient panel, like the reference */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-white via-[#F4F6FC] to-[#E8EDF9] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Nos solutions
            </span>
            <h2 className="mt-4 max-w-xl t-h2 text-brand-navy">
              Deux formules, une seule ambition.
            </h2>
            <p className="mt-4 max-w-xl t-body text-gray-500">
              Selon votre consommation et vos objectifs, RENEX conçoit une
              installation avec ou sans stockage. Notre étude gratuite détermine
              la formule la plus rentable pour votre maison.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map(
              (
                { icon: Icon, name, value, label, description, points, featured },
                i
              ) => (
                <Reveal key={name} delay={i * 0.1}>
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                      featured
                        ? "bg-gradient-to-br from-[#243073] via-brand-indigo to-brand-navy shadow-[0_24px_60px_-24px_rgba(27,36,100,0.7)]"
                        : "border border-black/[0.07] bg-white/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                    }`}
                  >
                    {/* Decoration — waves on the filled card, lines on the light one */}
                    {featured ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 400 240"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full"
                      >
                        <path
                          d="M0 190 C 90 110, 150 210, 240 140 C 310 85, 360 130, 400 105 L400 240 L0 240Z"
                          fill="rgba(255,255,255,0.10)"
                        />
                        <path
                          d="M0 225 C 80 165, 170 235, 250 185 C 320 142, 365 178, 400 160 L400 240 L0 240Z"
                          fill="rgba(255,255,255,0.14)"
                        />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden
                        viewBox="0 0 200 200"
                        className="pointer-events-none absolute -right-6 -top-6 h-48 w-48"
                      >
                        {[0, 22, 44, 66].map((offset) => (
                          <line
                            key={offset}
                            x1={60 + offset}
                            y1="-10"
                            x2={-10 + offset}
                            y2="140"
                            stroke="rgba(27,36,100,0.10)"
                            strokeWidth="1.5"
                          />
                        ))}
                      </svg>
                    )}

                    {/* Icon */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110 ${
                        featured ? "bg-white/15" : "bg-brand-indigo/[0.08]"
                      }`}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className={featured ? "text-white" : "text-brand-indigo"}
                      />
                    </div>

                    {/* Figure */}
                    <p
                      className={`relative mt-7 text-[56px] sm:text-[64px] font-extralight leading-none tracking-tight tabular-nums ${
                        featured ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      <Counter to={value} suffix="%" />
                    </p>
                    <p
                      className={`relative mt-2 text-sm ${
                        featured ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </p>

                    {/* Name + description */}
                    <h3
                      className={`relative mt-8 t-h3 ${
                        featured ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {name}
                    </h3>
                    <p
                      className={`relative mt-3 text-sm leading-relaxed ${
                        featured ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {description}
                    </p>

                    {/* Points */}
                    <ul className="relative mt-6 space-y-2.5">
                      {points.map((point) => (
                        <li
                          key={point}
                          className={`flex items-center gap-2.5 text-[13px] ${
                            featured ? "text-white/80" : "text-gray-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              featured ? "bg-brand-green" : "bg-brand-indigo/40"
                            }`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* CTA pinned to the bottom so both cards line up */}
                    <div className="relative mt-auto pt-8">
                      <ScrollLink
                        href="#contact"
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                          featured
                            ? "bg-white text-brand-navy hover:bg-white/90"
                            : "bg-brand-indigo text-white hover:bg-brand-indigo-dark"
                        }`}
                      >
                        Savoir laquelle me convient
                        <LuArrowRight size={16} />
                      </ScrollLink>
                    </div>
                  </article>
                </Reveal>
              )
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Solutions;
