"use client";

import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { motion } from "framer-motion";
import {
  LuFileSearch,
  LuMonitorCog,
  LuWrench,
  LuCpu,
  LuBatteryCharging,
  LuSun,
  LuPanelTop,
  LuShieldCheck,
} from "react-icons/lu";

// TODO: replace with real product shots per component
const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

const steps = [
  {
    number: "01",
    icon: LuFileSearch,
    title: "Étude gratuite",
    description:
      "Nous analysons votre consommation et vos besoins pour dimensionner la solution idéale.",
  },
  {
    number: "02",
    icon: LuMonitorCog,
    title: "Conception",
    description:
      "Simulation 3D, estimation de production et de rentabilité. Vous validez, nous planifions.",
  },
  {
    number: "03",
    icon: LuWrench,
    title: "Installation",
    description:
      "En quelques jours, sans interruption de votre quotidien. Mise en service et suivi inclus.",
  },
];

const equipment = [
  {
    icon: LuCpu,
    name: "Onduleur Huawei",
    description: "Haute performance et rendement optimal.",
    warranty: "10 ans",
  },
  {
    icon: LuBatteryCharging,
    name: "Batterie Huawei",
    description: "Stockez votre énergie en toute sécurité.",
    warranty: "10 ans",
  },
  {
    icon: LuSun,
    name: "Panneaux Jinko",
    description: "Panneaux haut rendement et haute durabilité.",
    warranty: "12 ans",
  },
  {
    icon: LuPanelTop,
    name: "Structure aluminium",
    description: "Résistante et conçue pour durer.",
    warranty: "22 ans",
  },
  {
    icon: LuShieldCheck,
    name: "Protection AC / DC",
    description: "Sécurité maximale pour votre installation.",
    warranty: "10 ans",
  },
];

const Process = () => {
  return (
    <>
      {/* ---------- How it works — numbered timeline ---------- */}
      <section id="process" className="section-lg">
        <Wrapper>
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Comment ça fonctionne
            </span>
            <h2 className="mt-4 max-w-xl t-h2 text-gray-900">
              Trois étapes, zéro complication.
            </h2>
          </Reveal>

          <div className="relative mt-16">
            {/* Progress rail that draws itself as you scroll past */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="hidden lg:block absolute left-0 right-0 top-8 h-px origin-left bg-gradient-to-r from-brand-indigo/40 via-brand-indigo/20 to-transparent"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
              {steps.map(({ number, icon: Icon, title, description }, i) => (
                <Reveal key={number} delay={i * 0.08}>
                  <div className="group relative">
                    {/* Oversized ghost number — gives the section its own identity */}
                    <span className="pointer-events-none absolute -top-6 right-2 select-none text-[80px] font-extrabold leading-none text-gray-900/[0.04] lg:text-[96px]">
                      {number}
                    </span>

                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-[0_14px_30px_-18px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-indigo/25">
                      <Icon size={26} className="text-brand-indigo" />
                    </div>

                    <p className="mt-6 text-xs font-bold tracking-[0.2em] text-brand-indigo">
                      {number}
                    </p>
                    <h3 className="mt-2 t-h3 text-gray-900">{title}</h3>
                    <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-gray-500">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      {/* ---------- Premium components — dark band breaks the white run ---------- */}
      <section className="bg-[#0A0A0A] section-md">
        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
            <Reveal>
              <span className="block t-eyebrow text-brand-indigo">
                Des composants premium
              </span>
              <h2 className="mt-4 t-h2 text-white">
                Rien n'est laissé au hasard.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="t-body max-w-md text-gray-400 lg:pb-2">
                Nous ne travaillons qu'avec des références reconnues,
                couvertes par des garanties longues. Chaque pièce est choisie
                pour durer.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map(({ icon: Icon, name, description, warranty }, i) => (
              <Reveal key={name} delay={(i % 3) * 0.09}>
                <article className="group relative flex h-full gap-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-indigo/40 hover:bg-white/[0.06]">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-indigo/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      src={IMG}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-110"
                      sizes="80px"
                    />
                  </div>

                  <div className="relative flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-brand-indigo" />
                      <h3 className="text-[15px] font-bold text-white">
                        {name}
                      </h3>
                    </div>

                    <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
                      {description}
                    </p>

                    <span className="mt-3 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80">
                      Garantie {warranty}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrapper>
      </section>
    </>
  );
};

export default Process;
