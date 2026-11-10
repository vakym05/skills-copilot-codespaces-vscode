import type { Metadata } from "next";
import Image from "next/image";
import OpenBadge from "@/components/OpenBadge";
import PageHero from "@/components/PageHero";
import { photos, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bien-être",
  description: "Centre de fitness ouvert tous les jours de 06h à 22h, massage et hammam au Complexe Mundi.",
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        eyebrow="Bien-être"
        title="Source de bien-être"
        intro="Un espace dédié au bien-être, combinant fitness, soins et détente pour une expérience revitalisante."
        photo={photos.poolAerial}
      />

      <section className="container-x py-16 md:py-24">
        <p className="max-w-3xl text-lg text-mute">
          Profitez d&apos;installations modernes et d&apos;une équipe de professionnels à votre service pour répondre
          à tous vos besoins de santé.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-forest-deep p-7 text-white md:p-10">
            <Image src={photos.fitness.src} alt={photos.fitness.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-transparent" />
            <span className="self-start rounded-full bg-white px-1 py-1"><OpenBadge serviceId="fitness" /></span>
            <h2 className="mt-4 text-3xl md:text-4xl">Centre de fitness</h2>
            <p className="mt-3 font-display text-lg italic text-gold-soft">
              « La motivation est ce qui vous fait démarrer. L&apos;habitude est ce qui vous permet de tenir. »
            </p>
            <p className="mt-3 text-white/80">
              Notre salle de sport est ouverte tous les jours de 06h à 22h pour vous permettre de garder la ligne et
              de vous détendre.
            </p>
          </article>

          <article className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-forest-deep p-7 text-white md:p-10">
            <Image src={photos.massage.src} alt={photos.massage.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-transparent" />
            <h2 className="text-3xl md:text-4xl">Massage &amp; hammam</h2>
            <p className="mt-3 text-white/80">
              Nous nous ferons le plaisir de nous occuper de votre bien-être, le tout dans une ambiance chaleureuse et
              reposante. Un bain de vapeur oriental et un massage au savon noir exfoliant pour évacuer les toxines de
              votre corps et révéler une peau neuve.
            </p>
            <a
              href={whatsappHref("Bonjour, je souhaite réserver un soin (massage / hammam).")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-6 self-start"
            >
              Réserver un soin
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
