"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/site";
import { Close } from "./Icons";

/** Photo mosaic with a keyboard-friendly lightbox built on <dialog>. */
export default function Gallery({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className={`grid grid-cols-2 gap-2 md:gap-3 ${className}`}>
        {photos.map((p, i) => (
          <li key={p.src} className={i === 0 && photos.length !== 2 ? "col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sand"
              aria-label={`Agrandir la photo : ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92vh] w-[min(96vw,70rem)] overflow-hidden rounded-2xl bg-forest-deep p-0 text-white backdrop:bg-black/80"
      >
        {current && (
          <figure>
            <div className="relative h-[70vh] w-full">
              <Image src={current.src} alt={current.alt} fill sizes="96vw" className="object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span>{current.alt}</span>
              <span className="flex items-center gap-1">
                {photos.length > 1 && (
                  <>
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" onClick={() => step(-1)} aria-label="Photo précédente">←</button>
                    <span className="tabular-nums text-white/60">{index! + 1}/{photos.length}</span>
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" onClick={() => step(1)} aria-label="Photo suivante">→</button>
                  </>
                )}
                <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" onClick={() => setIndex(null)} aria-label="Fermer">
                  <Close />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
