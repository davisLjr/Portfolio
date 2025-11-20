import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Davis Lapenta | Front-End Developer",
    short_name: "Davis Lapenta",
    description: "Portfolio de Davis Lapenta - Front-End Developer especializado en React, Next.js y TypeScript",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#141414",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
