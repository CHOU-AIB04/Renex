import { Inter } from "next/font/google";
import "./globals.css";
import StickyMobileBar from "./components/layout/StickyMobileBar";

// Inter only — the brand guide specifies a single typeface, and loading
// unused families was costing two extra font downloads on every page view.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // show text immediately with the fallback, swap when ready
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "SOLAR HOME+ par RENEX — Passez à l'énergie solaire au Maroc",
  description:
    "Réduisez votre facture d'électricité sans réduire votre confort. Installations solaires premium pour villas et maisons au Maroc. Étude gratuite et sans engagement, réponse en moins de 24h.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Warm up the image CDN connection before the hero image is requested */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <StickyMobileBar />
      </body>
    </html>
  );
}
