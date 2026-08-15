import React from "react";
import ScrollLink from "../ScrollLink";
import Image from "next/image";
import Wrapper from "../wrapper";
import Btn1 from "../Btn1";
import { LuStar, LuAward, LuShieldCheck, LuLayers } from "react-icons/lu";

/**
 * Server component on purpose.
 *
 * The hero previously animated with framer-motion, which meant the headline
 * rendered at opacity:0 and only became visible after React hydrated and the
 * animation bundle downloaded — a blank hero on slow connections. Everything
 * here is now plain HTML + CSS animations, so the copy paints with the first
 * frame and no JS is on the critical path.
 */

// Figures per the client report (RNO-RP213)
const trustBadges = [
  { icon: LuStar, label: "+98% de satisfaction" },
  { icon: LuShieldCheck, label: "30 ans de garantie" },
  { icon: LuAward, label: "+100 installations" },
  { icon: LuLayers, label: "Matériel Tier 1" },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden rounded-b-[48px] md:rounded-b-[100px]"
    >
      {/* Background — LCP image */}
      <Image
        src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1786826892/1ae317da1fc999b1d5755e406212ccdb_1786826538656_oeskul.png"
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
      <Wrapper className="relative z-10 flex min-h-[100dvh] items-center pt-32 pb-34">
        <div className="max-w-3xl">
          {/* Eyebrow + headline render immediately — no fade, no delay */}
          <span className="inline-block rounded-full border border-white/25 bg-white/5 px-4 py-1.5 t-eyebrow text-white">
            Solar Home+
          </span>

          <h1 className="mt-6 t-display text-white text-[40px] md:text-6xl">
            Vous payez plus de <br className="hidden md:block" />
            2 000 DH d'électricité
            par mois ?
          </h1>

          {/* Everything below fades up via CSS, staggered by delay */}
          <p
            className="anim-fade-up mt-6 max-w-xl text-lg sm:text-xl font-medium text-white/85"
            style={{ animationDelay: "60ms" }}
          >
            Réduisez votre facture jusqu&apos;à 60 % grâce à une installation
            solaire premium conçue pour votre maison.
          </p>

          {/* Buttons */}
          <div
            className="anim-fade-up mt-9 flex flex-col sm:flex-row gap-3.5"
            style={{ animationDelay: "180ms" }}
          >
            <Btn1 text="Demandez votre simulation solaire →" href="#contact" />

            <ScrollLink
              href="#realisations"
              className="rounded-full border border-white/30 px-8 py-4 text-[15px] font-semibold text-white text-center transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Voir nos réalisations
            </ScrollLink>
          </div>

          {/* Trust badges */}
          <div
            className="anim-fade-up mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2.5"
            style={{ animationDelay: "240ms" }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[11px] md:text-[13px] font-medium text-white/70"
              >
                <Icon size={15} className="text-white/90" />
                {label}
              </div>
            ))}
          </div>

        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
