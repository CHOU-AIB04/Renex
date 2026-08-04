"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Number that counts up when it scrolls into view.
 * Formats with French locale (space thousands separator, comma decimal).
 *
 * Renders the FINAL value in the server HTML, so the number is correct at first
 * paint and stays correct if JS is slow or blocked.
 *
 * If the element is ALREADY on screen at load (e.g. the hero stats), it simply
 * keeps that value and never animates — resetting it to 0 after the browser has
 * already painted the real number just looks like the page rendering twice.
 * Only elements further down the page, which the user hasn't seen yet, count up.
 */
export default function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
  className = "",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(to);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const initialised = useRef(false);

  // Decide once, before the first post-hydration paint, whether to animate
  useIsomorphicLayoutEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;

    // Visible at load → leave the real number alone, no flash-then-recount
    if (alreadyOnScreen) return;

    setValue(0);
    setShouldAnimate(true);
  }, []);

  // Run the count-up when the element scrolls into view
  useEffect(() => {
    if (!shouldAnimate) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let frame;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast start, soft landing
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setValue(to * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        el._cancelCounter = () => cancelAnimationFrame(frame);
      },
      { rootMargin: "-60px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      el._cancelCounter?.();
    };
  }, [shouldAnimate, to, duration]);

  const formatted = value.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`${className} flex items-center`}>
      {prefix}
      {formatted}
      <p className="ml-2">{suffix}</p>
    </span>
  );
}
