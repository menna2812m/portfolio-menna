import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { dirOf, isLocale, locales } from "@/i18n/locales";
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
