import Link from "next/link";
import { site, telHref, whatsappHref } from "@/lib/site";
import { Calendar, Phone, WhatsApp } from "./Icons";

/** Thumb-reach actions on phones; a WhatsApp bubble on larger screens. */
export default function MobileBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-3 text-xs font-bold text-forest">
          <a href={telHref(site.phones[0])} className="flex flex-col items-center gap-1 py-2.5">
            <Phone /> Appeler
          </a>
          <a
            href={whatsappHref("Bonjour, je souhaite un renseignement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2.5"
          >
            <WhatsApp /> WhatsApp
          </a>
          <Link href="/reservation" className="flex flex-col items-center gap-1 bg-gold py-2.5 text-forest-deep">
            <Calendar /> Réserver
          </Link>
        </div>
      </div>
      <a
        href={whatsappHref("Bonjour, je souhaite un renseignement.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 place-items-center rounded-full bg-[#1fa855] text-white shadow-lg transition-transform hover:scale-105 lg:grid"
      >
        <WhatsApp width={28} height={28} />
      </a>
    </>
  );
}
