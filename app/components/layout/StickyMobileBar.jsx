"use client";

import React, { useEffect, useState } from "react";
import ScrollLink from "../ScrollLink";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

/**
 * Mobile CRO element — a single floating "dynamic island" CTA.
 *
 * Scrolls the visitor down to the inline form in the contact section rather
 * than opening a popup, so there's one form experience on mobile.
 *
 * Behaviour mirrors the header: hidden while the hero is on screen, springs up
 * once scrolling starts, and hides again when the contact section is in view
 * (the form is right there — the island would only cover it).
 */
export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > 420;

      const contact = document.getElementById("contact");
      let contactInView = false;
      if (contact) {
        const { top } = contact.getBoundingClientRect();
        contactInView = top < window.innerHeight * 0.85;
      }

      setVisible(scrolledPastHero && !contactInView);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden pointer-events-none fixed bottom-0 left-0 z-40 flex w-full justify-center px-4 pb-4"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <AnimatePresence>
        {visible && (
          // Deliberately punchy entrance: shoots up from off-screen with an
          // overshoot, then a quick settle-bounce. The previous gentle fade
          // was too easy to miss.
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.65 }}
            animate={{
              opacity: 1,
              y: [90, -14, 4, 0],
              scale: [0.65, 1.12, 0.97, 1],
            }}
            exit={{ opacity: 0, y: 40, scale: 0.8, transition: { duration: 0.18 } }}
            transition={{
              duration: 0.62,
              times: [0, 0.45, 0.72, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto relative"
          >
            {/* Attention halo — pulses a few times right after arrival */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-brand-indigo"
              initial={{ opacity: 0.55, scale: 1 }}
              animate={{ opacity: 0, scale: 1.35 }}
              transition={{
                duration: 1.1,
                repeat: 2,
                repeatDelay: 0.35,
                delay: 0.5,
                ease: "easeOut",
              }}
            />

            <ScrollLink
              href="#contact"
              className="group relative flex items-center gap-2.5 rounded-full border border-white/15 bg-black/85 py-2 pl-5 pr-2 text-white shadow-[0_18px_44px_-10px_rgba(0,0,0,0.9),0_0_0_1px_rgba(27,36,100,0.5)] backdrop-blur-2xl transition-transform duration-200 active:scale-95"
            >
              <span className="text-[13px] font-semibold whitespace-nowrap">
                Mon étude gratuite
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-indigo shadow-[0_0_18px_-2px_rgba(27,36,100,0.9)] transition-transform duration-200 group-active:scale-90">
                <LuArrowRight size={17} />
              </span>
            </ScrollLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
