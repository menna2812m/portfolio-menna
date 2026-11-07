import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4173", ...devices["Desktop Chrome"] },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173/Mennatullah_Mohamed-CV.pdf",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
