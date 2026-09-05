import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../wrapper";
import { CONTACT } from "@/lib/content";
import { navItems } from "@/lib/menu";
import { LuPhone, LuMail, LuMapPin } from "react-icons/lu";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const cities = [
  "Casablanca",
  "Bouskoura",
  "Rabat",
  "Marrakech",
  "Mohammedia",
  "El Jadida",
];

const Footer = () => {
  return (
    <footer className="surface-ink grain relative overflow-hidden pt-20 pb-10">
      <Wrapper className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image
              src="https://res.cloudinary.com/drn1zdkwa/image/upload/v1785793348/logo_white_rmwx2u.png"
              alt="RENEX"
              width={130}
              height={45}
              className="h-auto w-[122px]"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              RENEX conçoit et installe des solutions solaires premium pour les
              villas et maisons au Maroc. Performance, design et fiabilité.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-indigo hover:bg-brand-indigo"
              >
                <FaWhatsapp size={15} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-indigo hover:bg-brand-indigo"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-brand-indigo hover:bg-brand-indigo"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="t-eyebrow text-white/40">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm capitalize text-gray-400 transition hover:text-white"
                  >
                    {item.title.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <p className="t-eyebrow text-white/40">Zones couvertes</p>
            <ul className="mt-5 space-y-3">
              {cities.map((city) => (
                <li key={city} className="text-sm text-gray-400">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="t-eyebrow text-white/40">Contact</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-white"
                >
                  <LuPhone size={16} className="mt-0.5 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-white"
                >
                  <LuMail size={16} className="mt-0.5 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <LuMapPin size={16} className="mt-0.5 shrink-0" />
                Casablanca — Oasis Offices Latitude, Route de l’Oasis, Maarif, Casablanca
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RENEX ENERGY. Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* TODO: create these pages before launch — required with a lead form */}
            <Link
              href="/mentions-legales"
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
