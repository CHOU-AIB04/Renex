"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuCheck,
  LuPhone,
  LuArrowLeft,
  LuClock,
  LuFileSearch,
  LuCalendarCheck,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

// TODO: replace with the real client phone / WhatsApp number
const PHONE_HREF = "tel:+212600000000";
const WHATSAPP_HREF =
  "https://wa.me/212600000000?text=Bonjour%2C%20je%20viens%20de%20demander%20mon%20%C3%A9tude%20solaire%20gratuite";

const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

const nextSteps = [
  {
    icon: LuPhone,
    title: "Nous vous appelons",
    description:
      "Un conseiller RENEX vous contacte sous 24h pour comprendre votre besoin.",
  },
  {
    icon: LuFileSearch,
    title: "Étude personnalisée",
    description:
      "Nous analysons votre consommation et dimensionnons la solution idéale.",
  },
  {
    icon: LuCalendarCheck,
    title: "Proposition chiffrée",
    description:
      "Estimation de production, de rentabilité et planning d'installation.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ThankYou() {
  // Fire the conversion again on the dedicated URL so Google Ads / Meta can
  // also track this page as a destination-based conversion.
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-5 py-20">
      {/* Background */}
      <Image
        src={IMG}
        alt=""
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black" />

      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(27,36,100,0.5) 0%, rgba(27,36,100,0) 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Logo */}
        <motion.div variants={item} className="flex justify-center">
          <Image
            src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1785793348/logo_white_rmwx2u.png"
            alt="RENEX"
            width={130}
            height={45}
            className="h-auto w-[118px]"
          />
        </motion.div>

        {/* Check badge */}
        <motion.div variants={item} className="mt-10 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10">
            <LuCheck size={32} className="text-brand-green" />
          </span>
        </motion.div>

        <motion.h1 variants={item} className="mt-7 t-h2 text-white">
          Merci, votre demande est bien reçue.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-md t-body text-gray-400"
        >
          Un conseiller RENEX vous rappelle sous 24h pour planifier votre étude
          solaire gratuite — sans engagement.
        </motion.p>

        {/* Response time badge */}
        <motion.div variants={item} className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/80">
            <LuClock size={15} />
            Réponse en moins de 24h
          </span>
        </motion.div>

        {/* Next steps */}
        <motion.div
          variants={item}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
        >
          {nextSteps.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo/25">
                  <Icon size={15} className="text-white" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.18em] text-brand-indigo">
                  0{i + 1}
                </span>
              </div>
              <h2 className="mt-3 text-[15px] font-bold text-white">{title}</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
                {description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Immediate contact — for people who don't want to wait */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-3"
        >
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-black transition hover:brightness-95"
          >
            <FaWhatsapp size={17} />
            Discuter maintenant
          </a>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            <LuPhone size={16} />
            Nous appeler
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-400 transition hover:text-white"
          >
            <LuArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
