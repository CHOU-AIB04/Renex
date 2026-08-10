import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import { PARTNERS } from "@/lib/content";

/**
 * Infinite logo marquee.
 * CSS-only animation — the track holds two copies of the list and slides
 * exactly 50%, so the loop is seamless. Pauses on hover.
 *
 * Every logo sits in an identical fixed box with object-contain, plus a
 * per-logo `scale` to correct for the different amounts of built-in padding
 * in the source files (otherwise some render huge and others tiny).
 */
const Partners = () => {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="surface-base section-md overflow-hidden">
      <Wrapper>
        <p className="text-center t-eyebrow text-gray-400">
          Les technologies qui alimentent chaque installation
        </p>
      </Wrapper>

      <div className="marquee relative mt-12">
        {/* Edge fades — match the section surface so logos dissolve out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--surface-base)] to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--surface-base)] to-transparent sm:w-48" />

        <div className="marquee-track flex w-max items-center">
          {loop.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-16 w-[150px] shrink-0 items-center justify-center px-4 sm:w-[190px]"
            >
              <div
                className="relative h-full w-full"
                style={{ transform: `scale(${partner.scale ?? 1})` }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="190px"
                  className="object-contain opacity-45 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
