/**
 * Captures a homepage screenshot of every project with a live URL into
 * public/projects/<id>.webp (1200px wide, WebP q80). Run: npm run screenshots
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { profile } from "../src/content/profile";

async function main() {
  const browser = await chromium.launch();
  const targets = profile.projects.filter((p) => p.url && p.screenshot);
  for (const p of targets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
      await page.goto(p.url!, { waitUntil: "networkidle", timeout: 30_000 }).catch(() => page.waitForLoadState("load"));
      // Dismiss cookie banners so they do not cover the hero.
      const accept = page.getByRole("button", { name: /قبول الكل|accept all|^accept$/i }).first();
      if (await accept.isVisible().catch(() => false)) await accept.click().catch(() => {});
      await page.waitForTimeout(3000);
      const png = await page.screenshot({ type: "png" });
      await sharp(png).resize({ width: 1200 }).webp({ quality: 80 }).toFile(`public${p.screenshot}`);
      console.log(`ok   ${p.id} -> public${p.screenshot}`);
    } catch (e) {
      console.error(`fail ${p.id}: ${(e as Error).message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
}

main();
