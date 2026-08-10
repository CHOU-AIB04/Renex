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
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="pointer-events-auto"
          >
            <ScrollLink
              href="#contact"
              className="group flex items-center gap-2.5 rounded-full border border-white/12 bg-black/75 py-2 pl-5 pr-2 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-transform duration-300 active:scale-95"
            >
              <span className="text-[13px] font-semibold whitespace-nowrap">
                Mon étude gratuite
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-indigo transition-transform duration-300 group-active:scale-90">
                <LuArrowRight size={17} />
              </span>
            </ScrollLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
