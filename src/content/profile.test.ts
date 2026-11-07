import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("uses the CV title", () => {
    expect(profile.title).toBe("Frontend Web Developer");
  });

  it("lists featured projects in order with live URLs", () => {
    const featured = profile.projects.filter((p) => p.tier === "featured");
    expect(featured.map((p) => p.id)).toEqual(["azm", "tasel", "tanafos", "bidxsell"]);
    expect(featured.map((p) => p.url)).toEqual([
      "https://azm.sa/",
      "https://tasel.sa/",
      "https://tanafos.sa/",
      "https://bidxsell.com/",
    ]);
  });

  it("keeps private projects without screenshots or URLs", () => {
    const priv = profile.projects.filter((p) => p.tier === "private");
    expect(priv.map((p) => p.id)).toEqual(["sahl", "boulevard", "mlDashboard"]);
    for (const p of priv) {
      expect(p.url).toBeUndefined();
      expect(p.screenshot).toBeUndefined();
    }
  });

  it("links the IP tracker", () => {
    expect(profile.projects.find((p) => p.id === "ipTracker")?.url).toBe(
      "https://ip-address-tracker-master-eosin.vercel.app/",
    );
  });

  it("has exact contact links", () => {
    expect(profile.contact).toEqual({
      email: "menna.tullah5112@gmail.com",
      linkedin: "https://www.linkedin.com/in/mennatullah-mohamed-29657818b/",
      whatsapp: "https://wa.me/201149533878",
      github: "https://github.com/menna2812m",
      cv: "/Mennatullah_Mohamed-CV.pdf",
    });
  });

  it("orders jobs newest first with the current job open-ended", () => {
    expect(profile.jobs.map((j) => j.id)).toEqual(["azm", "seamlabs", "atw", "atwIntern"]);
    expect(profile.jobs[0].end).toBeNull();
  });
});
