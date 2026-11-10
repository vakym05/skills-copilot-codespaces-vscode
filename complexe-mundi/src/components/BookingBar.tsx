"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { rooms } from "@/lib/site";

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Compact "when / which room" bar that pre-fills the reservation page. */
export default function BookingBar() {
  const router = useRouter();
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [room, setRoom] = useState("");
  const today = iso(new Date());

  return (
    <form
      className="grid gap-3 rounded-3xl bg-white p-4 text-ink shadow-xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_auto] lg:items-end lg:rounded-full lg:py-3 lg:pl-8 lg:pr-3"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (arrival) q.set("arrivee", arrival);
        if (departure) q.set("depart", departure);
        if (room) q.set("chambre", room);
        router.push(`/reservation${q.size ? `?${q}` : ""}`);
      }}
    >
      <div>
        <label htmlFor="bb-arrivee" className="label">Arrivée</label>
        <input
          id="bb-arrivee"
          type="date"
          className="field"
          min={today}
          value={arrival}
          onChange={(e) => {
            setArrival(e.target.value);
            if (departure && e.target.value >= departure) setDeparture("");
          }}
        />
      </div>
      <div>
        <label htmlFor="bb-depart" className="label">Départ</label>
        <input
          id="bb-depart"
          type="date"
          className="field"
          min={arrival || today}
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="bb-chambre" className="label">Hébergement</label>
        <select id="bb-chambre" className="field" value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="">Tous les hébergements</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-forest sm:col-span-2 lg:col-span-1 lg:h-[3.25rem] lg:px-8">
        Vérifier et réserver
      </button>
    </form>
  );
}
