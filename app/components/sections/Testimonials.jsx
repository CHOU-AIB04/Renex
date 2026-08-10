"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { TESTIMONIALS } from "@/lib/content";
import { LuStar, LuArrowLeft, LuArrowRight, LuQuote } from "react-icons/lu";

const AUTOSLIDE_MS = 5000;

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const paused = useRef(false);

  // 3 visible on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - perView);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  // Autoslide every 5s, paused on hover
  useEffect(() => {
    if (maxIndex === 0) return;
    const id = setInterval(() => {
      if (!paused.current) next();
    }, AUTOSLIDE_MS);
    return () => clearInterval(id);
  }, [next, maxIndex]);

  return (
    <section id="temoignages" className="surface-tint section-lg">
      <Wrapper>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Témoignages
            </span>
            <h2 className="mt-4 max-w-xl t-h2 text-gray-900">
              Ce qu'en disent nos clients
            </h2>
          </Reveal>

          {maxIndex > 0 && (
            <Reveal delay={0.1}>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Témoignage précédent"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-gray-700 transition hover:border-brand-indigo hover:text-brand-indigo"
                >
                  <LuArrowLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Témoignage suivant"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-gray-700 transition hover:border-brand-indigo hover:text-brand-indigo"
                >
                  <LuArrowRight size={18} />
                </button>
              </div>
            </Reveal>
          )}
        </div>

        {/* Carousel */}
        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              // Width is driven by `perView` (not a CSS breakpoint) so it can
              // never disagree with the translateX maths — that mismatch was
              // what left an empty column on desktop.
              <div
                key={t.name}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <article className="card-light flex h-full flex-col p-7">
                  <LuQuote size={26} className="text-brand-indigo/25" />

                  {/* Rating */}
                  <div className="mt-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <LuStar
                        key={i}
                        size={15}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-gray-700">
                    « {t.quote} »
                  </p>

                  {/* Before / after */}
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400">
                        Avant
                      </p>
                      <p className="text-base font-bold text-brand-red">
                        {t.before}
                      </p>
                    </div>
                    <LuArrowRight size={16} className="text-gray-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400">
                        Après
                      </p>
                      <p className="text-base font-bold text-brand-green">
                        {t.after}
                      </p>
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-indigo/10 text-sm font-bold text-brand-indigo">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.city} · Installation {t.power}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Aller au témoignage ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-brand-indigo" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default Testimonials;
