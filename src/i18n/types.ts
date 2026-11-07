import type { CertificateId, JobId, ProjectId, SkillGroupId } from "@/content/profile";

export type SectionCopy = { title: string; summary: string };

export type Dictionary = {
  meta: { title: string; description: string };
  chrome: {
    windowTitle: string;
    explorer: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    otherLanguageLabel: string;
  };
  cta: { contact: string; downloadCv: string; viewProjects: string; hireMe: string };
  hero: {
    comment: string;
    role: string;
    availability: string;
    tagline: string;
    location: string;
  };
  sections: {
    about: SectionCopy;
    experience: SectionCopy;
    projects: SectionCopy;
    skills: SectionCopy;
    certificates: SectionCopy;
    contact: SectionCopy;
  };
  about: { paragraphs: string[]; educationLabel: string; education: string; softSkillsLabel: string; softSkills: string[] };
  jobs: Record<JobId, { role: string; summary: string[] }>;
  present: string;
  projects: Record<ProjectId, { name: string; tagline: string; description: string; features: string[] }>;
  projectLabels: {
    featured: string;
    private: string;
    minor: string;
    privateBadge: string;
    liveLabel: string;
    builtWith: string;
    screenshotAlt: string;
  };
  skillGroups: Record<SkillGroupId, string>;
  certificates: Record<CertificateId, string>;
  certificateView: string;
  contact: { intro: string; email: string; linkedin: string; whatsapp: string; github: string; cv: string };
  footer: string;
};
