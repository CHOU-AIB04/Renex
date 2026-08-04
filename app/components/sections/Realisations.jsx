"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";
import { LuArrowRight, LuMapPin } from "react-icons/lu";

// TODO: replace with the real project photos
const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

// Asymmetric layout: one hero tile + three supporting tiles
const projects = [
  {
    title: "Villa contemporaine",
    location: "Casablanca",
    power: "12 kWc",
    className: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto",
  },
  {
    title: "Villa avec piscine",
    location: "Bouskoura",
    power: "9 kWc",
    className: "aspect-[4/3]",
  },
  {
    title: "Résidence privée",
    location: "Marrakech",
    power: "15 kWc",
    className: "aspect-[4/3]",
  },
  {
    title: "Villa moderne",
    location: "Rabat",
    power: "8 kWc",
    className: "sm:col-span-2 aspect-[16/9] sm:aspect-[21/9]",
  },
];

const stats = [
  { to: 500, suffix: "+", label: "Installations livrées" },
  { to: 12, suffix: "", label: "Villes couvertes" },
  { to: 25, suffix: " ans", label: "De garantie" },
];

const Realisations = () => {
  return (
    <section id="realisations" className="section-lg">
      <Wrapper>
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Réalisations
            </span>
            <h2 className="mt-4 max-w-lg t-h2 text-gray-900">
              Nos dernières installations
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-indigo"
            >
              Voir toutes nos réalisations
              <LuArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetric gallery */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:auto-rows-[220px]">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 0.09}
              className={project.className}
            >
              <article className="group relative h-full w-full overflow-hidden rounded-3xl">
                <Image
                  src={IMG}
                  alt={`${project.title} — ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />

                {/* Permanent base gradient so captions are always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[15px] font-bold text-white">
                    {project.title}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[12px] text-white/70">
                    <span className="flex items-center gap-1">
                      <LuMapPin size={12} />
                      {project.location}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{project.power}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Proof numbers */}
        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-black/[0.07] pt-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <p className="t-h2 text-gray-900 tabular-nums">
                <Counter to={stat.to} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[13px] text-gray-500">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Mobile link */}
        <Link
          href="#contact"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-indigo sm:hidden"
        >
          Voir toutes nos réalisations
          <LuArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </Wrapper>
    </section>
  );
};

export default Realisations;
