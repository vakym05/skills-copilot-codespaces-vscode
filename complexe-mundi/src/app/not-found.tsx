import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Cette page n&apos;existe pas</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">
        Le lien est peut-être ancien. Retrouvez nos chambres, nos tables et nos espaces depuis l&apos;accueil.
      </p>
      <Link href="/" className="btn btn-forest mt-8">Retour à l&apos;accueil</Link>
    </section>
  );
}
