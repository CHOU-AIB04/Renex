import React from "react";
import Link from "next/link";
import ScrollLink from "./ScrollLink";

/**
 * Primary brand CTA.
 * Sizes exist so a nav button doesn't carry the same weight as a hero button —
 * `sm` for the header, `lg` for hero / final CTA.
 */
const sizes = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

const Btn1 = ({
  text,
  href = "#contact",
  onClick,
  size = "lg",
  className = "",
}) => {
  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-indigo font-semibold text-white text-center cursor-pointer overflow-hidden shadow-[0_8px_24px_-10px_rgba(27,36,100,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(27,36,100,1)] active:translate-y-0 ${sizes[size]} ${className}`;

  const inner = (
    <>
      {/* Sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{text}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  // In-page targets scroll programmatically — a hash link won't re-trigger
  // once the URL already carries that hash.
  if (href.startsWith("#")) {
    return (
      <ScrollLink href={href} className={classes}>
        {inner}
      </ScrollLink>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
};

export default Btn1;
