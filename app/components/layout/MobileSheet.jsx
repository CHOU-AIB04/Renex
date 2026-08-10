"use client";
import React from "react";
import ScrollLink from "../ScrollLink";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuAlignRight, LuArrowRight, LuX, LuPhone } from "react-icons/lu";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { navItems } from "@/lib/menu";

// TODO: replace with the real client phone / WhatsApp number and email
const PHONE_HREF = "tel:+212600000000";
const WHATSAPP_HREF =
  "https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20recevoir%20mon%20%C3%A9tude%20solaire%20gratuite";
const CONTACT_EMAIL = "contact@renex.ma";

const MobileSheet = ({ scrolled }) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Ouvrir le menu">
            <LuAlignRight
              size={30}
              className={`${scrolled ? "text-black" : "text-white"}`}
            />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[90%] border-none p-0">
          <div className="relative h-full">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo via-[#04011a] to-[#161616]" />

            <Image
              src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg"
              alt=""
              fill
              className="object-cover opacity-10"
            />

            <div className="absolute inset-0 backdrop-blur-xl bg-black/20" />

            {/* Content */}
            <div className="relative flex h-full flex-col p-8">
              {/* Top */}
              <div className="flex items-center justify-between">
                <Image
                  src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1785793348/logo_white_rmwx2u.png"
                  alt="RENEX"
                  width={120}
                  height={40}
                />

                <SheetClose asChild>
                  <button
                    aria-label="Fermer le menu"
                    className="rounded-full bg-brand-indigo p-3"
                  >
                    <LuX className="text-white" size={22} />
                  </button>
                </SheetClose>
              </div>

              {/* Navigation */}
              <div className="mt-16 space-y-9">
                {navItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <SheetClose asChild>
                        <ScrollLink
                          href={item.href}
                          className="group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-5">
                            <Icon size={24} className="text-white/70" />
                            <span className="font-bold tracking-[3px] text-white text-[12px]">
                              {item.title}
                            </span>
                          </div>

                          <LuArrowRight
                            size={20}
                            className="text-white opacity-0 -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                          />
                        </ScrollLink>
                      </SheetClose>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom */}
              <div className="mt-auto">
                <div className="mb-6 h-px bg-white/20" />

                {/* Quick contact links */}
                {/* <div className="flex gap-3">
                  <a
                    href={PHONE_HREF}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-white text-sm font-semibold hover:bg-white/10 transition"
                  >
                    <LuPhone size={16} />
                    Appeler
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-black text-sm font-semibold hover:brightness-95 transition"
                  >
                    <FaWhatsapp size={16} />
                    WhatsApp
                  </a>
                </div> */}

                <h3 className="mt-8 text-white text-lg font-bold tracking-wider">
                  NOUS CONTACTER
                </h3>

                <p className="mt-2 text-white/70">{CONTACT_EMAIL}</p>

                <div className="mt-6 flex gap-4">
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-brand-indigo transition"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-brand-indigo transition"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-brand-indigo transition"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>

                <SheetClose asChild>
                  <ScrollLink
                    href="#contact"
                    className="mt-8 block w-full rounded-full px-3 bg-white py-4 text-center font-semibold text-black hover:scale-[1.02] transition"
                  >
                    Demander mon étude gratuite
                  </ScrollLink>
                </SheetClose>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSheet;
