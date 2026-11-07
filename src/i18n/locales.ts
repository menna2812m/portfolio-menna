export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (s: string): s is Locale =>
  (locales as readonly string[]).includes(s);

export const dirOf = (l: Locale): "ltr" | "rtl" => (l === "ar" ? "rtl" : "ltr");
