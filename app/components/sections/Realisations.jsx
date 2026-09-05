"use client";

import React from "react";
import ScrollLink from "../ScrollLink";
import Image from "next/image";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import Btn1 from "../Btn1";
import { LuArrowRight, LuMapPin } from "react-icons/lu";

// Asymmetric layout: one hero tile + three supporting tiles.
// NOTE: aspect ratios are mobile-only (`sm:aspect-auto`). Leaving an aspect
// ratio applied at sm+ fights the fixed grid row height and is what threw the
// tiles out of alignment.
const projects = [
  {
    title: "Installation Marrakech",
    location: "Marrakech",
    power: "20 kWc",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1788619679/RENEX_CLOSUP_jzb0m1.png",
    className: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto",
  },
  {
    title: "Installation Mohammedia",
    location: "Mohammedia",
    power: "10 kWc",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1788619619/RENEX_CLOSUP_5_x8sxoi.png",
    className: "aspect-[4/3] sm:aspect-auto",
  },
  {
    title: "Installation Marrakech",
    location: "Marrakech",
    power: "18 kWc",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1788619182/RENEX_CLOSUP_1_k2dll3.png",
    className: "aspect-[4/3] sm:aspect-auto",
  },
  {
    title: "Installation Rabat",
    location: "Rabat",
    power: "10 kWc",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1788619435/IMG_4972_sa2sfk.heic",
    className: "sm:col-span-2 aspect-[4/3] sm:aspect-auto",
  },
];


const Realisations = () => {
  return (
    <section id="realisations" className="surface-base section-lg">
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
           <div className="hidden md:block">
             <Btn1
              text="Demandez votre simulation solaire →"
              href="#contact"
              className="shrink-0"
            />
           </div>
          </Reveal>
        </div>

        {/* Asymmetric gallery */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:auto-rows-[220px]">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 0.09}
              className={project.className}
            >
              <article className="group relative h-full w-full overflow-hidden rounded-3xl bg-gray-100">
                <Image
                  src={project.src}
                  alt={`${project.title} — ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
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

       
      </Wrapper>
    </section>
  );
};

export default Realisations;
