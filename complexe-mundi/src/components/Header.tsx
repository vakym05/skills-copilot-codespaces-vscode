"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, telHref, telLabel } from "@/lib/site";
import { Close, Menu, Phone } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-forest-deep/95 text-white backdrop-blur">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-deep"
      >
        Aller au contenu
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} — accueil`}>
          <Image
            src="/images/logo.jpg"
            alt=""
            width={223}
            height={110}
            priority
            className="h-10 w-auto rounded-md md:h-11"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:text-gold ${
                      active ? "bg-white/10 text-gold" : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(site.phones[0])}
            className="hidden items-center gap-2 text-sm font-semibold text-white/85 hover:text-gold xl:flex"
          >
            <Phone width={16} height={16} /> {telLabel(site.phones[0])}
          </a>
          <Link href="/reservation" className="btn btn-gold hidden sm:inline-flex">
            Réserver
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="fade fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-forest-deep md:top-[4.5rem] lg:hidden"
        >
          <nav aria-label="Navigation mobile" className="container-x py-6">
            <ul className="divide-y divide-white/10">
              {[{ href: "/", label: "Accueil" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 font-display text-2xl"
                  >
                    {item.label}
                    <span aria-hidden className="text-gold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/reservation" className="btn btn-gold mt-8 w-full">
              Réserver un séjour
            </Link>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="flex items-center gap-2 py-1 hover:text-gold">
                  <Phone width={16} height={16} /> {telLabel(p)}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
