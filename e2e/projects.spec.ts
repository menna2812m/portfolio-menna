import { test, expect } from "@playwright/test";

const featured = [
  { name: "AZM Website", url: "https://azm.sa/" },
  { name: "Tasel", url: "https://tasel.sa/" },
  { name: "Tanafos", url: "https://tanafos.sa/" },
  { name: "BidxSell", url: "https://bidxsell.com/" },
];

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en/#projects");
});

test("featured projects appear in order with screenshots and live links", async ({ page }) => {
  const cards = page.locator('#projects [data-tier="featured"] > li');
  await expect(cards).toHaveCount(4);
  for (const [i, p] of featured.entries()) {
    const card = cards.nth(i);
    await expect(card.getByRole("heading", { level: 3 })).toHaveText(p.name);
    const img = card.locator("img");
    await expect(img).toHaveCount(1);
    expect((await img.getAttribute("alt"))?.length).toBeGreaterThan(0);
    const live = card.getByRole("link", { name: /Live/ });
    await expect(live).toHaveAttribute("href", p.url);
    await expect(live).toHaveAttribute("target", "_blank");
    await expect(live).toHaveAttribute("rel", /noopener/);
  }
});

test("private projects carry the badge and no screenshot", async ({ page }) => {
  const cards = page.locator('#projects [data-tier="private"] > li');
  await expect(cards).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    await expect(cards.nth(i)).toContainText("private · NDA");
    await expect(cards.nth(i).locator("img")).toHaveCount(0);
  }
  await expect(cards.nth(0)).toContainText("STC");
  await expect(cards.nth(1)).toContainText("STC");
});

test("minor projects include the IP tracker link", async ({ page }) => {
  const minor = page.locator('#projects [data-tier="minor"]');
  await expect(minor.locator('a[href="https://ip-address-tracker-master-eosin.vercel.app/"]')).toHaveCount(1);
  await expect(minor).toContainText("Supply Chain");
  await expect(minor).toContainText("Learning Management System");
});

test("site never claims seniority", async ({ page }) => {
  await expect(page.locator("body")).not.toContainText(/senior/i);
});

test("Arabic projects render with the Arabic badge", async ({ page }) => {
  await page.goto("/ar/#projects");
  await expect(page.locator('#projects [data-tier="private"] > li').first()).toContainText("خاص · سرّي");
});

test("featured screenshots actually load when scrolled into view", async ({ page }) => {
  const imgs = page.locator('#projects [data-tier="featured"] img');
  for (let i = 0; i < 4; i++) {
    const img = imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
  }
});
