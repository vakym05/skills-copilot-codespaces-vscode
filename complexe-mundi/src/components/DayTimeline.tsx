"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMinutes, nowInCameroon, services } from "@/lib/site";

const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const dayOrder = [1, 2, 3, 4, 5, 6, 0];
const pct = (m: number) => `${(m / 1440) * 100}%`;
const ticks = [0, 6, 12, 18, 24];

/**
 * "Une journée au Mundi": every service laid out on a 24-hour track,
 * with a live marker showing the current time on site.
 */
export default function DayTimeline() {
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const first = nowInCameroon();
    setNow(first);
    setDay(first.day);
    const id = setInterval(() => setNow(nowInCameroon()), 60_000);
    return () => clearInterval(id);
  }, []);

  const isToday = now?.day === day;

  return (
    <div className="card p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Choisir un jour" className="flex flex-wrap gap-1.5">
          {dayOrder.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={d === day}
              onClick={() => setDay(d)}
              className={`min-h-10 rounded-full px-3.5 text-sm font-bold transition-colors ${
                d === day ? "bg-forest text-white" : "bg-sand text-forest hover:bg-gold-soft"
              }`}
            >
              <span className="sm:hidden">{dayNames[d].slice(0, 3)}</span>
              <span className="hidden sm:inline">{dayNames[d]}</span>
              {now?.day === d && <span className="ml-1.5 text-gold" aria-label="aujourd'hui">●</span>}
            </button>
          ))}
        </div>
        <p className="text-sm text-mute" aria-live="polite">
          {now ? (
            <>
              Il est <strong className="text-forest">{formatMinutes(now.minutes)}</strong> au complexe
            </>
          ) : (
            "Heure locale du complexe"
          )}
        </p>
      </div>

      <div className="relative mt-8">
        {/* hour scale */}
        <div className="relative ml-0 h-5 text-xs text-mute md:ml-44">
          {ticks.map((h) => (
            <span
              key={h}
              className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
              style={{ left: pct(h * 60) }}
            >
              {String(h % 24).padStart(2, "0")}h
            </span>
          ))}
        </div>

        <ul className="mt-2 space-y-4 md:space-y-3">
          {services.map((s) => {
            const slot = s.slots.find((x) => x.days.includes(day));
            const open = !!slot && isToday && !!now && now.minutes >= slot.open && now.minutes < slot.close;
            return (
              <li key={s.id} className="md:flex md:items-center">
                <div className="mb-1.5 flex items-baseline justify-between gap-3 md:mb-0 md:w-44 md:shrink-0 md:flex-col md:items-start md:gap-0">
                  <Link href={s.href} className="font-bold text-forest hover:underline">{s.name}</Link>
                  <span className="text-xs text-mute">
                    {s.place}
                    <span className="md:hidden">
                      {" · "}
                      {slot
                        ? slot.close - slot.open >= 1440
                          ? "24h/24"
                          : `${formatMinutes(slot.open)} – ${formatMinutes(slot.close)}`
                        : "fermé"}
                    </span>
                  </span>
                </div>
                <div className="relative h-10 flex-1 overflow-hidden rounded-xl bg-sand">
                  {ticks.slice(1, -1).map((h) => (
                    <span key={h} className="absolute inset-y-0 w-px bg-line" style={{ left: pct(h * 60) }} />
                  ))}
                  {slot ? (
                    <div
                      className={`absolute inset-y-1 flex items-center overflow-hidden rounded-lg px-2.5 text-xs font-bold whitespace-nowrap transition-colors ${
                        open ? "bg-leaf text-white" : "bg-gold-soft text-forest-deep"
                      }`}
                      style={{ left: pct(slot.open), width: pct(slot.close - slot.open) }}
                    >
                      <span className="hidden md:inline">
                        {slot.close - slot.open >= 1440
                          ? "24h/24"
                          : `${formatMinutes(slot.open)} – ${formatMinutes(slot.close)}`}
                      </span>
                      {open && <span className="font-semibold md:ml-2">
                        <span className="hidden md:inline">· </span>ouvert
                      </span>}
                    </div>
                  ) : (
                    <span className="absolute inset-0 hidden items-center px-3 text-xs text-mute md:flex">
                      Pas de service ce jour-là
                    </span>
                  )}
                  {isToday && now && (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 w-0.5 bg-cocoa"
                      style={{ left: pct(now.minutes) }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
