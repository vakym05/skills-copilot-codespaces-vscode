import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { Check } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import RoomCompare from "@/components/RoomCompare";
import { SectionHead } from "@/components/Section";
import { formatFcfa, photos, rooms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chambres et suites",
  description: "Chambres Standard, Luxe et Suites du Complexe Mundi : équipements, tarifs et réservation.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Chambres et suites"
        title="Profitez du plein air depuis votre lit"
        intro="Des espaces conçus pour éblouir, offrant une harmonie parfaite entre luxe, confort et vue imprenable."
        photo={photos.suiteLounge}
      >
        <a href="#comparatif" className="btn btn-gold">Comparer les catégories</a>
        <Link href="/reservation" className="btn btn-ghost">Réserver</Link>
      </PageHero>

      <nav aria-label="Catégories" className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur md:top-[4.5rem]">
        <ul className="container-x flex gap-2 overflow-x-auto py-3 text-sm font-bold [scrollbar-width:none]">
          {rooms.map((r) => (
            <li key={r.id}>
              <a href={`#${r.id}`} className="block whitespace-nowrap rounded-full bg-sand px-4 py-2 text-forest hover:bg-gold-soft">
                {r.name} · {formatFcfa(r.price)}
              </a>
            </li>
          ))}
          <li>
            <a href="#comparatif" className="block whitespace-nowrap rounded-full px-4 py-2 text-mute hover:text-forest">Comparatif</a>
          </li>
        </ul>
      </nav>

      <div className="container-x divide-y divide-line">
        {rooms.map((r, i) => (
          <section key={r.id} id={r.id} className="grid gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20">
            <div className={i % 2 ? "md:order-2" : ""}>
              <Gallery photos={r.gallery} />
            </div>
            <div>
              <p className="eyebrow">Catégorie 0{i + 1}</p>
              <h2 className="mt-2 text-3xl text-forest md:text-5xl">{r.name}</h2>
              <p className="mt-3">
                <span className="font-display text-3xl text-cocoa">{formatFcfa(r.price)}</span>
                <span className="text-mute"> / nuit</span>
              </p>
              <p className="mt-4 text-lg text-mute">{r.pitch}</p>

              <h3 className="mt-7 font-sans text-sm font-bold uppercase tracking-wider text-forest">Confort</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {r.comforts.map((c) => (
                  <li key={c} className="rounded-full bg-sand px-3.5 py-1.5 text-sm">{c}</li>
                ))}
              </ul>

              <h3 className="mt-7 font-sans text-sm font-bold uppercase tracking-wider text-forest">Salle de bain et services</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {r.bathroom.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check width={18} height={18} className="shrink-0 text-leaf" /> {b}
                  </li>
                ))}
              </ul>

              <Link href={`/reservation?chambre=${r.id}`} className="btn btn-forest mt-8">
                Réserver cette {r.id === "suite" ? "suite" : "chambre"}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section id="comparatif" className="bg-sand py-16 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Comparatif"
            title="Quelle catégorie est faite pour vous ?"
            intro="Tous les équipements, côte à côte."
          />
          <div className="mt-10">
            <RoomCompare />
          </div>
        </div>
      </section>
    </>
  );
}
