import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/LanguageContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fersion Tech | Software, Tours Virtuales 360 y Marketing para Inmobiliarias",
  description:
    "Desarrollo de software, tours virtuales 360, automatizaciones CRM, fotografía profesional y marketing digital para inmobiliarias y agentes inmobiliarios. Una sola agencia, para todo.",
  keywords: [
    "software inmobiliario",
    "tours virtuales 360",
    "fotografía inmobiliaria",
    "marketing inmobiliario",
    "automatización CRM",
    "desarrollo web inmobiliario",
    "agencia digital inmobiliaria",
  ],
  authors: [{ name: "Fersion Tech" }],
  creator: "Fersion Tech",
  publisher: "Fersion Tech",
  metadataBase: new URL("https://www.fersiontech.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.fersiontech.com",
    siteName: "Fersion Tech",
    title: "Fersion Tech | Software, Tours Virtuales 360 y Marketing para Inmobiliarias",
    description:
      "Desarrollo de software, tours virtuales 360, automatizaciones CRM, fotografía profesional y marketing digital para inmobiliarias y agentes inmobiliarios.",
    images: [
      {
        url: "/images/hero_1.jpg",
        width: 1200,
        height: 630,
        alt: "Fersion Tech - Servicios digitales para inmobiliarias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fersion Tech | Software, Tours Virtuales 360 y Marketing para Inmobiliarias",
    description:
      "Desarrollo de software, tours virtuales 360, automatizaciones CRM, fotografía profesional y marketing digital para inmobiliarias.",
    images: ["/images/hero_1.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Fersion Tech",
    description:
      "Desarrollo de software, tours virtuales 360, automatizaciones CRM, fotografía profesional y marketing digital para inmobiliarias y agentes inmobiliarios.",
    url: "https://www.fersiontech.com",
    logo: "https://www.fersiontech.com/images/logo.png",
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    serviceType: [
      "Desarrollo de software inmobiliario",
      "Tours virtuales 360",
      "Fotografía inmobiliaria",
      "Marketing digital inmobiliario",
      "Automatización CRM",
    ],
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-9-115956-8286",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [],
  };

  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
