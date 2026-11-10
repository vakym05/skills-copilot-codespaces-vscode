import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SectionHead } from "@/components/Section";
import { mailHref, photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: "Vision, missions et valeurs du Complexe Multifonctionnel Mundi, référence nationale et sous-régionale.",
};

const values = [
  {
    title: "Engagement client",
    text: "Nous développons des relations durables qui font une différence positive dans la vie de nos clients. Nous agissons avec intégrité, respect et honorons nos engagements pour la satisfaction de nos clients.",
  },
  {
    title: "Qualité",
    text: "Nous proposons des produits, des services et des processus innovants de haute qualité grâce à une équipe dynamique nourrie par la passion et la créativité.",
  },
  {
    title: "Travail d'équipe",
    text: "Nous travaillons ensemble, au-delà des considérations culturelles, pour dépasser les attentes de nos clients et développer l'entreprise.",
  },
  {
    title: "Responsabilité",
    text: "Nous soutenons et améliorons la vie des communautés dans lesquelles nous sommes implantés. Nous nous assurons que nos produits et technologies favorisent une utilisation appropriée des ressources naturelles et réduisent notre empreinte environnementale.",
  },
];

const personality = ["Élégante et accueillante", "Confiante et flexible", "Professionnelle et dynamique"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos de nous"
        title="Une référence nationale et sous-régionale"
        intro="Calme, sécurité, confort, discrétion et détente pour le bien-être de notre clientèle."
        photo={photos.hotelAerial}
      />

      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <div>
          <SectionHead eyebrow="Notre histoire" title="Le choix des délégations les plus exigeantes" />
          <p className="mt-5 text-mute">
            Depuis son ouverture, le Mundi bâtit sa notoriété sur l&apos;attrait et l&apos;intérêt sans cesse
            croissants de plusieurs délégations, dont celle de l&apos;équipe nationale de football du Cameroun — les
            Lions Indomptables — qui en fait son QG à chaque regroupement domestique.
          </p>
          <p className="mt-4 text-mute">
            S&apos;y retrouvent aussi les fédérations sportives des pays de la sous-région, des ONG, des organismes
            internationaux, des multinationales et entreprises locales, des célébrités du monde sportif et culturel,
            des opérateurs économiques, des cadres d&apos;entreprises publiques et privées et des leaders religieux.
          </p>
          <p className="mt-4 text-mute">
            La combinaison de toutes ces commodités et le professionnalisme de son personnel positionnent le Mundi en
            véritable référence.
          </p>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
          <Image src={photos.domain.src} alt={photos.domain.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-forest-deep py-16 text-white md:py-24">
        <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow">Notre vision</p>
            <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">
              Garantir un service légendaire pour les clients, un environnement de travail sûr, productif et
              épanouissant pour les employés, et des résultats mutuellement bénéfiques pour toutes les parties
              prenantes.
            </p>
            <p className="mt-5 text-white/70">
              Nous envisageons une expansion nationale avec le développement de deux autres projets hôteliers de même
              envergure dans les années à venir.
            </p>
          </div>
          <div>
            <p className="eyebrow">Nos missions</p>
            <ul className="mt-4 space-y-5 text-lg text-white/85">
              <li className="border-l-2 border-gold pl-5">
                Être la force motrice de l&apos;hôtellerie indépendante de luxe au Cameroun en offrant des prestations
                de qualité et un service innovant.
              </li>
              <li className="border-l-2 border-gold pl-5">
                Inspirer la passion à nos collaborateurs, développer leur créativité et délivrer le meilleur de leurs
                compétences pour la réussite de l&apos;entreprise.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Nos valeurs" title="Ce qui guide chaque geste" />
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} className="card p-6 md:p-8">
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 text-2xl text-forest">{v.title}</h3>
              <p className="mt-2 text-mute">{v.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-8 rounded-3xl bg-sand p-7 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">Notre personnalité</p>
            <ul className="mt-4 space-y-2 font-display text-2xl text-forest md:text-3xl">
              {personality.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Carrière</p>
            <p className="mt-4 font-display text-2xl text-forest">Nos employés sont les poumons de notre entreprise.</p>
            <p className="mt-2 text-mute">Rejoignez-nous et transformez votre énergie en actions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailHref("Candidature", "Bonjour,\n\n")} className="btn btn-forest">Envoyer ma candidature</a>
              <Link href="/contact" className="btn btn-outline">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
