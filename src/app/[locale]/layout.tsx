import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/content/profile";
import { getDictionary } from "@/i18n/get-dictionary";
import { dirOf, isLocale, locales } from "@/i18n/locales";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: profile.name }],
    alternates: {
      canonical: `/${locale}/`,
      languages: { en: "/en/", ar: "/ar/", "x-default": "/en/" },
    },
    openGraph: {
      type: "profile",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      siteName: profile.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description, images: ["/og.png"] },
  };
}

export const viewport: Viewport = { themeColor: "#0b0f14", colorScheme: "dark" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dirOf(locale)} className={`${sans.variable} ${mono.variable} ${arabic.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd locale={locale} />
        {children}
      </body>
    </html>
  );
}
