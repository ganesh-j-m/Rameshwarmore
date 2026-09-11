import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SiteChrome } from "@/components/site/SiteChrome";
import { prisma } from "@/lib/prisma";
import { profile as verifiedProfile, seoKeywords } from "@/lib/data/verified-biodata";

const displayFont = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rameshwarmore.in";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await prisma.profile.findFirst().catch(() => null);
  const name = profile?.fullName || verifiedProfile.fullName;
  const tagline = profile?.tagline || verifiedProfile.tagline;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${name} — Kirtankar, Speaker & Researcher`,
      template: `%s | ${name}`,
    },
    description: profile?.metaDescription || verifiedProfile.aboutShort,
    keywords: seoKeywords,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${name} — Kirtankar, Speaker & Researcher`,
      description: tagline,
      url: siteUrl,
      siteName: name,
      locale: "mr_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Kirtankar, Speaker & Researcher`,
      description: tagline,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: verifiedProfile.fullName,
    jobTitle: "Kirtankar, Speaker, Researcher & Social Contributor",
    email: `mailto:${verifiedProfile.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    url: siteUrl,
    knowsLanguage: ["mr", "hi", "en"],
  };

  return (
    <html lang="mr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
