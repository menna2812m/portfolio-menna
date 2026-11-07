import { ar } from "./ar";
import { en } from "./en";
import type { Locale } from "./locales";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
