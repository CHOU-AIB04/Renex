import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../wrapper";
import Btn1 from "../Btn1";
import Counter from "../motion/Counter";
import { LuStar, LuAward, LuShieldCheck, LuHouse } from "react-icons/lu";

/**
 * Server component on purpose.
 *
 * The hero previously animated with framer-motion, which meant the headline
 * rendered at opacity:0 and only became visible after React hydrated and the
 * animation bundle downloaded — a blank hero on slow connections. Everything
 * here is now plain HTML + CSS animations, so the copy paints with the first
 * frame and no JS is on the critical path.
 */

const trustBadges = [
  { icon: LuStar, label: "4,9/5 sur Google" },
  { icon: LuHouse, label: "+500 installations" },
  { icon: LuAward, label: "Huawei Gold Partner" },
  { icon: LuShieldCheck, label: "Garantie 25 ans" },
];

const liveStats = [
  { to: 28.45, decimals: 2, suffix: " kWh", label: "Production" },
  { to: 1425, decimals: 0, suffix: " DH", label: "Économie réalisée" },
  { to: 78, decimals: 0, suffix: " %", label: "Autonomie" },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden rounded-b-[48px] md:rounded-b-[100px]"
    >
      {/* Background — LCP image */}
      <Image
        src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg"
        alt="Installation solaire premium sur toiture de villa au Maroc"
        fill
        priority
        fetchPriority="high"
        quality={70}
        sizes="100vw"
        className="object-cover animate-hero-zoom"
      />

      {/* Overlay — bottom-heavy on mobile, left-heavy on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15 md:bg-gradient-to-r md:from-black/95 md:via-black/60 md:to-transparent" />

      {/* Brand-tinted ambient glow (radial gradient — cheap to paint) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(27,36,100,0.45) 0%, rgba(27,36,100,0) 70%)",
        }}
      />

      {/* Content */}
      <Wrapper className="relative z-10 flex min-h-[100dvh] items-center pt-32 pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow + headline render immediately — no fade, no delay */}
          <span className="inline-block rounded-full border border-white/25 bg-white/5 px-4 py-1.5 t-eyebrow text-white">
            Solar Home+
          </span>

          <h1 className="mt-6 t-display text-white">
            Passez à
            <br />
            l&apos;énergie solaire.
          </h1>

          {/* Everything below fades up via CSS, staggered by delay */}
          <p
            className="anim-fade-up mt-5 max-w-lg text-lg sm:text-2xl font-medium text-white/85"
            style={{ animationDelay: "60ms" }}
          >
            Réduisez votre facture. Pas votre confort.
          </p>

          <p
            className="anim-fade-up mt-4 max-w-md t-body text-white/60"
            style={{ animationDelay: "120ms" }}
          >
            Des installations solaires conçues pour les villas et maisons haut
            de gamme, alliant performance, design et fiabilité.
          </p>

          {/* Buttons */}
          <div
            className="anim-fade-up mt-9 flex flex-col sm:flex-row gap-3.5"
            style={{ animationDelay: "180ms" }}
          >
            <Btn1 text="Obtenir mon étude gratuite →" href="#contact" />

            <Link
              href="#realisations"
              className="rounded-full border border-white/30 px-8 py-4 text-[15px] font-semibold text-white text-center transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Voir nos réalisations
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="anim-fade-up mt-8 flex flex-wrap gap-x-5 gap-y-2.5"
            style={{ animationDelay: "240ms" }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[13px] font-medium text-white/70"
              >
                <Icon size={15} className="text-white/90" />
                {label}
              </div>
            ))}
          </div>

          {/* Live monitoring proof card */}
          <div
            className="anim-fade-up mt-9 max-w-md rounded-2xl border border-white/15 bg-white/[0.07] p-5"
            style={{ animationDelay: "300ms" }}
          >
            <p className="t-eyebrow mb-4 text-white/50">
              Suivi en temps réel depuis votre téléphone
            </p>
            <div className="grid grid-cols-3 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg sm:text-xl font-extrabold text-white tabular-nums">
                    <Counter
                      to={stat.to}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
