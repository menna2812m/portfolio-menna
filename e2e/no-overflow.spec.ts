import { test, expect } from "@playwright/test";

for (const locale of ["en", "ar"]) {
  test(`/${locale}/ has no horizontal overflow at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`/${locale}/`);
    await page.waitForLoadState("networkidle");
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(360);
  });
}
