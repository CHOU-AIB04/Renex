"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";
import ScrollLink from "../ScrollLink";
import { navItems } from "@/lib/menu";
import Btn1 from "../Btn1";

// TODO: replace with the real client phone number
const PHONE_NUMBER = "06 00 00 00 00";
const PHONE_HREF = "tel:+212600000000";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // CSS entrance rather than framer-motion: the header markup ships visible
    // in the SSR HTML instead of waiting for hydration + the animation bundle.
    // Centred with auto margins, not -translate-x-1/2: the CSS entrance
    // animation owns `transform`, so a Tailwind transform utility would be
    // overwritten and the bar would jump out of centre.
    // `absolute` on mobile so the bar scrolls away with the hero instead of
    // following the user down; `fixed` only from lg up.
    <header
      className={`anim-slide-down absolute lg:fixed top-0 left-0 right-0 mx-auto z-50 w-[95%] md:w-[85%] rounded-b-[24px] transition-[background-color,box-shadow] duration-500 ${
        scrolled
          ? "lg:bg-white/85 lg:backdrop-blur-xl lg:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1500px] items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "h-14" : "h-[72px]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={
              scrolled
                ? "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785793348/logo_black_w5y1sj.png"
                : "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785793348/logo_white_rmwx2u.png"
            }
            alt="RENEX"
            width={130}
            height={45}
            priority
            className={`transition-all duration-500 ${
              scrolled ? "w-[104px]" : "w-[124px]"
            } h-auto`}
          />
        </Link>

        {/* Desktop Navigation — tighter type/spacing at 1280px, roomier at xl */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-9">
          {navItems.map((item) => (
            <ScrollLink
              key={item.title}
              href={item.href}
              className={`group relative whitespace-nowrap text-[9.5px] xl:text-[11px] font-bold uppercase tracking-[0.08em] xl:tracking-[0.14em] transition-colors duration-300 ${
                scrolled
                  ? "text-gray-500 hover:text-gray-900"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {item.title}
              {/* underline grows from the left on hover */}
              <span
                className={`pointer-events-none absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-brand-indigo" : "bg-white"
                }`}
              />
            </ScrollLink>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={PHONE_HREF}
            className={`hidden xl:flex items-center gap-2 text-[13px] font-semibold transition-colors duration-300 ${
              scrolled
                ? "text-gray-700 hover:text-brand-indigo"
                : "text-white/85 hover:text-white"
            }`}
          >
            <LuPhone size={15} />
            {PHONE_NUMBER}
          </a>

          <Btn1 text="Étude gratuite" href="#contact" size="sm" />
        </div>
      </div>
    </header>
  );
}
