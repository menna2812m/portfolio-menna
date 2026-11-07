"use client";
import { useEffect, useRef, type MouseEvent } from "react";
import { sectionIds } from "@/content/sections";
import type { Locale } from "@/i18n/locales";
import { currentSectionId } from "./useActiveSection";

type Props = { locale: Locale; label: string; text: string };

/** The section named in the URL hash, or "". */
function hashSection(): string {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return sectionIds.includes(id) ? id : "";
}

/**
 * Switches locale and lands on the same section.
 * While a link-triggered scroll is still travelling (from a #section link or a page load with a hash
 * until scrolling settles) the linked section wins; afterwards, whatever section the reader is on.
 */
export function LangToggle({ locale, label, text }: Props) {
  const other: Locale = locale === "en" ? "ar" : "en";
  const href = `/${other}/`;
  const travelling = useRef(false);

  useEffect(() => {
    travelling.current = !!hashSection();
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        travelling.current = false;
      }, 180);
    };
    const onHash = () => {
      travelling.current = !!hashSection();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const linked = hashSection();
    const section = (travelling.current && linked) || currentSectionId(sectionIds) || linked;
    window.location.assign(`${href}${section ? `#${section}` : ""}`);
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
