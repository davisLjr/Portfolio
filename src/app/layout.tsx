import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import "@/styles/globals.scss";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Davis Lapenta | Front-End Developer - React, Next.js, TypeScript",
  description: "Desarrollador front-end con más de 5 años de experiencia en React, Next.js y TypeScript. Especializado en design systems, componentes reutilizables y UI/UX accesibles.",
  keywords: [
    "Davis Lapenta",
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Design Systems",
    "UI/UX",
    "React Native",
    "Angular",
    "Desarrollador Frontend",
    "Portfolio",
  ],
  authors: [{ name: "Davis Lapenta", url: "https://linkedin.com/in/davis-laviera/" }],
  creator: "Davis Lapenta",
  publisher: "Davis Lapenta",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-davis.vercel.app",
    title: "Davis Lapenta | Front-End Developer",
    description: "Desarrollador front-end especializado en React, Next.js y TypeScript con más de 5 años de experiencia.",
    siteName: "Davis Lapenta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davis Lapenta | Front-End Developer",
    description: "Desarrollador front-end especializado en React, Next.js y TypeScript con más de 5 años de experiencia.",
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){const theme=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',theme);})();`,
          }}
        />
      </head>
      <body className={`${bebasNeue.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
