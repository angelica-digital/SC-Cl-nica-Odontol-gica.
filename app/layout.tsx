import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {
  CLINIC_ADDRESS,
  CLINIC_NAME,
  CLINIC_PHONE_E164,
  SITE_URL,
} from "@/lib/constants";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SC Clínica Odontológica | Dentista em Osasco",
    template: "%s | SC Clínica Odontológica",
  },
  description:
    "Clínica odontológica em Osasco com atendimento em clínica geral, implantes, próteses, clareamento, facetas, endodontia e outros tratamentos. Agende sua avaliação.",
  keywords: [
    "dentista em Osasco",
    "clínica odontológica em Osasco",
    "implante dentário em Osasco",
    "clareamento dental em Osasco",
    "prótese dentária em Osasco",
    "endodontia em Osasco",
  ],
  authors: [{ name: CLINIC_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: CLINIC_NAME,
    title: "SC Clínica Odontológica | Dentista em Osasco",
    description:
      "Atendimento odontológico em Osasco: clínica geral, implantes, próteses, clareamento, facetas, endodontia e mais. Agende sua avaliação pelo WhatsApp.",
    images: [
      {
        url: "/images/clinica-atendimento.jpg",
        width: 1200,
        height: 630,
        alt: "Atendimento na SC Clínica Odontológica em Osasco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SC Clínica Odontológica | Dentista em Osasco",
    description:
      "Atendimento odontológico em Osasco com acompanhamento individualizado. Agende sua avaliação.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: CLINIC_NAME,
    image: `${SITE_URL}/images/clinica-atendimento.jpg`,
    telephone: CLINIC_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CLINIC_ADDRESS.street} - ${CLINIC_ADDRESS.complement}`,
      addressLocality: CLINIC_ADDRESS.city,
      addressRegion: CLINIC_ADDRESS.state,
      postalCode: CLINIC_ADDRESS.zip,
      addressCountry: "BR",
    },
    url: SITE_URL,
  };

  return (
    <html lang="pt-BR" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
