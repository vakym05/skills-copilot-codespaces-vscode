import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import { photos, rooms, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.fullName} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.fullName,
    images: [{ url: photos.sunset.src, width: photos.sunset.width, height: photos.sunset.height }],
  },
  icons: { icon: "/images/logo.jpg" },
};

export const viewport: Viewport = { themeColor: "#0b221c" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: site.fullName,
  description: site.description,
  url: site.url,
  image: `${site.url}${photos.sunset.src}`,
  email: site.email,
  telephone: site.phones.map((p) => `+237${p.replace(/\s/g, "")}`),
  address: { "@type": "PostalAddress", addressLocality: "Yaoundé", streetAddress: "Ntoun, Nsimalen", addressCountry: "CM" },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  priceRange: `${rooms[0].price}–${rooms[rooms.length - 1].price} XAF`,
  amenityFeature: ["Restaurant", "Bar", "Piscine", "Centre de fitness", "Hammam", "Salles de conférence", "Wifi"].map(
    (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
