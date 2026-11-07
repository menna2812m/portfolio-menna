import { test, expect } from "@playwright/test";

// Browser extensions (e.g. ColorZilla adds cz-shortcut-listen) write attributes onto <body>
// before React hydrates. That must not produce a hydration error. React only reports this in
// development, so run it against a dev server: BASE_URL=http://localhost:3000 npx playwright test hydration
for (const locale of ["en", "ar"]) {
  test(`/${locale}/ hydrates cleanly when an extension touches <body>`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    // Same moment ColorZilla writes it: when parsing finishes, before React hydrates.
    await page.addInitScript(() => {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") document.body.setAttribute("cz-shortcut-listen", "true");
      });
    });
    await page.goto(`/${locale}/`);
    await page.waitForLoadState("networkidle");
    expect(errors.filter((e) => /hydrat/i.test(e))).toEqual([]);
  });
}
