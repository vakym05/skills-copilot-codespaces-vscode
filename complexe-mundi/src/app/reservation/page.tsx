import type { Metadata } from "next";
import { Check } from "@/components/Icons";
import RequestForm from "@/components/RequestForm";
import { site, telHref, telLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre séjour au Complexe Mundi : choisissez vos dates et votre chambre, nous confirmons rapidement.",
};

const isDate = (s: unknown): s is string => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

const steps = [
  "Choisissez vos dates et votre hébergement",
  "Envoyez la demande par WhatsApp ou e-mail",
  "Notre équipe confirme la disponibilité et le montant",
];

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const initial = {
    arrivee: isDate(q.arrivee) ? q.arrivee : undefined,
    depart: isDate(q.depart) ? q.depart : undefined,
    chambre: typeof q.chambre === "string" ? q.chambre : undefined,
  };

  return (
    <section className="bg-sand">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1fr_1.5fr] md:py-20">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow">Réservation</p>
          <h1 className="mt-3 text-4xl text-forest md:text-6xl">Réservez votre séjour</h1>
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest font-bold text-white">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-start gap-2 text-sm text-mute">
            <Check width={18} height={18} className="mt-0.5 shrink-0 text-leaf" />
            Aucun paiement en ligne : la réservation est confirmée par notre service commercial.
          </p>
          <p className="mt-6 text-sm text-mute">
            Vous préférez appeler ?{" "}
            <a href={telHref(site.phones[0])} className="font-bold text-forest underline">{telLabel(site.phones[0])}</a>
          </p>
        </div>
        <RequestForm kind="reservation" initial={initial} />
      </div>
    </section>
  );
}
