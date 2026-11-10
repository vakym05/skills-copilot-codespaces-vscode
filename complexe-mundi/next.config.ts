import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep the URLs of the previous site working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/page1.html", destination: "/chambres", permanent: true },
      { source: "/page2.html", destination: "/bien-etre", permanent: true },
      { source: "/page3.html", destination: "/restauration", permanent: true },
      { source: "/page4.html", destination: "/evenements", permanent: true },
      { source: "/page5.html", destination: "/a-propos", permanent: true },
      { source: "/page6.html", destination: "/contact", permanent: true },
      { source: "/page7.html", destination: "/reservation", permanent: true },
    ];
  },
};

export default nextConfig;
