"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { photos, type Photo } from "@/lib/site";
import { ArrowRight } from "./Icons";

type Zone = {
  id: string;
  label: string;
  title: string;
  text: string;
  facts: string[];
  href: string;
  cta: string;
  photo: Photo;
};

const zones: Zone[] = [
  {
    id: "sejourner",
    label: "Séjourner",
    title: "Profitez du plein air depuis votre lit",
    text: "Des espaces conçus pour éblouir, offrant une harmonie parfaite entre luxe, confort et vue imprenable.",
    facts: ["Standard, Luxe et Suites", "À partir de 75 000 FCFA", "Chambres ouvertes sur la nature"],
    href: "/chambres",
    cta: "Voir les chambres",
    photo: photos.suiteBed,
  },
  {
    id: "savourer",
    label: "Savourer",
    title: "Le Lustre et Le Kongossa",
    text: "Des buffets internationaux du petit-déjeuner au dîner, et un lobby bar pour les snacks et boissons toute la journée.",
    facts: ["Cuisine internationale", "Brunch tous les dimanches", "Bar ouvert 24h/24, 7j/7"],
    href: "/restauration",
    cta: "Voir la restauration",
    photo: photos.lustre2,
  },
  {
    id: "reunir",
    label: "Réunir",
    title: "Un cadre privilégié pour vos rencontres",
    text: "Team-building, conférences, séminaires, assemblées générales, congrès : un espace modulable et une équipe dédiée.",
    facts: ["Auditorium jusqu'à 300 invités", "Salles de réunion équipées AV", "Menus adaptés par nos chefs"],
    href: "/evenements",
    cta: "Organiser un événement",
    photo: photos.conference,
  },
  {
    id: "se-ressourcer",
    label: "Se ressourcer",
    title: "Fitness, massage et hammam",
    text: "Un espace dédié au bien-être, combinant fitness, soins et détente pour une expérience revitalisante.",
    facts: ["Salle de sport de 06h à 22h", "Massage au savon noir", "Bain de vapeur oriental"],
    href: "/bien-etre",
    cta: "Découvrir le bien-être",
    photo: photos.poolAerial,
  },
  {
    id: "performer",
    label: "Performer",
    title: "Le QG des Lions Indomptables",
    text: "L'équipe nationale de football du Cameroun en fait son quartier général à chaque regroupement domestique.",
    facts: ["Stade et piste d'athlétisme", "Délégations sportives de la sous-région", "Calme, sécurité et discrétion"],
    href: "/a-propos",
    cta: "Notre histoire",
    photo: photos.stadium,
  },
];

/** One screen, five facets of the estate: pick a verb, the scene changes. */
export default function DomainExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const zone = zones[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + zones.length) % zones.length;
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="Les facettes du complexe"
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
      >
        {zones.map((z, i) => (
          <button
            key={z.id}
            id={`${uid}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`group flex shrink-0 items-baseline gap-3 rounded-full px-4 py-2.5 text-left transition-colors lg:rounded-2xl lg:px-5 lg:py-4 ${
              i === active ? "bg-forest text-white" : "bg-white text-forest hover:bg-gold-soft/50"
            }`}
          >
            <span className={`hidden text-xs font-bold lg:inline ${i === active ? "text-gold" : "text-mute"}`}>
              0{i + 1}
            </span>
            <span className="font-display text-lg lg:text-2xl">{z.label}</span>
          </button>
        ))}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="relative isolate overflow-hidden rounded-3xl bg-forest-deep text-white"
      >
        <div key={zone.id} className="fade">
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <Image
              src={zone.photo.src}
              alt={zone.photo.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent" />
          </div>
          <div className="-mt-16 relative p-6 md:p-9">
            <h3 className="text-2xl md:text-4xl">{zone.title}</h3>
            <p className="mt-3 max-w-2xl text-white/80">{zone.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {zone.facts.map((f) => (
                <li key={f} className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/90">
                  {f}
                </li>
              ))}
            </ul>
            <Link href={zone.href} className="btn btn-gold mt-7">
              {zone.cta} <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
