import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { LuFileSearch, LuPencilRuler, LuWrench } from "react-icons/lu";

const steps = [
  {
    number: "01",
    icon: LuFileSearch,
    title: "Étude gratuite",
    description:
      "Nous analysons votre consommation, votre toiture et vos besoins afin de concevoir la solution solaire la plus adaptée à votre maison.",
  },
  {
    number: "02",
    icon: LuPencilRuler,
    title: "Conception sur mesure",
    description:
      "Nos experts dimensionnent votre installation et sélectionnent les meilleurs équipements pour maximiser votre production d'énergie.",
  },
  {
    number: "03",
    icon: LuWrench,
    title: "Installation & mise en service",
    description:
      "Nos techniciens installent votre système, effectuent les tests nécessaires et mettent votre installation en service pour une production immédiate.",
  },
];

const Process = () => {
  return (
    <section id="process" className="surface-tint section-lg">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Comment ça marche ?
            </span>
            <h2 className="mt-4 max-w-md t-h2 text-gray-900">
              Votre projet solaire en 3 étapes simples.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body max-w-md text-gray-500 lg:pb-2">
              De la première étude à la mise en service, RENEX vous accompagne à
              chaque étape.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* Progress rail */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-brand-indigo/40 via-brand-indigo/20 to-transparent"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            {steps.map(({ number, icon: Icon, title, description }, i) => (
              <Reveal key={number} delay={i * 0.08}>
                <article className="card-light group relative h-full overflow-hidden p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(16,24,40,0.05),0_28px_50px_-24px_rgba(27,36,100,0.4)]">
                  {/* Oversized ghost number */}
                  <span className="pointer-events-none absolute top-0 right-3 select-none text-[104px] font-extrabold leading-none text-gray-900/[0.045]">
                    {number}
                  </span>

                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-indigo/[0.07] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={24} className="text-brand-indigo" />
                  </div>

                  <p className="relative mt-6 text-xs font-bold tracking-[0.2em] text-brand-indigo">
                    ÉTAPE {number}
                  </p>
                  <h3 className="relative mt-2 t-h3 text-gray-900">{title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-gray-500">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Process;
