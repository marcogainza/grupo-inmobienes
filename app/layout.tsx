import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Grupo Inmobienes — Compra Programada de Vivienda en Ecuador";
const DESCRIPTION =
  "Adquiere casa, departamento, terreno o local comercial mediante compra programada: sin crédito hipotecario, sin garante y sin buró. Sorteo o licitación mensual en Quito y Guayaquil.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Grupo Inmobienes",
  },
  description: DESCRIPTION,
  keywords: [
    "compra programada de vivienda",
    "compra programada inmuebles Ecuador",
    "vivienda sin crédito hipotecario",
    "sorteo y licitación de inmuebles",
    "Grupo Inmobienes",
    "vivienda propia Quito",
    "vivienda propia Guayaquil",
  ],
  authors: [{ name: "Grupo Inmobienes" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: "Grupo Inmobienes",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/local-0.jpg", width: 1200, height: 630, alt: "Grupo Inmobienes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/local-0.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Grupo Inmobienes",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-inmo-azul.png`,
  image: `${SITE_URL}/local-0.jpg`,
  description: DESCRIPTION,
  areaServed: ["Quito", "Guayaquil", "Ecuador"],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Quito",
      addressCountry: "EC",
      streetAddress: "Av. Los Shyris e Isla Floreana",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Guayaquil",
      addressCountry: "EC",
      streetAddress: "Alborada, etapa II, villa 12, Mz. 21",
    },
  ],
  telephone: "+593991052697",
  email: "info@grupoinmobienes.com.ec",
  sameAs: [
    "https://instagram.com/inmo_bienes_ec",
    "https://tiktok.com/@inmobienesec",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
