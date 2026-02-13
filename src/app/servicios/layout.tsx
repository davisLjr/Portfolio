import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-three-taupe-12.vercel.app";
const PAGE_URL = `${SITE_URL}/servicios`;

export const metadata: Metadata = {
  title: "Páginas web profesionales desde $160 | Davis Lapenta",
  description:
    "Creamos tu sitio web o landing page profesional con diseño a tu medida, dominio gratis por 1 año, SEO completo y hasta 6 meses de ajustes incluidos. Sin tecnicismos, sin complicaciones. Contáctame hoy.",
  keywords: [
    "crear página web profesional",
    "diseño web para negocios",
    "landing page barata",
    "página web desde 160 dólares",
    "diseño web España",
    "diseño web México",
    "diseño web Venezuela",
    "página web para negocios en México",
    "página web para negocios en Venezuela",
    "diseño web para emprendedores latinoamérica",
    "crear sitio web con dominio gratis",
    "página web con SEO incluido",
    "diseño web para emprendedores",
    "web para pequeños negocios",
    "landing page con WhatsApp",
    "página web con catálogo de productos",
    "funnel de ventas",
    "diseño web con Stripe",
    "página web con seguimiento",
    "Davis Lapenta diseñador web",
    "web profesional económica",
    "diseño web sin tecnicismos",
    "crear página web rápido",
  ],
  authors: [
    {
      name: "Davis Lapenta",
      url: SITE_URL,
    },
  ],
  creator: "Davis Lapenta",
  publisher: "Davis Lapenta",
  category: "Diseño y Desarrollo Web",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: PAGE_URL,
    siteName: "Davis Lapenta - Diseño Web Profesional",
    title: "Páginas web profesionales desde $160 | Davis Lapenta",
    description:
      "Sitio web o landing page a tu medida con dominio gratis, SEO completo y meses de seguimiento incluidos. Sin tecnicismos. Hablamos, definimos y lo hacemos realidad.",
    images: [
      {
        url: `${SITE_URL}/logoDark.webp`,
        width: 553,
        height: 55,
        alt: "Davis Lapenta - Diseño Web Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas web profesionales desde $160 | Davis Lapenta",
    description:
      "Sitio web o landing page a tu medida con dominio, SEO y seguimiento incluidos. Sin tecnicismos.",
    images: [`${SITE_URL}/logoDark.webp`],
    creator: "@davislapenta",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Diseño y Desarrollo Web Profesional",
            description:
              "Creación de sitios web y landing pages profesionales con diseño personalizado, SEO completo, dominio gratis por 1 año y seguimiento incluido.",
            url: PAGE_URL,
            provider: {
              "@type": "Person",
              name: "Davis Lapenta",
              jobTitle: "Desarrollador Web Frontend",
              url: SITE_URL,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+34-662-402-792",
                contactType: "customer support",
                availableLanguage: "Spanish",
                contactOption: "TollFree",
              },
            },
            offers: [
              {
                "@type": "Offer",
                name: "Plan Esencial",
                description:
                  "Hasta 3 secciones, formulario de contacto, botón de WhatsApp, SEO básico y 3 meses de ajustes.",
                price: "160",
                priceCurrency: "USD",
                url: PAGE_URL,
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                name: "Plan Profesional",
                description:
                  "Hasta 6 secciones estratégicas, diseño 100% personalizado, SEO completo, dominio gratis 1 año, catálogo, testimonios y 6 meses de ajustes.",
                price: "200",
                priceCurrency: "USD",
                url: PAGE_URL,
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                name: "Plan Completo",
                description:
                  "Todo el Plan Profesional más hasta 2 funnels estratégicos, diseño enfocado en conversión, conexión a Stripe y 12 meses de soporte prioritario.",
                price: "280",
                priceCurrency: "USD",
                url: PAGE_URL,
                availability: "https://schema.org/InStock",
              },
            ],
            areaServed: [
              { "@type": "Country", "name": "España" },
              { "@type": "Country", "name": "México" },
              { "@type": "Country", "name": "Venezuela" },
              { "@type": "Place", "name": "Latinoamérica" },
            ],
            serviceType: [
              "Diseño Web",
              "Desarrollo Frontend",
              "Landing Page",
              "Funnel de Ventas",
              "SEO",
              "E-commerce",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
