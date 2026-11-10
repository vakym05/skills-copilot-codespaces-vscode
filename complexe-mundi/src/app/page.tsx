import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import DayTimeline from "@/components/DayTimeline";
import DomainExplorer from "@/components/DomainExplorer";
import { ArrowRight } from "@/components/Icons";
import MapCard from "@/components/MapCard";
import { SectionHead } from "@/components/Section";
import { formatFcfa, photos, rooms, site, telHref, telLabel } from "@/lib/site";

const stats = [
  { value: "+10", unit: "hectares", label: "de nature et de jardins" },
  { value: "10", unit: "min", label: "de l'aéroport de Nsimalen" },
  { value: "300", unit: "invités", label: "dans le grand auditorium" },
  { value: "24h", unit: "/24", label: "au bar Le Kongossa, 7j/7" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate bg-forest-deep text-white">
        <Image
          src={photos.sunset.src}
          alt={photos.sunset.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/25" />
        <div className="container-x flex min-h-[34rem] flex-col justify-end pb-10 pt-24 md:min-h-[40rem] md:pb-28">
          <p className="eyebrow rise">Bienvenue au {site.fullName}</p>
          <h1 className="rise rise-2 mt-4 max-w-4xl text-[2.6rem] leading-[1.05] md:text-7xl">
            Offrez-vous une expérience de séjour exceptionnelle
          </h1>
          <p className="rise rise-3 mt-5 max-w-xl text-lg text-white/85">
            Plus qu&apos;un hôtel : un domaine de plus de 10 hectares, loin de la pollution et des tracasseries des
            centres urbains.
          </p>
        </div>
        <div className="container-x relative z-10 pb-8 md:absolute md:inset-x-0 md:bottom-0 md:translate-y-1/2 md:pb-0">
          <BookingBar />
        </div>
      </section>

      {/* Key figures */}
      <section className="bg-sand pt-6 md:pt-24">
        <dl className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-14">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col border-l-2 border-gold pl-4">
              <dt className="order-2 mt-1 text-sm text-mute">{s.label}</dt>
              <dd className="font-display text-4xl text-forest md:text-5xl">
                {s.value}
                <span className="ml-1 text-lg text-cocoa md:text-xl">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Introduction */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Plus qu&apos;un hôtel</p>
          <h2 className="mt-3 text-3xl text-forest md:text-5xl">Un joyau architectural au cœur de la nature</h2>
          <p className="mt-5 text-lg text-mute">
            Bâti sur une superficie de plus de 10 hectares, à un jet de pierre de l&apos;aéroport international de
            Yaoundé-Nsimalen, au lieu-dit Ntoun, le complexe est chapeauté par un jardin botanique.
          </p>
          <p className="mt-4 text-mute">
            Sa nature et la qualité de ses infrastructures en font un cadre privilégié pour des séjours individuels
            et collectifs : team-building, conférences, fora, conventions d&apos;entreprises, colloques, séminaires,
            assemblées générales, congrès, évasion et bien d&apos;autres types de rencontres.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/reservation" className="btn btn-forest">Réserver maintenant</Link>
            <Link href="/a-propos" className="btn btn-outline">
              En savoir plus <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
            <Image
              src={photos.hotelAerial.src}
              alt={photos.hotelAerial.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-3 hidden aspect-square w-40 overflow-hidden rounded-2xl border-4 border-paper sm:block md:-left-8 md:w-52">
            <Image src={photos.reception.src} alt={photos.reception.alt} fill sizes="208px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Explorer */}
      <section className="bg-sand py-16 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Explorer le domaine"
            title="Cinq façons de vivre le Mundi"
            intro="Choisissez une envie : le complexe vous montre ce qu'il a à offrir."
          />
          <div className="mt-10">
            <DomainExplorer />
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Chambres et suites"
            title="Trois niveaux de confort"
            intro="Des espaces conçus pour éblouir, entre luxe, confort et vue imprenable."
          />
          <Link href="/chambres" className="btn btn-outline">
            Comparer les chambres <ArrowRight width={18} height={18} />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {rooms.map((r) => (
            <li key={r.id}>
              <Link href={`/chambres#${r.id}`} className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.photo.src}
                    alt={r.photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-forest">{r.name}</h3>
                  <p className="mt-2 text-sm text-mute">{r.pitch}</p>
                  <p className="mt-5 flex items-baseline justify-between">
                    <span>
                      <span className="font-display text-2xl text-forest">{formatFcfa(r.price)}</span>
                      <span className="text-sm text-mute"> / nuit</span>
                    </span>
                    <ArrowRight className="text-gold transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* A day at Mundi */}
      <section className="bg-sand py-16 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Une journée au Mundi"
            title="Ce qui est ouvert, heure par heure"
            intro="Du fitness à l'aube au dernier verre au Kongossa : composez votre journée d'un coup d'œil."
          />
          <div className="mt-10">
            <DayTimeline />
          </div>
        </div>
      </section>

      {/* Reputation */}
      <section className="relative isolate overflow-hidden bg-forest-deep py-20 text-white md:py-28">
        <Image src={photos.stadium.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
        <div className="container-x">
          <p className="eyebrow">{site.tagline}</p>
          <blockquote className="mt-5 max-w-4xl font-display text-2xl leading-snug md:text-4xl">
            Le Mundi allie calme, sécurité, confort, discrétion et détente : un cadre unique qui offre à tous ceux qui
            y séjournent une expérience incomparable.
          </blockquote>
          <p className="mt-8 max-w-3xl text-white/75">
            Depuis son ouverture, le complexe accueille l&apos;équipe nationale de football du Cameroun — les Lions
            Indomptables, qui en font leur QG à chaque regroupement domestique — ainsi que des fédérations sportives
            de la sous-région, des ONG, des organismes internationaux, des multinationales et des entreprises locales.
          </p>
        </div>
      </section>

      {/* Access */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <SectionHead eyebrow="Nous trouver" title="À 10 minutes de l'aéroport" intro={site.addressShort} />
          <ul className="mt-6 space-y-2">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="font-display text-2xl text-forest hover:text-leaf">{telLabel(p)}</a>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-forest mt-7">Nous écrire</Link>
        </div>
        <MapCard />
      </section>
    </>
  );
}
