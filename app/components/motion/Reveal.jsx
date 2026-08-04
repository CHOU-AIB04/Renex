"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Shared scroll-reveal primitive so every section animates in with the same
 * curve and timing instead of each one inventing its own.
 *
 * Respects prefers-reduced-motion via Framer Motion's global reducedMotion
 * handling (see MotionProvider).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger slightly *before* the element reaches the viewport so content
      // is already visible by the time the user scrolls to it.
      viewport={{ once, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1], // gentle "premium" ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
