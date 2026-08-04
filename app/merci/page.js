import ThankYou from "./ThankYou";

export const metadata = {
  title: "Merci — votre demande est bien reçue | RENEX",
  description:
    "Votre demande d'étude solaire gratuite a bien été enregistrée. Un conseiller RENEX vous recontacte sous 24h.",
  // Confirmation pages shouldn't appear in search results
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return <ThankYou />;
}
