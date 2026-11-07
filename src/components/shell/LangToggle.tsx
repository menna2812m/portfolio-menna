"use client";
import type { MouseEvent } from "react";
import type { Locale } from "@/i18n/locales";

type Props = { locale: Locale; label: string; text: string };

export function LangToggle({ locale, label, text }: Props) {
  const other: Locale = locale === "en" ? "ar" : "en";
  const href = `/${other}/`;
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.assign(`${href}${window.location.hash}`);
  };
  return (
    <a
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={label}
      onClick={onClick}
      className="rounded border border-green/60 px-2 py-0.5 font-mono text-xs text-green transition-colors hover:bg-green/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
    >
      {text}
    </a>
  );
}
