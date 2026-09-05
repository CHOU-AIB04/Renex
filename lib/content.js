// Central content + config.
// Anything the client may change (figures, contact details, copy) lives here
// so it can be updated without touching component code.

// TODO: confirm the real contact details
export const CONTACT = {
  phone: "06 69 91 38 59",
  phoneHref: "tel:+212669913859",
  whatsapp:
    "https://wa.me/212719001583?text=Bonjour%2C%20je%20souhaite%20recevoir%20mon%20%C3%A9tude%20solaire%20gratuite",
  email: "contact@renex.ma",
};

// Placeholder photo — one image for every slot until the real shoot lands.
export const IMG =
  "https://res.cloudinary.com/drn1zdkwa/image/upload/v1785795032/pexels-wiki15-canton-598594475-28681439_puec73.jpg";

// ⚠️ TODO: the client supplied 6 logo files but listed 7 brands
// (Huawei, Jinko Solar, Longi, JA Solar, Tongwei, Trina Solar, K2 Systems).
// Confirm which file is which brand — the names below are a best guess and
// are used for alt text / accessibility.
//
// `scale` optically balances each logo. Source files have different amounts of
// built-in padding, so a single fixed box still renders some huge and some tiny.
// Nudge these values (0.7–1.15) until every logo reads the same visual weight.
export const PARTNERS = [
  {
    name: "Huawei",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/7_onwlje.png",
    scale: 1,
  },
  {
    name: "Jinko Solar",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/6_kmelz2.png",
    scale: 1,
  },
  {
    name: "Longi",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/3_gxcxfi.png",
    scale: 0.82,
  },
  {
    name: "JA Solar",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/5_blxg0u.png",
    scale: 1,
  },
  {
    name: "Trina Solar",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/4_brbatx.png",
    scale: 1,
  },
  {
    name: "K2 Systems",
    src: "https://res.cloudinary.com/drn1zdkwa/image/upload/v1786055451/8_o59flb.png",
    scale: 1,
  },
];

// Form options — exactly as specified in the client report
export const FORM_OPTIONS = {
  profile: ["Particulier", "Professionnel"],
  cities: [
    "Casablanca",
    "Environs de Casablanca",
    "Marrakech",
    "Rabat",
    "Autres",
  ],
  housing: ["Villa", "Immeuble", "Bureau", "Autre"],
  roof: ["Toiture terrasse (béton)", "Toiture en tuiles", "Je ne sais pas"],
  bills: [
    "1 000 - 2 000 DH",
    "2 000 - 3 000 DH",
    "3 000 - 4 000 DH",
    "4 000 - 5 000 DH",
    "5 000 - 6 000 DH",
    "6 000 - 7 000 DH",
    "7 000 - 8 000 DH",
    "8 000 - 9 000 DH",
    "9 000 - 10 000 DH",
    "> 10 000 DH",
  ],
  stage: [
    "Je découvre le solaire",
    "Je compare plusieurs offres",
    "Je souhaite installer rapidement",
  ],
};

export const FAQ_ITEMS = [
  {
    q: "Combien puis-je économiser avec une installation solaire ?",
    a: "Les économies dépendent de votre consommation et de la taille de votre installation. En moyenne, nos clients réduisent leur facture d'électricité jusqu'à 60 %.",
  },
  {
    q: "Combien coûte une installation solaire ?",
    a: "Chaque projet est unique. Le prix dépend de votre consommation, de votre toiture et de la puissance nécessaire. Nous réalisons une étude gratuite et personnalisée avant toute proposition.",
  },
  {
    q: "Combien de temps dure l'installation ?",
    a: "Une installation résidentielle est généralement réalisée en 2 à 5 jours, selon la taille du projet.",
  },
  {
    q: "Les panneaux solaires fonctionnent-ils en hiver ou par temps nuageux ?",
    a: "Oui. Les panneaux produisent de l'électricité dès qu'il y a de la lumière. La production est simplement plus faible lorsque l'ensoleillement diminue.",
  },
  {
    q: "Quelle est la durée de vie d'une installation solaire ?",
    a: "Les panneaux solaires sont conçus pour produire de l'énergie pendant plus de 30 ans avec très peu d'entretien.",
  },
  {
    q: "Quelle garantie propose RENEX ?",
    a: "Nous utilisons des équipements premium bénéficiant de garanties fabricant et nous assurons un accompagnement avant, pendant et après l'installation.",
  },
  {
    q: "Puis-je suivre ma production d'électricité ?",
    a: "Oui. Grâce à l'application Huawei FusionSolar / Deye Cloud, vous pouvez suivre en temps réel votre production, votre consommation et vos économies directement depuis votre smartphone.",
  },
  {
    q: "Comment démarrer mon projet avec RENEX ?",
    a: "Il vous suffit de demander une étude solaire gratuite. Nos experts analyseront votre consommation, votre toiture et vos besoins afin de vous proposer une solution parfaitement adaptée à votre maison.",
  },
];

// TODO: replace with real, consented client testimonials
export const TESTIMONIALS = [
  {
    name: "Ahmed B.",
    city: "Casablanca",
    power: "10 kWc",
    quote:
      "Très satisfait de l'accompagnement. L'équipe a été professionnelle du début à la fin.",
    before: "3 200 DH",
    after: "750 DH",
  },
  {
    name: "Salma R.",
    city: "Marrakech",
    power: "8 kWc",
    quote:
      "Installation rapide et soignée. Le suivi de production depuis l'application est très pratique.",
    before: "2 800 DH",
    after: "900 DH",
  },
  {
    name: "Youssef T.",
    city: "Rabat",
    power: "12 kWc",
    quote:
      "Une équipe sérieuse qui respecte les délais. Ma facture a chuté dès le premier mois.",
    before: "4 100 DH",
    after: "1 200 DH",
  },
  {
    name: "Karim M.",
    city: "Bouskoura",
    power: "9 kWc",
    quote:
      "Étude claire, devis transparent, aucune mauvaise surprise. Je recommande sans hésiter.",
    before: "2 400 DH",
    after: "680 DH",
  },
];
