import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/site";

export default function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      <Image
        src={photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-transparent" />
      <div className="container-x pb-12 pt-20 md:pb-16 md:pt-28">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="rise rise-2 mt-3 max-w-3xl text-4xl md:text-6xl">{title}</h1>
        {intro && <p className="rise rise-3 mt-5 max-w-2xl text-lg text-white/80">{intro}</p>}
        {children && <div className="rise rise-3 mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
