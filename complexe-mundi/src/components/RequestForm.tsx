"use client";

import { useMemo, useRef, useState } from "react";
import { formatFcfa, mailHref, rooms, site, whatsappHref } from "@/lib/site";
import { Mail, WhatsApp } from "./Icons";

type Kind = "reservation" | "evenement" | "contact";

const eventTypes = [
  "Séminaire / conférence",
  "Team-building",
  "Assemblée générale / congrès",
  "Mariage / réception",
  "Réunion (jusqu'à 20 personnes)",
  "Regroupement sportif",
  "Autre",
];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const frDate = (s: string) => (s ? new Date(`${s}T12:00:00`).toLocaleDateString("fr-FR", { dateStyle: "long" }) : "");
const nightsBetween = (a: string, b: string) =>
  a && b ? Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000) : 0;

const titles: Record<Kind, string> = {
  reservation: "Demande de réservation",
  evenement: "Demande d'événement",
  contact: "Message depuis le site",
};

/**
 * One form for the three kinds of request. There is no server-side mailer:
 * the request is composed as a clear message and handed to WhatsApp or to the
 * visitor's mail app, addressed to the hotel's commercial service.
 */
export default function RequestForm({
  kind,
  initial = {},
}: {
  kind: Kind;
  initial?: { arrivee?: string; depart?: string; chambre?: string };
}) {
  const form = useRef<HTMLFormElement>(null);
  const today = useMemo(() => iso(new Date()), []);
  const [v, setV] = useState({
    nom: "",
    telephone: "",
    email: "",
    societe: "",
    arrivee: initial.arrivee ?? "",
    depart: initial.depart ?? "",
    chambre: rooms.some((r) => r.id === initial.chambre) ? initial.chambre! : "standard",
    nbChambres: 1,
    personnes: 1,
    typeEvenement: eventTypes[0],
    date: "",
    participants: 20,
    hebergement: false,
    message: "",
  });
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  const set = <K extends keyof typeof v>(key: K, value: (typeof v)[K]) => setV((s) => ({ ...s, [key]: value }));

  const room = rooms.find((r) => r.id === v.chambre)!;
  const nights = nightsBetween(v.arrivee, v.depart);
  const estimate = nights > 0 ? nights * room.price * v.nbChambres : 0;

  const compose = () => {
    const lines: string[] = [`${titles[kind]} — ${site.name}`, ""];
    lines.push(`Nom : ${v.nom}`);
    if (v.societe) lines.push(`Société / organisation : ${v.societe}`);
    lines.push(`Téléphone : ${v.telephone}`);
    if (v.email) lines.push(`E-mail : ${v.email}`);
    if (kind === "reservation") {
      lines.push(
        "",
        `Arrivée : ${frDate(v.arrivee)}`,
        `Départ : ${frDate(v.depart)} (${nights} nuit${nights > 1 ? "s" : ""})`,
        `Hébergement : ${v.nbChambres} × ${room.name} (${formatFcfa(room.price)} / nuit)`,
        `Personnes : ${v.personnes}`,
        `Estimation : ${formatFcfa(estimate)}`,
      );
    }
    if (kind === "evenement") {
      lines.push(
        "",
        `Type d'événement : ${v.typeEvenement}`,
        `Date souhaitée : ${frDate(v.date)}`,
        `Participants : ${v.participants}`,
        `Hébergement des participants : ${v.hebergement ? "oui" : "non"}`,
      );
    }
    if (v.message) lines.push("", v.message);
    return lines.join("\n");
  };

  const send = (channel: "whatsapp" | "email") => {
    if (!form.current?.reportValidity()) return;
    const body = compose();
    const href = channel === "whatsapp" ? whatsappHref(body) : mailHref(titles[kind], body);
    if (channel === "whatsapp") window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
    setSent(channel);
  };

  return (
    <form ref={form} className="card grid gap-5 p-5 md:p-8" onSubmit={(e) => { e.preventDefault(); send("whatsapp"); }}>
      {kind === "reservation" && (
        <fieldset className="grid gap-5">
          <legend className="font-display text-2xl text-forest">Votre séjour</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-arrivee" className="label">Arrivée *</label>
              <input id="f-arrivee" type="date" required min={today} className="field" value={v.arrivee}
                onChange={(e) => setV((s) => ({ ...s, arrivee: e.target.value, depart: s.depart && e.target.value >= s.depart ? "" : s.depart }))} />
            </div>
            <div>
              <label htmlFor="f-depart" className="label">Départ *</label>
              <input id="f-depart" type="date" required min={v.arrivee || today} className="field" value={v.depart}
                onChange={(e) => set("depart", e.target.value)} />
            </div>
          </div>
          <div role="radiogroup" aria-label="Type d'hébergement" className="grid gap-3 sm:grid-cols-3">
            {rooms.map((r) => (
              <label
                key={r.id}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                  v.chambre === r.id ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-leaf"
                }`}
              >
                <input type="radio" name="chambre" value={r.id} checked={v.chambre === r.id}
                  onChange={() => set("chambre", r.id)} className="sr-only" />
                <span className="block font-display text-lg">{r.name.replace("Chambre ", "")}</span>
                <span className={`block text-sm font-semibold ${v.chambre === r.id ? "text-gold" : "text-mute"}`}>
                  {formatFcfa(r.price)} / nuit
                </span>
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-nb" className="label">Nombre de chambres</label>
              <input id="f-nb" type="number" min={1} max={50} required className="field" value={v.nbChambres}
                onChange={(e) => set("nbChambres", Math.max(1, Number(e.target.value) || 1))} />
            </div>
            <div>
              <label htmlFor="f-pers" className="label">Nombre de personnes</label>
              <input id="f-pers" type="number" min={1} max={200} required className="field" value={v.personnes}
                onChange={(e) => set("personnes", Math.max(1, Number(e.target.value) || 1))} />
            </div>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-sand px-5 py-4" aria-live="polite">
            <span className="text-sm text-mute">
              {nights > 0
                ? `${nights} nuit${nights > 1 ? "s" : ""} × ${v.nbChambres} ${room.name.toLowerCase()}`
                : "Choisissez vos dates pour voir l'estimation"}
            </span>
            {nights > 0 && (
              <span className="font-display text-2xl text-forest">{formatFcfa(estimate)}</span>
            )}
            <span className="w-full text-xs text-mute">
              Estimation indicative sur la base du tarif affiché ; le montant est confirmé par notre équipe.
            </span>
          </div>
        </fieldset>
      )}

      {kind === "evenement" && (
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="font-display text-2xl text-forest">Votre événement</legend>
          <div className="mt-4 sm:col-span-2">
            <label htmlFor="f-type" className="label">Type d&apos;événement *</label>
            <select id="f-type" className="field" value={v.typeEvenement} onChange={(e) => set("typeEvenement", e.target.value)}>
              {eventTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-date" className="label">Date souhaitée *</label>
            <input id="f-date" type="date" required min={today} className="field" value={v.date}
              onChange={(e) => set("date", e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-part" className="label">Participants * (jusqu&apos;à 300)</label>
            <input id="f-part" type="number" required min={1} max={300} className="field" value={v.participants}
              onChange={(e) => set("participants", Math.max(1, Number(e.target.value) || 1))} />
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 sm:col-span-2">
            <input type="checkbox" className="h-5 w-5 accent-forest" checked={v.hebergement}
              onChange={(e) => set("hebergement", e.target.checked)} />
            <span>Je souhaite aussi héberger des participants</span>
          </label>
        </fieldset>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="font-display text-2xl text-forest">Vos coordonnées</legend>
        <div className="mt-4">
          <label htmlFor="f-nom" className="label">Nom complet *</label>
          <input id="f-nom" required autoComplete="name" className="field" value={v.nom} onChange={(e) => set("nom", e.target.value)} />
        </div>
        <div className="sm:mt-4">
          <label htmlFor="f-tel" className="label">Téléphone *</label>
          <input id="f-tel" type="tel" required autoComplete="tel" inputMode="tel" className="field" value={v.telephone}
            onChange={(e) => set("telephone", e.target.value)} />
        </div>
        <div>
          <label htmlFor="f-email" className="label">E-mail</label>
          <input id="f-email" type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => set("email", e.target.value)} />
        </div>
        {kind === "evenement" && (
          <div>
            <label htmlFor="f-soc" className="label">Société / organisation</label>
            <input id="f-soc" autoComplete="organization" className="field" value={v.societe} onChange={(e) => set("societe", e.target.value)} />
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="f-msg" className="label">
            {kind === "contact" ? "Votre message *" : "Précisions (facultatif)"}
          </label>
          <textarea id="f-msg" rows={4} required={kind === "contact"} className="field" value={v.message}
            onChange={(e) => set("message", e.target.value)} />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn flex-1 bg-[#1fa855] text-white hover:bg-[#178a45]">
          <WhatsApp /> Envoyer par WhatsApp
        </button>
        <button type="button" className="btn btn-outline flex-1" onClick={() => send("email")}>
          <Mail /> Envoyer par e-mail
        </button>
      </div>
      <p className="text-sm text-mute" role="status">
        {sent === "whatsapp" && "Votre demande est prête dans WhatsApp : il ne reste qu'à appuyer sur « Envoyer »."}
        {sent === "email" && "Votre demande est prête dans votre messagerie : il ne reste qu'à l'envoyer."}
        {!sent && "Votre demande s'ouvre dans WhatsApp ou dans votre messagerie, déjà rédigée. Nous vous répondons dans les meilleurs délais."}
      </p>
    </form>
  );
}
