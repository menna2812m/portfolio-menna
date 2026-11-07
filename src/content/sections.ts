export const sections = [
  { id: "about", file: "about.ts" },
  { id: "experience", file: "experience.log" },
  { id: "projects", file: "projects/" },
  { id: "skills", file: "skills.json" },
  { id: "certificates", file: "certificates.md" },
  { id: "contact", file: "contact.sh" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export const sectionIds: string[] = sections.map((s) => s.id);
