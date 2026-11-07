import { test, expect } from "@playwright/test";

test("root redirects to /en/", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/$/);
});

test("/en/ is English LTR", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("/ar/ is Arabic RTL", async ({ page }) => {
  await page.goto("/ar/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("/ar without trailing slash resolves", async ({ page }) => {
  const res = await page.goto("/ar");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("CV PDF is served", async ({ request }) => {
  const res = await request.get("/Mennatullah_Mohamed-CV.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("pdf");
});
