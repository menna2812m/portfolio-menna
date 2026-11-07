import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  // BASE_URL lets you point the suite at a running dev server (e.g. BASE_URL=http://localhost:3000).
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:4173", ...devices["Desktop Chrome"] },
  webServer: process.env.BASE_URL
    ? undefined
    : {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173/Mennatullah_Mohamed-CV.pdf",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
