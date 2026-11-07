import { test, expect } from "@playwright/test";

const files = ["about.ts", "experience.log", "projects/", "skills.json", "certificates.md", "contact.sh"];

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("file tree lists every section file", async ({ page }) => {
    await page.goto("/en/");
    const nav = page.getByRole("navigation", { name: "Explorer" });
    for (const f of files) await expect(nav.getByRole("link", { name: f })).toBeVisible();
  });

  test("clicking a file scrolls to its section and marks it current", async ({ page }) => {
    await page.goto("/en/");
    const link = page.getByRole("navigation", { name: "Explorer" }).getByRole("link", { name: "projects/" });
    await link.click();
    await expect(page.locator("#projects")).toBeInViewport();
    await expect(link).toHaveAttribute("aria-current", "true");
  });

  test("language toggle keeps the current section", async ({ page }) => {
    await page.goto("/en/#projects");
    await page.getByRole("link", { name: "Switch language to Arabic" }).click();
    await expect(page).toHaveURL(/\/ar\/#projects$/);
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("keyboard focus on file links is visible", async ({ page }) => {
    await page.goto("/en/");
    const link = page.getByRole("navigation", { name: "Explorer" }).getByRole("link", { name: "about.ts" });
    await link.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
    const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
  });

  test("download CV stays reachable at the bottom of the page", async ({ page }) => {
    await page.goto("/en/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const cv = page.getByRole("contentinfo").getByRole("link", { name: "Download CV" });
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute("href", "/Mennatullah_Mohamed-CV.pdf");
    await expect(cv).toHaveAttribute("download", /.*/);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 360, height: 740 }, hasTouch: true });

  test("drawer opens, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.getByRole("navigation", { name: "Explorer" })).toBeHidden();
    const burger = page.getByRole("button", { name: "Open navigation" });
    await expect(burger).toHaveAttribute("aria-expanded", "false");
    await burger.click();
    await expect(burger).toHaveAttribute("aria-expanded", "true");
    const drawer = page.getByRole("dialog");
    await expect(drawer.getByRole("link", { name: "skills.json" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(burger).toBeFocused();
  });

  test("choosing a file in the drawer closes it and scrolls", async ({ page }) => {
    await page.goto("/en/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "contact.sh" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.locator("#contact")).toBeInViewport();
  });
});
