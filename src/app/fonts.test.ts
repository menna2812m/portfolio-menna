import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const layout = readFileSync(path.join(__dirname, "[locale]", "layout.tsx"), "utf8");

describe("fonts", () => {
  it("are bundled with the site, so dev/build never depend on reaching Google Fonts", () => {
    expect(layout).not.toContain("next/font/google");
    expect(layout).toContain("next/font/local");
  });

  it("ship every weight the design uses", () => {
    const files = [
      "ibm-plex-sans-latin-400-normal.woff2",
      "ibm-plex-sans-latin-500-normal.woff2",
      "ibm-plex-sans-latin-600-normal.woff2",
      "ibm-plex-sans-latin-700-normal.woff2",
      "ibm-plex-mono-latin-400-normal.woff2",
      "ibm-plex-mono-latin-500-normal.woff2",
      "ibm-plex-mono-latin-600-normal.woff2",
      "ibm-plex-sans-arabic-arabic-400-normal.woff2",
      "ibm-plex-sans-arabic-arabic-500-normal.woff2",
      "ibm-plex-sans-arabic-arabic-600-normal.woff2",
      "ibm-plex-sans-arabic-arabic-700-normal.woff2",
    ];
    for (const f of files) expect(existsSync(path.join(__dirname, "..", "fonts", f)), f).toBe(true);
  });
});
