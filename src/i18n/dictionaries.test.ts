import { describe, expect, it } from "vitest";
import { en } from "./en";
import { ar } from "./ar";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[]`];
  if (obj && typeof obj === "object")
    return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

function strings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(strings);
  if (obj && typeof obj === "object") return Object.values(obj).flatMap(strings);
  return [];
}

describe("dictionaries", () => {
  it("have identical key sets", () => {
    expect(keyPaths(ar).sort()).toEqual(keyPaths(en).sort());
  });

  it("have no empty strings", () => {
    for (const s of [...strings(en), ...strings(ar)]) expect(s.trim()).not.toBe("");
  });

  it("never claim seniority", () => {
    expect(JSON.stringify(en) + JSON.stringify(ar)).not.toMatch(/senior/i);
  });

  it("use the CV title in the hero", () => {
    expect(en.hero.role).toBe("Frontend Web Developer");
    expect(ar.hero.role).toBe("Frontend Web Developer");
  });
});
