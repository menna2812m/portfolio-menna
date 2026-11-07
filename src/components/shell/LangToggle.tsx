"use client";
import type { MouseEvent } from "react";
import { sectionIds } from "@/content/sections";
import type { Locale } from "@/i18n/locales";
import { currentSectionId } from "./useActiveSection";

/** The section named in the URL hash, or "". */
function hashSection(): string {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return sectionIds.includes(id) ? id : "";
}

/** True when the element is at least partly on screen. */
function inView(id: string): boolean {
  const r = document.getElementById(id)?.getBoundingClientRect();
  return !!r && r.top < window.innerHeight && r.bottom > 0;
}

type Props = { locale: Locale; label: string; text: string };

/** Switches locale and lands on the same section, whether it was reached by link (hash) or by scrolling. */
export function LangToggle({ locale, label, text }: Props) {
  const other: Locale = locale === "en" ? "ar" : "en";
  const href = `/${other}/`;
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Prefer the linked section while it is on screen (or still being scrolled to right after load),
    // otherwise whatever section the reader scrolled to.
    const linked = hashSection();
    const section = (linked && inView(linked) ? linked : "") || currentSectionId(sectionIds) || linked;
    const hash = section ? `#${section}` : "";
    window.location.assign(`${href}${hash}`);
  };
  return (
    <a
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={`${text} — ${label}`}
      onClick={onClick}
      className="rounded border border-green/60 px-2 py-0.5 font-mono text-xs text-green transition-colors hover:bg-green/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
    >
      {text}
    </a>
  );
}
