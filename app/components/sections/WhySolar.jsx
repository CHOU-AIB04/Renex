import React from "react";
import Wrapper from "../wrapper";
import Reveal from "../motion/Reveal";

/**
 * "Pourquoi passer au solaire ?" — pinned sticky-note cards.
 * White outer card + tinted inner panel, held by a glossy 3D push-pin,
 * each note tilted slightly and straightening on hover.
 */

const benefits = [
  {
    number: "01",
    // non-breaking space so "60 %" never splits across lines
    title: "Réduisez votre facture jusqu'à 60 %",
    description:
      "Produisez votre propre électricité et diminuez durablement vos dépenses énergétiques grâce à une installation solaire adaptée à votre consommation.",
    tint: "#EAF6EE", // wash of brand-green
    accent: "#3A8F58",
    pin: "#4CAF6E", // brand-green
    tilt: "-rotate-2",
  },
  {
    number: "02",
    title: "Valorisez votre maison",
    description:
      "Une maison équipée d'un système photovoltaïque est plus attractive, plus moderne et gagne en valeur sur le marché immobilier.",
    tint: "#ECEEF7", // wash of brand-indigo
    accent: "#1B2464",
    pin: "#1B2464", // brand-indigo
    tilt: "rotate-[1.5deg]",
  },
  {
    number: "03",
    title: "Gagnez en autonomie énergétique",
    description:
      "Produisez une partie de votre propre énergie et protégez-vous contre les hausses du prix de l'électricité.",
    tint: "#E8EEF8", // wash of brand-navy
    accent: "#00206C",
    pin: "#00206C", // brand-navy (Solar Home+)
    tilt: "-rotate-1",
  },
];

/** Glossy push-pin built from gradients — no image asset needed. */
const Pin = ({ color }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2"
  >
    {/* Dome */}
    <span
      className="block h-9 w-9 rounded-full"
      style={{
        background: `radial-gradient(circle at 32% 26%, #ffffff 0%, ${color} 42%, ${color} 62%, rgba(0,0,0,0.35) 100%)`,
        boxShadow: `0 6px 14px -4px ${color}b3, 0 0 22px -2px ${color}80, inset 0 -2px 4px rgba(0,0,0,0.25)`,
      }}
    />
    {/* Body beneath the dome */}
    <span
      className="mx-auto -mt-1.5 block h-3 w-4 rounded-b-[6px]"
      style={{
        background: `linear-gradient(to bottom, ${color}, rgba(0,0,0,0.45))`,
        filter: "brightness(0.85)",
      }}
    />
  </span>
);

const WhySolar = () => {
  return (
    <section
      id="pourquoi-solaire"
      className="surface-tint section-lg pb-20"
      style={{
        // Faint ruled-paper lines, like the reference board
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(0,0,0,0.028) 0px, rgba(0,0,0,0.028) 1px, transparent 1px, transparent 46px)",
      }}
    >
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
          <Reveal>
            <span className="block t-eyebrow text-brand-indigo">
              Pourquoi passer au solaire ?
            </span>
            <h2 className="mt-4 t-h2 text-gray-900">
              Un investissement,
              <br />
              pas une dépense.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body max-w-md text-gray-500 lg:pb-2">
              Le solaire n&apos;est plus seulement un choix écologique.
              C&apos;est un investissement intelligent qui réduit vos dépenses,
              valorise votre patrimoine et vous apporte davantage
              d&apos;indépendance énergétique.
            </p>
          </Reveal>
        </div>

        {/* Pinned notes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <Reveal
              key={b.number}
              delay={i * 0.1}
              // Middle note hangs lower, like notes pinned by hand
              className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-6" : ""}
            >
              <div className="relative h-full">
                <Pin color={b.pin} />

                {/* Tilt via class (not inline style) so the hover state can
                    straighten the note — inline transforms would win instead. */}
                <article
                  className={`relative h-full rounded-[30px] bg-white p-3.5 shadow-[0_2px_6px_-2px_rgba(16,24,40,0.10),0_22px_44px_-18px_rgba(16,24,40,0.28)] transition-all duration-500 ${b.tilt} hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_4px_10px_-2px_rgba(16,24,40,0.12),0_34px_60px_-20px_rgba(16,24,40,0.34)]`}
                >
                  <div
                    className="flex h-full flex-col rounded-[22px] p-7"
                    style={{ backgroundColor: b.tint }}
                  >
                    <span
                      className="text-[26px] font-light leading-none tracking-wide"
                      style={{ color: b.accent }}
                    >
                      {b.number}
                    </span>

                    <h3 className="mt-4 text-[19px] font-bold leading-snug text-gray-900">
                      {b.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {b.description}
                    </p>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default WhySolar;
