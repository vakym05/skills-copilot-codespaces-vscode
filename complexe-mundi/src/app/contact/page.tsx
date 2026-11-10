import type { Metadata } from "next";
import { Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import MapCard from "@/components/MapCard";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import { photos, site, telHref, telLabel, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Adresse, téléphones, e-mail et WhatsApp du Complexe Mundi à Ntoun, Yaoundé-Nsimalen.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre séjour"
        intro="Écrivez-nous pour toutes vos préoccupations : nous nous chargeons de vous répondre dans les meilleurs délais."
        photo={photos.reception}
      />

      <section className="container-x grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div>
          <ul className="grid gap-4">
            <li className="card flex gap-4 p-5">
              <Phone className="mt-1 shrink-0 text-gold" />
              <div>
                <h2 className="font-sans text-sm font-bold text-mute">Téléphone</h2>
                <ul className="mt-1 space-y-1">
                  {site.phones.map((p) => (
                    <li key={p}>
                      <a href={telHref(p)} className="font-display text-xl text-forest hover:text-leaf">{telLabel(p)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="card flex gap-4 p-5">
              <WhatsApp className="mt-1 shrink-0 text-gold" />
              <div>
                <h2 className="font-sans text-sm font-bold text-mute">WhatsApp</h2>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="mt-1 block font-display text-xl text-forest hover:text-leaf">
                  Démarrer une conversation
                </a>
              </div>
            </li>
            <li className="card flex gap-4 p-5">
              <Mail className="mt-1 shrink-0 text-gold" />
              <div className="min-w-0">
                <h2 className="font-sans text-sm font-bold text-mute">E-mail</h2>
                <a href={`mailto:${site.email}`} className="mt-1 block break-all font-display text-lg text-forest hover:text-leaf">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="card flex gap-4 p-5">
              <Pin className="mt-1 shrink-0 text-gold" />
              <div>
                <h2 className="font-sans text-sm font-bold text-mute">Adresse</h2>
                <p className="mt-1 font-display text-xl text-forest">{site.addressShort}</p>
                <p className="text-sm text-mute">À 10 minutes de l&apos;aéroport international</p>
              </div>
            </li>
          </ul>
        </div>
        <RequestForm kind="contact" />
      </section>

      <section className="container-x pb-16 md:pb-24">
        <MapCard />
      </section>
    </>
  );
}
