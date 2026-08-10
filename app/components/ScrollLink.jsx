"use client";

import React, { forwardRef } from "react";
import { scrollToId } from "@/lib/scroll";

/**
 * Anchor that scrolls smoothly instead of relying on the URL hash.
 *
 * Keeps a real `href` so the link is still right-clickable, keyboard
 * accessible and readable by crawlers — the default jump is just intercepted.
 *
 * forwardRef so it works inside `asChild` wrappers (shadcn SheetClose etc.).
 */
const ScrollLink = forwardRef(function ScrollLink(
  { href = "#", offset, className = "", children, onClick, ...rest },
  ref
) {
  const handleClick = (event) => {
    // Let the parent (e.g. SheetClose) run its own handler first
    onClick?.(event);

    if (event.defaultPrevented) return;
    if (!href.startsWith("#")) return;

    event.preventDefault();

    // "#" alone is a placeholder — don't scroll anywhere
    if (href === "#") return;

    scrollToId(href, offset);
  };

  return (
    <a ref={ref} href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});

export default ScrollLink;
