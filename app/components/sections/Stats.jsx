import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";
import { LuShieldCheck, LuSunMedium, LuTrendingDown, LuStar } from "react-icons/lu";

/**
 * Bento stats grid.
 * Oversized ultra-thin figures + thin line icons, one tall dark tile against
 * light tiles. Figures per the client report (RNO-RP213).
 */

// Shared thin-stroke icon look
const iconProps = { strokeWidth: 1 };

const Stats = () => {
  return (
    <section id="chiffres" className="surface-base section-lg">
      <Wrapper>
        <Reveal>
          <span className="block t-eyebrow text-brand-indigo">
            RENEX en chiffres
          </span>
          <h2 className="mt-4 max-w-lg t-h2 text-gray-900">
            Des résultats, pas des promesses.
          </h2>
        </Reveal>

        {/* Equal row heights at every breakpoint so tiles never go ragged */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {/* ---- Tall dark tile ---- */}
          <Reveal className="sm:row-span-2 lg:col-span-2">
            <article className="surface-ink grain relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] p-8">
              <LuShieldCheck
                size={64}
                {...iconProps}
                className="text-white/70"
              />

              <div>
                <p className="text-[76px] font-extralight leading-none tracking-tight text-white tabular-nums">
                  <Counter to={30} />
                </p>
                <p className="mt-4 text-sm text-white/60">ans de garantie</p>
              </div>
            </article>
          </Reveal>

          {/* ---- Big light tile ---- */}
          <Reveal className="sm:row-span-2 lg:col-span-2" delay={0.08}>
            <article className="card-light flex h-full flex-col justify-between rounded-[32px] p-8">
              <LuSunMedium
                size={52}
                {...iconProps}
                className="text-gray-300"
              />

              <div>
                <p className="text-[72px] sm:text-[88px] font-extralight leading-[0.85] tracking-tighter text-gray-900 tabular-nums">
                  <Counter to={100} prefix="+" />
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  installations réalisées
                </p>
              </div>
            </article>
          </Reveal>

          {/* ---- Small tile 1 ---- */}
          <Reveal delay={0.16}>
            <article className="card-light flex h-full flex-col justify-between rounded-[32px] p-7">
              <LuTrendingDown
                size={34}
                {...iconProps}
                className="text-gray-300"
              />

              <div>
                <p className="text-[42px] font-extralight leading-none tracking-tight text-gray-900 tabular-nums">
                  <Counter to={60} suffix="%" />
                </p>
                <p className="mt-2.5 text-sm text-gray-500">
                  d&apos;économie sur votre facture
                </p>
              </div>
            </article>
          </Reveal>

          {/* ---- Small tile 2 ---- */}
          <Reveal delay={0.24}>
            <article className="card-light flex h-full flex-col justify-between rounded-[32px] p-7">
              <LuStar size={34} {...iconProps} className="text-gray-300" />

              <div>
                <p className="text-[42px] font-extralight leading-none tracking-tight text-gray-900 tabular-nums">
                  <Counter to={4.9} decimals={1} />
                </p>
                <p className="mt-2.5 text-sm text-gray-500">
                  note moyenne sur Google
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Wrapper>
    </section>
  );
};

export default Stats;
