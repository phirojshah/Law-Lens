import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/env";
import { firm } from "@/lib/site-content";

const title = "Law Lens Nepal | Law Firm in Maitighar, Kathmandu";
const description =
  "Law Lens Nepal is a professional law firm in Maitighar, Kathmandu providing legal consultation, documentation, dispute resolution, corporate law, property law, and client-focused legal support in Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: "%s | Law Lens Nepal",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Law Lens Nepal",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/assets/images/hero-law-lens-nepal.webp",
        width: 1600,
        height: 756,
        alt: "Law Lens Nepal legal consultation setting",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/images/law-lens-nepal-logo.svg",
    apple: "/assets/images/law-lens-nepal-logo.svg",
  },
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Law Lens Nepal",
  description:
    "Professional legal consultation, documentation support, dispute resolution, corporate legal services, property matters, and client-focused legal support in Nepal.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Maitighar",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  areaServed: "Nepal",
  telephone: firm.phone,
  email: firm.email,
  founder: {
    "@type": "Person",
    name: firm.leadAdvocate,
    jobTitle: "Advocate",
    email: firm.advocateEmail,
  },
  logo: `${getSiteUrl()}/assets/images/law-lens-nepal-logo.svg`,
  openingHours: "Su-Fr 10:00-17:00",
  url: getSiteUrl(),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
      </body>
    </html>
  );
}
