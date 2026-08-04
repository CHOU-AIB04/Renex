"use client";

import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";
import { LuArrowDown } from "react-icons/lu";
import { motion } from "framer-motion";

// Trend sparkline — animates its stroke on scroll into view.
const Sparkline = ({ color }) => (
  <svg
    viewBox="0 0 300 70"
    className="mt-4 h-14 w-full"
    fill="none"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M0 46 C 14 22, 26 14, 36 30 C 46 46, 56 10, 66 26 C 90 44, 140 52, 300 60"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
    />
  </svg>
);

const FactureCard = ({ label, amount, color, textColor, delay }) => (
  <Reveal delay={delay} className="w-full max-w-sm">
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition-colors duration-500 hover:border-white/20">
      {/* Ambient glow keyed to the metric */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-25 blur-3xl"
        style={{ background: color }}
      />

      <p className="relative t-eyebrow text-gray-400">{label}</p>
      <p
        className={`relative mt-3 text-4xl sm:text-5xl font-extrabold tabular-nums ${textColor}`}
      >
        <Counter to={amount} suffix=" DH" />
      </p>
      <p className="relative mt-1 text-sm text-gray-400">
        Facture mensuelle moyenne
      </p>
      <Sparkline color={color} />
    </div>
  </Reveal>
);

const Comparison = () => {
  return (
    <section
      id="comparaison"
      className="mx-auto w-[90%] overflow-hidden rounded-[32px] bg-black section-md"
    >
      <Wrapper className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left — message */}
        <div>
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Pourquoi payer
            </span>
            <h2 className="mt-4 t-h2 text-white">4 000 DH chaque mois…</h2>
            <p className="mt-4 max-w-md t-body text-gray-400">
              …quand vous pouvez produire votre propre énergie ?
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 flex max-w-sm items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-4xl flex items-center font-extrabold text-brand-green tabular-nums">
                -<Counter to={80} suffix=" %"/>
              </p>
              <p className="text-sm leading-snug text-gray-400">
                en moyenne sur votre facture d'électricité après
                installation
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right — before / after */}
        <div className="flex flex-col items-center gap-4">
          <FactureCard
            label="Avant"
            amount={4250}
            color="#B93F3F"
            textColor="text-brand-red"
            delay={0}
          />

          <Reveal delay={0.1}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
              <LuArrowDown size={20} className="text-white" />
            </div>
          </Reveal>

          <FactureCard
            label="Après solaire"
            amount={850}
            color="#4CAF6E"
            textColor="text-brand-green"
            delay={0.18}
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default Comparison;
