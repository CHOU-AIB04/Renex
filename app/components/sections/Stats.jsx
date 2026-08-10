import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";

/**
 * Key figures — centred heading, then a row of oversized numbers each backed by
 * a small rotated-square accent.
 *
 * Layout: 5 across on desktop; on mobile the first three share a row and the
 * last two share the next (6-col grid → 2+2+2 then 3+3).
 *
 * All figures come from the client report (RNO-RP213).
 */
const stats = [
  {
    to: 100,
    prefix: "+",
    label: "installations réalisées",
    span: "col-span-2",
  },
  {
    to: 30,
    suffix: " ans",
    label: "de garantie sur nos installations",
    span: "col-span-2",
  },
  {
    to: 60,
    prefix: "+",
    suffix: "%",
    label: "d'économie sur votre facture",
    span: "col-span-2",
  },
  {
    to: 98,
    prefix: "+",
    label: "avis positifs",
    span: "col-span-3",
  },
  {
    // Range, so no count-up on this one
    text: "2-5",
    suffix: " j",
    label: "pour installer votre système",
    span: "col-span-3",
  },
];

/** Rotated-square accent sitting behind the top-left of each figure. */
const Accent = ({ index }) => (
  <span aria-hidden className="pointer-events-none absolute -left-3 -top-2">
    <span
      className={`block h-9 w-9 rotate-45 rounded-[6px] ${
        index % 2 === 0 ? "bg-brand-green/35" : "bg-brand-indigo/20"
      }`}
    />
    <span
      className={`absolute left-7 top-0 block h-2.5 w-2.5 rotate-45 rounded-[2px] ${
        index % 2 === 0 ? "bg-brand-indigo/25" : "bg-brand-green/45"
      }`}
    />
  </span>
);

const Stats = () => {
  return (
    <section id="chiffres" className="surface-base section-lg">
      <Wrapper>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center t-h2 text-brand-navy">
            Des résultats concrets,
            <br />
            pas des promesses.
          </h2>
        </Reveal>

        {/* Extra side padding so the row breathes inside the section */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-6 gap-y-12 gap-x-4 px-2 sm:gap-x-8 sm:px-10 lg:grid-cols-5 lg:gap-x-10 lg:px-16 xl:px-0">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className={`${stat.span} lg:col-span-1`}
            >
              {/* Centred on mobile, left-aligned from lg up */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Accent is anchored to the number, not the column, so it
                    stays glued to it when the layout centres on mobile. */}
                <div className="relative inline-block">
                  <Accent index={i} />

                  <p className="relative text-[38px] sm:text-5xl lg:text-[52px] font-bold leading-none tracking-tight text-brand-indigo tabular-nums">
                    {stat.text ? (
                      <span className="flex items-center justify-center lg:justify-start">
                        {stat.text}
                        <span className="ml-1">{stat.suffix}</span>
                      </span>
                    ) : (
                      <Counter
                        to={stat.to}
                        decimals={stat.decimals}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    )}
                  </p>
                </div>

                <p className="mt-3 max-w-[150px] text-[12px] font-semibold leading-snug text-brand-indigo/75 lg:max-w-[190px]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Stats;
