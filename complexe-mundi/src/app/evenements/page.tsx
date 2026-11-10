import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import { SectionHead } from "@/components/Section";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Événements",
  description: "Auditorium de 300 invités, salles de réunion équipées et équipe dédiée pour vos séminaires, conférences et réceptions.",
};

const offer = [
  "Espace événementiel modulable",
  "Un grand auditorium pouvant accueillir jusqu'à 300 invités",
  "Salles de réunion baignées de lumière naturelle, connexion Internet et système de technologie AV",
  "Des planificateurs d'événements professionnels pour que votre événement soit « la priorité du jour »",
  "Des chefs créatifs et flexibles pour adapter les menus à votre convenance",
];

const paths = [
  {
    step: "Petit comité",
    title: "Réserver un espace de réunion",
    text: "Trouvez et réservez un espace de réunion pouvant accueillir jusqu'à 20 personnes.",
    href: "#demande",
    cta: "Demander une salle",
  },
  {
    step: "Grand format",
    title: "Organiser un événement",
    text: "Envoyez les détails de votre événement et découvrez ce que nous pouvons vous offrir.",
    href: "#demande",
    cta: "Décrire mon événement",
  },
  {
    step: "Hébergement",
    title: "Réserver des chambres",
    text: "Réservez les chambres de vos invités ou de vos équipes en même temps que votre salle.",
    href: "/reservation",
    cta: "Réserver des chambres",
  },
];

const occasions = [
  "Team-building", "Conférences", "Fora", "Conventions d'entreprises", "Colloques",
  "Séminaires", "Assemblées générales", "Congrès", "Évasion",
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Événements"
        title="Vos rencontres, dans un cadre privilégié"
        intro="Un auditorium de 300 places, des salles lumineuses et une équipe qui s'occupe de tout."
        photo={photos.conference}
      >
        <a href="#demande" className="btn btn-gold">Demander un devis</a>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Par où commencer ?" title="Trois points d'entrée, selon votre projet" />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {paths.map((p, i) => (
            <li key={p.title} className="card flex flex-col p-6 md:p-8">
              <p className="flex items-center gap-3 text-sm font-bold text-cocoa">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft font-display text-lg text-forest-deep">
                  {i + 1}
                </span>
                {p.step}
              </p>
              <h3 className="mt-5 text-2xl text-forest">{p.title}</h3>
              <p className="mt-2 flex-1 text-mute">{p.text}</p>
              <Link href={p.href} className="btn btn-outline mt-6 self-start">{p.cta}</Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src={photos.poolEvent.src} alt={photos.poolEvent.alt} fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 mt-10 aspect-[3/5] overflow-hidden rounded-3xl">
              <Image src={photos.banquet.src} alt={photos.banquet.alt} fill sizes="(min-width: 768px) 20vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Notre offre de salles" title="Nous mettons à votre disposition" />
            <ul className="mt-7 space-y-4">
              {offer.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white">
                    <Check width={14} height={14} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2">
              {occasions.map((o) => (
                <li key={o} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm">{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="demande" className="container-x grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
        <SectionHead
          eyebrow="Votre demande"
          title="Parlez-nous de votre événement"
          intro="Quelques informations suffisent : notre service commercial revient vers vous avec une proposition."
        />
        <RequestForm kind="evenement" />
      </section>
    </>
  );
}
