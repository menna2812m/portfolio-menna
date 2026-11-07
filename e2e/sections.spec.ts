import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { en } from "../src/i18n/en";
import { ar } from "../src/i18n/ar";

const html = (locale: string) => readFileSync(`out/${locale}/index.html`, "utf8");

test("exported English HTML contains the hero and every heading", () => {
  const page = html("en");
  expect(page).toContain("Mennatullah Mohamed");
  expect(page).toContain("Frontend Web Developer");
  for (const s of Object.values(en.sections)) expect(page).toContain(s.title);
});

test("exported Arabic HTML contains every Arabic heading", () => {
  const page = html("ar");
  for (const s of Object.values(ar.sections)) expect(page).toContain(s.title);
});

test("hero name is visible immediately with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  const name = page.getByRole("heading", { level: 1 });
  await expect(name).toHaveText(/Mennatullah Mohamed/);
  expect(await name.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
});

test("Arabic page keeps the email left-to-right", async ({ page }) => {
  await page.goto("/ar/#contact");
  const email = page.locator('#contact a[href="mailto:menna.tullah5112@gmail.com"]');
  await expect(email).toHaveAttribute("dir", "ltr");
  await expect(email.locator("bdi, span[dir=ltr]").first().or(email)).toContainText("menna.tullah5112@gmail.com");
});

test("contact links are exact", async ({ page }) => {
  await page.goto("/en/");
  const c = page.locator("#contact");
  await expect(c.locator('a[href="https://wa.me/201149533878"]')).toHaveCount(1);
  await expect(c.locator('a[href="https://www.linkedin.com/in/mennatullah-mohamed-29657818b/"]')).toHaveCount(1);
  await expect(c.locator('a[href="/Mennatullah_Mohamed-CV.pdf"][download]')).toHaveCount(1);
});

test("experience lists four roles, newest first", async ({ page }) => {
  await page.goto("/en/");
  const items = page.locator("#experience ol > li");
  await expect(items).toHaveCount(4);
  await expect(items.first()).toContainText("Azm Squad");
});

test("hero offers contact, CV and projects actions", async ({ page }) => {
  await page.goto("/en/");
  const hero = page.locator("#top");
  await expect(hero.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "#contact");
  await expect(hero.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "#projects");
  await expect(hero.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/Mennatullah_Mohamed-CV.pdf");
});

test("skills render every group", async ({ page }) => {
  await page.goto("/en/");
  for (const g of Object.values(en.skillGroups)) await expect(page.locator("#skills")).toContainText(`"${g}"`);
});
