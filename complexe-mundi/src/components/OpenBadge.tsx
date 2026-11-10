"use client";

import { useEffect, useState } from "react";
import { formatMinutes, isOpen, nowInCameroon, services, todaySlot } from "@/lib/site";

/** Live "ouvert / fermé" pill for one service, in Cameroon local time. */
export default function OpenBadge({ serviceId }: { serviceId: string }) {
  const service = services.find((s) => s.id === serviceId);
  const [now, setNow] = useState<ReturnType<typeof nowInCameroon> | null>(null);

  useEffect(() => {
    setNow(nowInCameroon());
    const id = setInterval(() => setNow(nowInCameroon()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!service || !now) return <span className="inline-block h-7 w-24 rounded-full bg-sand" aria-hidden />;

  const open = isOpen(service, now);
  const slot = todaySlot(service, now);
  let detail = "";
  if (open && slot) detail = slot.close - slot.open >= 1440 ? "24h/24" : `jusqu'à ${formatMinutes(slot.close)}`;
  else if (slot && now.minutes < slot.open) detail = `ouvre à ${formatMinutes(slot.open)}`;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
        open ? "bg-leaf/12 text-leaf" : "bg-sand text-mute"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${open ? "bg-leaf" : "bg-mute/50"}`} aria-hidden />
      {open ? "Ouvert" : "Fermé"}
      {detail && <span className="font-semibold opacity-80">· {detail}</span>}
    </span>
  );
}
