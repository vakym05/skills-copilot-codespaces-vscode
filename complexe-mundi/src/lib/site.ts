// Single source of truth for the content of the site.
// All facts below come from the previous complexemundi.com website.

export const site = {
  name: "Complexe Mundi",
  fullName: "Complexe Multifonctionnel Mundi",
  tagline: "Source de bien-être",
  url: "https://www.complexemundi.com",
  description:
    "Hôtel, restauration, événements, sport et bien-être sur plus de 10 hectares de nature à Ntoun, à 10 minutes de l'aéroport international de Yaoundé-Nsimalen.",
  address: "Ntoun, Yaoundé-Nsimalen, Cameroun",
  addressShort: "Yaoundé Nsimalen, au lieu-dit Ntoun",
  email: "servicecommercial@complexemundi.com",
  phones: ["678 785 400", "690 390 261", "699 040 137"],
  whatsapp: "237690397455",
  geo: { lat: 3.7485766, lng: 11.5165100 },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3981.2822943170354!2d11.516510024973933!3d3.7485766462253145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scomplexe%20mundi%20itin%C3%A9raire%20ntoun%20yaound%C3%A9!5e0!3m2!1sfr!2scm",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Complexe+Mundi+Ntoun+Yaound%C3%A9",
} as const;

export const telHref = (phone: string) => `tel:+237${phone.replace(/\s/g, "")}`;
export const telLabel = (phone: string) => `+237 ${phone}`;
export const whatsappHref = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const mailHref = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const nav = [
  { href: "/chambres", label: "Chambres" },
  { href: "/restauration", label: "Restauration" },
  { href: "/evenements", label: "Événements" },
  { href: "/bien-etre", label: "Bien-être" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export type Photo = { src: string; alt: string; width: number; height: number };

const photo = (name: string, alt: string, width: number, height: number): Photo => ({
  src: `/images/${name}.jpg`,
  alt,
  width,
  height,
});

export const photos = {
  sunset: photo("facade-coucher-soleil", "Façade du Complexe Mundi au coucher du soleil", 1351, 618),
  hotelAerial: photo("hotel-vue-aerienne", "Vue aérienne de l'hôtel et de ses jardins", 1351, 618),
  poolAerial: photo("piscine-vue-aerienne", "Vue aérienne de la piscine et du parc", 1351, 618),
  stadium: photo("stade", "Le stade et sa piste d'athlétisme", 1351, 618),
  domain: photo("domaine-vue-aerienne", "Le complexe au milieu de la forêt", 676, 580),
  reception: photo("reception", "La réception de l'hôtel", 490, 502),
  conference: photo("conference", "Conférence dans l'auditorium", 1920, 1280),
  poolEvent: photo("piscine-evenement", "Réception en plein air autour de la piscine", 1920, 1280),
  standard: photo("chambre-standard", "Chambre Standard", 1920, 1440),
  luxe: photo("chambre-luxe", "Chambre Luxe", 476, 470),
  suiteBed: photo("suite-chambre", "Chambre de la Suite", 1920, 1440),
  suiteLounge: photo("suite-salon", "Salon de la Suite", 1920, 1440),
  suiteLounge2: photo("suite-salon-2", "Salon de la Suite, côté miroir", 1920, 1440),
  suiteBath: photo("suite-salle-de-bain", "Salle de bain de la Suite", 1920, 1440),
  lustre1: photo("lustre-1", "Salon du restaurant Le Lustre", 1920, 1440),
  lustre2: photo("lustre-2", "Banquettes du restaurant Le Lustre", 1920, 1440),
  lustre3: photo("lustre-3", "Comptoir du restaurant Le Lustre", 1920, 1440),
  lustre4: photo("lustre-4", "Espace lounge du restaurant Le Lustre", 1920, 1440),
  bar: photo("kongossa-bar", "Le bar Le Kongossa", 1920, 1440),
  banquet: photo("banquet", "Salle dressée pour un banquet", 750, 901),
  fitness: photo("fitness", "Le centre de fitness", 768, 1020),
  massage: photo("massage", "Séance de massage", 600, 400),
} as const;

export type Room = {
  id: "standard" | "luxe" | "suite";
  name: string;
  price: number;
  pitch: string;
  photo: Photo;
  gallery: Photo[];
  bathroom: string[];
  comforts: string[];
};

const sharedExtras = ["Fer et planche à repasser", "Bouilloire électrique"];

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Chambre Standard",
    price: 75000,
    pitch: "Des chambres qui répondent parfaitement aux attentes de nos visiteurs.",
    photo: photos.standard,
    gallery: [photos.standard],
    bathroom: ["Sèche-cheveux", "Miroir cosmétique", ...sharedExtras],
    comforts: ["Air conditionné", "Wifi", "Télévision", "Coffre-fort", "Douche", "Téléphone", "Serviettes"],
  },
  {
    id: "luxe",
    name: "Chambre Luxe",
    price: 90000,
    pitch: "Plus d'espace et de confort, avec bureau, canapé et mini-bar.",
    photo: photos.luxe,
    gallery: [photos.luxe],
    bathroom: ["Sèche-cheveux", "Miroir cosmétique", ...sharedExtras],
    comforts: [
      "Air conditionné", "Wifi", "Télévision", "Coffre-fort", "Douche", "Téléphone", "Serviettes",
      "Veilleuse", "Mini-bar", "Bureau", "Canapé",
    ],
  },
  {
    id: "suite",
    name: "Suite",
    price: 120000,
    pitch: "Des espaces ouverts sur la nature, avec salon, jacuzzi et coin cuisine / bar.",
    photo: photos.suiteBed,
    gallery: [photos.suiteBed, photos.suiteLounge, photos.suiteLounge2, photos.suiteBath],
    bathroom: ["Jacuzzi", "Sèche-cheveux", "Miroir cosmétique", ...sharedExtras],
    comforts: [
      "Air conditionné", "Wifi", "Télévision", "Coffre-fort", "Douche", "Téléphone", "Serviettes",
      "Veilleuse", "Mini-bar", "Bureau", "Canapé", "Baignoire", "Espace cuisine / bar",
    ],
  },
];

/** Every amenity, in display order, for the comparison table. */
export const amenityOrder = [
  "Air conditionné", "Wifi", "Télévision", "Coffre-fort", "Douche", "Téléphone", "Serviettes",
  "Sèche-cheveux", "Miroir cosmétique", "Fer et planche à repasser", "Bouilloire électrique",
  "Veilleuse", "Mini-bar", "Bureau", "Canapé", "Baignoire", "Jacuzzi", "Espace cuisine / bar",
];

export const formatFcfa = (n: number) =>
  `${new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ")} FCFA`;

// ---------------------------------------------------------------------------
// Opening hours. Days: 0 = Sunday … 6 = Saturday. Times in minutes from 00:00.
// ---------------------------------------------------------------------------
export type Slot = { days: number[]; open: number; close: number };
export type Service = {
  id: string;
  name: string;
  place: string;
  href: string;
  slots: Slot[];
  lines: { label: string; hours: string }[];
};

const t = (h: number, m = 0) => h * 60 + m;
const everyDay = [0, 1, 2, 3, 4, 5, 6];

export const services: Service[] = [
  {
    id: "fitness",
    name: "Centre de fitness",
    place: "Bien-être",
    href: "/bien-etre",
    slots: [{ days: everyDay, open: t(6), close: t(22) }],
    lines: [{ label: "Tous les jours", hours: "06h00 – 22h00" }],
  },
  {
    id: "petit-dejeuner",
    name: "Petit-déjeuner",
    place: "Le Lustre",
    href: "/restauration",
    slots: [
      { days: [1, 2, 3, 4, 5], open: t(6), close: t(10, 30) },
      { days: [0, 6], open: t(6), close: t(11) },
    ],
    lines: [
      { label: "Lundi – vendredi", hours: "06h00 – 10h30" },
      { label: "Samedi – dimanche", hours: "06h00 – 11h00" },
    ],
  },
  {
    id: "dejeuner",
    name: "Déjeuner",
    place: "Le Lustre",
    href: "/restauration",
    slots: [{ days: [1, 2, 3, 4, 5, 6], open: t(12), close: t(16) }],
    lines: [{ label: "Lundi – samedi", hours: "12h00 – 16h00" }],
  },
  {
    id: "brunch",
    name: "Brunch",
    place: "Le Lustre",
    href: "/restauration",
    slots: [{ days: [0], open: t(12), close: t(16, 30) }],
    lines: [{ label: "Tous les dimanches", hours: "12h00 – 16h30" }],
  },
  {
    id: "diner",
    name: "Dîner",
    place: "Le Lustre",
    href: "/restauration",
    slots: [{ days: everyDay, open: t(18), close: t(22, 45) }],
    lines: [{ label: "Tous les jours", hours: "18h00 – 22h45" }],
  },
  {
    id: "bar",
    name: "Bar & tapas",
    place: "Le Kongossa",
    href: "/restauration",
    slots: [{ days: everyDay, open: 0, close: t(24) }],
    lines: [{ label: "7j/7", hours: "24h/24" }],
  },
];

/** Current weekday and minutes in Cameroon (UTC+1, no daylight saving). */
export function nowInCameroon(date = new Date()) {
  const local = new Date(date.getTime() + 60 * 60 * 1000);
  return { day: local.getUTCDay(), minutes: local.getUTCHours() * 60 + local.getUTCMinutes() };
}

export function isOpen(service: Service, now = nowInCameroon()) {
  return service.slots.some(
    (s) => s.days.includes(now.day) && now.minutes >= s.open && now.minutes < s.close,
  );
}

export function todaySlot(service: Service, now = nowInCameroon()) {
  return service.slots.find((s) => s.days.includes(now.day));
}

export const formatMinutes = (m: number) =>
  `${String(Math.floor(m / 60) % 24).padStart(2, "0")}h${String(m % 60).padStart(2, "0")}`;
