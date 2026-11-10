import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl md:text-5xl ${light ? "text-white" : "text-forest"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-white/75" : "text-mute"}`}>{intro}</p>}
    </div>
  );
}
