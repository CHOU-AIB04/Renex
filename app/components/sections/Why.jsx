"use client";

import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { LuHouse, LuTrendingUp, LuSmartphone, LuShieldCheck } from "react-icons/lu";

// TODO: one dedicated photo per benefit — the repeated placeholder is the
// single biggest thing making this page read as unfinished.
const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

const benefits = [
  {
    icon: LuHouse,
    title: "Architecture",
    description: "Une installation qui respecte votre maison.",
  },
  {
    icon: LuTrendingUp,
    title: "Performance",
    description: "Jusqu'à 80 % d'économie sur votre facture d'électricité.",
  },
  {
    icon: LuSmartphone,
    title: "Intelligence",
    description: "Suivi de votre production et consommation en temps réel.",
  },
  {
    icon: LuShieldCheck,
    title: "Fiabilité",
    description: "Des composants premium pour une tranquillité totale.",
  },
];

const Why = () => {
  return (
    <section id="pourquoi" className="section-lg">
      <Wrapper>
        {/* Header — split so it isn't the same stacked block as every other section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Pourquoi Renex
            </span>
            <h2 className="mt-4 t-h2 text-gray-900">
              L&apos;énergie solaire,
              <br />
              repensée.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body max-w-md text-gray-500 lg:pb-2">
              Quatre exigences non négociables sur chaque installation que nous
              livrons — de l&apos;intégration architecturale au suivi de
              production.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-indigo/20 hover:shadow-[0_28px_60px_-30px_rgba(27,36,100,0.55)]">
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={IMG}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {/* Bottom fade so the badge always sits on a dark edge */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
                </div>

                {/* Icon badge — overlaps the image edge */}
                <div className="relative z-10 -mt-7 ml-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110">
                  <Icon
                    size={22}
                    className="text-brand-indigo transition-transform duration-500 group-hover:-rotate-6"
                  />
                </div>

                {/* Copy */}
                <div className="px-6 pb-7 pt-4">
                  <h3 className="t-h3 text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Why;
