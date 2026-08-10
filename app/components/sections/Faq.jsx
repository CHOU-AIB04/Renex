"use client";

import React, { useState } from "react";
import ScrollLink from "../ScrollLink";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";
import { FAQ_ITEMS, CONTACT } from "@/lib/content";
import { LuPlus, LuArrowRight } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="surface-base section-lg">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
          {/* Left — heading sticks while the list scrolls past it */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <span className="block t-eyebrow text-brand-indigo">FAQ</span>
                <h2 className="mt-4 t-h2 text-gray-900">
                  Vos questions,
                  <br />
                  nos réponses.
                </h2>
                <p className="mt-4 max-w-sm t-body text-gray-500">
                  Une question qui n&apos;est pas dans la liste ? Écrivez-nous,
                  on vous répond sous 24h.
                </p>
              </Reveal>

              {/* Fills the previously empty left column with a real CTA */}
              <Reveal delay={0.1}>
                <div className="surface-ink grain relative mt-10 max-w-sm overflow-hidden rounded-3xl p-7">
                  <p className="relative text-base font-bold text-white">
                    Vous préférez en parler ?
                  </p>
                  <p className="relative mt-2 text-sm leading-relaxed text-gray-400">
                    Un conseiller RENEX répond à vos questions et estime votre
                    projet gratuitement.
                  </p>

                  <div className="relative mt-6 flex flex-col gap-2.5">
                    <ScrollLink
                      href="#contact"
                      className="flex items-center justify-center gap-2 rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-indigo-dark"
                    >
                      Demander mon étude gratuite
                      <LuArrowRight size={16} />
                    </ScrollLink>

                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <FaWhatsapp size={16} />
                      Écrire sur WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;

              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`text-[15px] font-semibold transition-colors duration-300 ${
                        isOpen ? "text-brand-indigo" : "text-gray-900"
                      }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand-indigo bg-brand-indigo text-white"
                          : "border-black/15 text-gray-500"
                      }`}
                    >
                      <LuPlus size={13} />
                    </span>
                  </button>

                  {/* Grid-rows trick: animates height without a fixed value */}
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-gray-500">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Faq;
