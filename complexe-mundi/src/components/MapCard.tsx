"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Pin } from "./Icons";

/** The Google map is only loaded on demand, so it never slows the page down. */
export default function MapCard() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-forest text-white md:aspect-[16/9]">
      {loaded ? (
        <iframe
          src={site.mapEmbed}
          title={`Carte : ${site.fullName}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#2f6b54,transparent_60%)] p-6 text-center">
          <div>
            <Pin width={36} height={36} className="mx-auto text-gold" />
            <p className="mt-3 font-display text-2xl">{site.addressShort}</p>
            <p className="mt-1 text-sm text-white/70">À 10 minutes de l&apos;aéroport international de Yaoundé-Nsimalen</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn btn-gold" onClick={() => setLoaded(true)}>
                Afficher la carte
              </button>
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Itinéraire
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
