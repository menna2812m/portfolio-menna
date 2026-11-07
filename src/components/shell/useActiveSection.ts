"use client";
import { useEffect, useState } from "react";

/** Id of the section currently nearest the top of the viewport ("" above the first section). */
export function currentSectionId(ids: string[]): string {
  const offset = window.innerHeight * 0.35;
  let current = "";
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
  }
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom && ids.length) current = ids[ids.length - 1];
  return current;
}

/** Tracks currentSectionId() as the page scrolls. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const pick = () => setActive(currentSectionId(ids));
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("hashchange", pick);
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("hashchange", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids]);

  return active;
}
