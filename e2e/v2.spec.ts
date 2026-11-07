import { test, expect } from "@playwright/test";

test.describe("v2 3D hero", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("renders an interactive WebGL globe in the hero as soon as the visitor moves", async ({ page }) => {
    await page.goto("/en/");
    await page.mouse.move(700, 400);
    const canvas = page.locator("#top canvas[data-globe]");
    await expect(canvas).toBeVisible({ timeout: 10_000 });
    expect(await canvas.getAttribute("aria-hidden")).toBe("true");
    const box = await canvas.boundingBox();
    expect(box!.width).toBeGreaterThan(300);
  });

  test("reduced motion gets a static globe instead of WebGL", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/");
    await expect(page.locator("#top [data-globe-fallback]")).toBeVisible();
    await page.mouse.move(700, 400);
    await page.waitForTimeout(6500);
    await expect(page.locator("#top canvas[data-globe]")).toHaveCount(0);
  });

  test("Arabic hero gets the globe even without any interaction (idle fallback)", async ({ page }) => {
    await page.goto("/ar/");
    await expect(page.locator("#top canvas[data-globe]")).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("v2 scroll animations", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("scroll progress bar fills as the page scrolls", async ({ page }) => {
    await page.goto("/en/");
    const bar = page.locator("[data-scroll-progress]");
    await expect(bar).toHaveCount(1);
    const scaleAt = () => bar.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
    const start = await scaleAt();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(scaleAt, { timeout: 5000 }).toBeGreaterThan(0.95);
    expect(start).toBeLessThan(0.1);
  });

  test("every section heading ends up fully visible after scrolling to it", async ({ page }) => {
    await page.goto("/en/");
    for (const id of ["about", "experience", "projects", "skills", "certificates", "contact"]) {
      const h = page.locator(`#${id}-title`);
      await h.scrollIntoViewIfNeeded();
      await expect.poll(() => h.evaluate((el) => {
        let o = 1;
        for (let n: Element | null = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
        return o;
      }), { timeout: 4000 }).toBeGreaterThan(0.99);
    }
  });

  test("with reduced motion, all headings are visible without waiting", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/");
    const opacities = await page.locator("h2").evaluateAll((els) =>
      els.map((el) => {
        let o = 1;
        for (let n: Element | null = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
        return o;
      }),
    );
    expect(opacities.length).toBe(6);
    for (const o of opacities) expect(o).toBe(1);
  });

  test("tech marquee is present but never causes horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/ar/");
    await expect(page.locator("[data-marquee]")).toHaveCount(1);
    await page.waitForTimeout(800);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
});
