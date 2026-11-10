import Link from "next/link";
import { nav, site, telHref, telLabel, whatsappHref } from "@/lib/site";
import { Mail, Phone, Pin, WhatsApp } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-forest-deep pb-24 text-white/75 lg:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl text-white">{site.fullName}</p>
          <p className="mt-1 text-gold">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Un cadre unique qui allie calme, sécurité, confort, discrétion et détente, à 10 minutes de
            l&apos;aéroport international de Yaoundé-Nsimalen.
          </p>
        </div>

        <nav aria-label="Liens du pied de page">
          <p className="eyebrow">Explorer</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">{item.label}</Link>
              </li>
            ))}
            <li><Link href="/reservation" className="hover:text-gold">Réservation</Link></li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Nous joindre</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Pin className="mt-0.5 shrink-0 text-gold" />
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {site.addressShort}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 shrink-0 text-gold" />
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="hover:text-gold">{telLabel(p)}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-gold">{site.email}</a>
            </li>
            <li className="flex gap-3">
              <WhatsApp className="mt-0.5 shrink-0 text-gold" />
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Discuter sur WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs text-white/50">
          © {new Date().getFullYear()} {site.fullName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
