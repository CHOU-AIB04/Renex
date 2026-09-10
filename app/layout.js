import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import StickyMobileBar from "./components/layout/StickyMobileBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        {/* Google Tag Manager - HEAD */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NQXQ3TTD');
          `}
        </Script>

        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
        />
        <link
          rel="dns-prefetch"
          href="https://res.cloudinary.com"
        />
      </head>

      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager - BODY */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQXQ3TTD"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {children}

        <StickyMobileBar />
      </body>
    </html>
  );
}
