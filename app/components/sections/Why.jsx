import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { LuAward, LuShieldCheck, LuLayers, LuSmartphone } from "react-icons/lu";

// Figures per the client report (RNO-RP213) — do not change without approval
const reasons = [
  {
    icon: LuAward,
    stat: "+100 installations",
    title: "Une expertise concrète.",
    description:
      "Plus de 100 installations solaires réalisées avec succès auprès de particuliers et de professionnels.",
  },
  {
    icon: LuShieldCheck,
    stat: "30 ans de garantie",
    title: "Investissez en toute sérénité.",
    description:
      "Des équipements et des installations conçus pour offrir des performances durables pendant plusieurs décennies.",
  },
  {
    icon: LuLayers,
    stat: "Matériel Tier 1",
    title: "Les meilleures technologies du marché.",
    description:
      "Nous sélectionnons uniquement des composants premium provenant des leaders mondiaux de l'énergie solaire.",
  },
  {
    icon: LuSmartphone,
    stat: "Technologie intelligente",
    title: "Contrôlez votre installation en temps réel.",
    description:
      "Suivez votre production, votre consommation et vos économies directement depuis votre smartphone grâce à Huawei FusionSolar.",
  },
];

const Why = () => {
  return (
    <section
      id="pourquoi"
      className="surface-ink grain relative w-[95%] mx-auto overflow-hidden rounded-[50px] md:rounded-[100px] section-lg"
    >
      <Wrapper className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
          <Reveal>
            <span className="block t-eyebrow text-zinc-300">
              Pourquoi Renex ?
            </span>
            <h2 className="mt-4 t-h2 text-white">
              L&apos;énergie solaire,
              <br />
              bien faite.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body max-w-md text-gray-400 lg:pb-2">
              Une expertise reconnue, des équipements premium et un
              accompagnement complet pour garantir la réussite de votre projet
              solaire.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map(({ icon: Icon, stat, title, description }, i) => (
            <Reveal key={stat} delay={(i % 2) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-indigo/40 hover:bg-white/[0.06]">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-indigo/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-indigo/25">
                  <Icon size={22} className="text-white" />
                </div>

                <p className="relative mt-6 text-2xl sm:text-3xl font-extrabold text-white">
                  {stat}
                </p>
                <h3 className="relative mt-2 text-[15px] font-bold text-brand-green">
                  {title}
                </h3>
                <p className="relative mt-2.5 max-w-sm text-sm leading-relaxed text-gray-400">
                  {description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Why;
