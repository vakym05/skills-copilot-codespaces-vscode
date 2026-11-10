import type { Metadata } from "next";
import Image from "next/image";
import DayTimeline from "@/components/DayTimeline";
import Gallery from "@/components/Gallery";
import OpenBadge from "@/components/OpenBadge";
import PageHero from "@/components/PageHero";
import { SectionHead } from "@/components/Section";
import { photos, services, telHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restauration",
  description: "Le Lustre, cuisine internationale en buffets, et Le Kongossa, bar et tapas ouvert 24h/24 au Complexe Mundi.",
};

const meals = services.filter((s) => s.place === "Le Lustre");

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Restauration"
        title="Deux adresses, du lever au bout de la nuit"
        intro="Buffets internationaux au Lustre, snacks et boissons au Kongossa."
        photo={photos.lustre2}
      >
        <a href="#le-lustre" className="btn btn-gold">Le Lustre</a>
        <a href="#le-kongossa" className="btn btn-ghost">Le Kongossa</a>
      </PageHero>

      <section id="le-lustre" className="container-x grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <div>
          <p className="eyebrow">Cuisine internationale</p>
          <h2 className="mt-2 text-4xl text-forest md:text-6xl">Le Lustre</h2>
          <p className="mt-4 text-lg text-mute">
            Que ce soit pour le petit-déjeuner, le déjeuner ou le dîner, nos buffets internationaux vous sont proposés
            dans un cadre très relaxant.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {meals.map((m) => (
              <li key={m.id} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center">
                <h3 className="text-xl text-forest">{m.name}</h3>
                <dl className="text-sm">
                  {m.lines.map((l) => (
                    <div key={l.label} className="flex gap-2">
                      <dt className="text-mute">{l.label} :</dt>
                      <dd className="font-bold">{l.hours}</dd>
                    </div>
                  ))}
                </dl>
                <OpenBadge serviceId={m.id} />
              </li>
            ))}
          </ul>
        </div>
        <Gallery photos={[photos.lustre1, photos.lustre2, photos.lustre3, photos.lustre4]} />
      </section>

      <section id="le-kongossa" className="bg-forest-deep text-white">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={photos.bar.src} alt={photos.bar.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Bar — tapas</p>
            <h2 className="mt-2 text-4xl md:text-6xl">Le Kongossa</h2>
            <p className="mt-4 text-lg text-white/80">
              Toute la journée, notre majestueux lobby bar vous propose une sélection de snacks et boissons à déguster
              sur place.
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-display text-3xl text-gold">24h/24 · 7j/7</span>
              <span className="rounded-full bg-white px-1 py-1"><OpenBadge serviceId="bar" /></span>
            </p>
            <a href={telHref(site.phones[0])} className="btn btn-gold mt-8">Réserver une table</a>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Horaires" title="Tous les services sur une journée" />
          <div className="mt-10"><DayTimeline /></div>
        </div>
      </section>
    </>
  );
}
