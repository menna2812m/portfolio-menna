export type ProjectId =
  | "azm"
  | "tasel"
  | "tanafos"
  | "bidxsell"
  | "sahl"
  | "boulevard"
  | "mlDashboard"
  | "supplyChain"
  | "lms"
  | "ipTracker";

export type Project = {
  id: ProjectId;
  tier: "featured" | "private" | "minor";
  url?: string;
  /** Public path, e.g. /projects/azm.webp */
  screenshot?: string;
  stack: string[];
};

export type JobId = "azm" | "seamlabs" | "atw" | "atwIntern";

export type Job = {
  id: JobId;
  company: string;
  /** YYYY-MM */
  start: string;
  end: string | null;
  location: string;
  stack: string[];
};

export type SkillGroupId =
  | "frameworks"
  | "languages"
  | "styling"
  | "stateData"
  | "quality"
  | "tooling"
  | "also";

export type CertificateId = "egfwd" | "udacityFullStack" | "udemyJs" | "maharaEs6" | "atwInternship";

export type Certificate = { id: CertificateId; issuer: string; url?: string };

export const profile = {
  name: "Mennatullah Mohamed",
  title: "Frontend Web Developer" as const,
  years: 4 as const,
  location: "Giza, Egypt",
  contact: {
    email: "menna.tullah5112@gmail.com",
    linkedin: "https://www.linkedin.com/in/mennatullah-mohamed-29657818b/",
    whatsapp: "https://wa.me/201149533878",
    github: "https://github.com/menna2812m",
    cv: "/Mennatullah_Mohamed-CV.pdf",
  },
  jobs: [
    {
      id: "azm",
      company: "Azm Squad",
      start: "2025-06",
      end: null,
      location: "October, Egypt",
      stack: ["Vue.js 2 & 3", "TypeScript", "JavaScript"],
    },
    {
      id: "seamlabs",
      company: "SeamLabs",
      start: "2024-06",
      end: "2025-06",
      location: "Al Sheikh Zayed, Egypt",
      stack: ["Angular", "RxJS", "TypeScript"],
    },
    {
      id: "atw",
      company: "ATW Ltd.",
      start: "2021-09",
      end: "2024-07",
      location: "Cairo, Egypt",
      stack: ["Vue.js", "Angular", "Vuetify", "SCSS", "Bootstrap", "jQuery", "Axios"],
    },
    {
      id: "atwIntern",
      company: "ATW Ltd.",
      start: "2021-07",
      end: "2021-09",
      location: "Cairo, Egypt",
      stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "Ajax"],
    },
  ] satisfies Job[],
  projects: [
    {
      id: "azm",
      tier: "featured",
      url: "https://azm.sa/",
      screenshot: "/projects/azm.webp",
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "tasel",
      tier: "featured",
      url: "https://tasel.sa/",
      screenshot: "/projects/tasel.webp",
      stack: ["Vue.js", "Quasar", "Vite", "Tailwind CSS", "SCSS", "REST APIs", "Firebase", "Google Maps API"],
    },
    {
      id: "tanafos",
      tier: "featured",
      url: "https://tanafos.sa/",
      screenshot: "/projects/tanafos.webp",
      stack: ["Vue.js", "Quasar", "Vite", "TypeScript", "Tailwind CSS", "SCSS", "REST APIs", "WebSockets"],
    },
    {
      id: "bidxsell",
      tier: "featured",
      url: "https://bidxsell.com/",
      screenshot: "/projects/bidxsell.webp",
      stack: ["Angular", "TypeScript", "RxJS", "Angular Material", "Pusher", "REST APIs"],
    },
    {
      id: "sahl",
      tier: "private",
      stack: ["Angular", "Ionic", "Cordova", "TypeScript", "REST APIs"],
    },
    {
      id: "boulevard",
      tier: "private",
      stack: ["Nuxt.js", "Google Maps", "QR Code", "BEM", "OOCSS", "SMACSS"],
    },
    {
      id: "mlDashboard",
      tier: "private",
      stack: ["Nuxt.js", "Axios", "Vue Chart.js", "BEM", "OOCSS", "SMACSS"],
    },
    {
      id: "supplyChain",
      tier: "minor",
      stack: ["Nuxt.js", "JavaScript", "jQuery", "Ajax", "Bootstrap", "Axios"],
    },
    {
      id: "lms",
      tier: "minor",
      stack: ["Vue.js", "Axios"],
    },
    {
      id: "ipTracker",
      tier: "minor",
      url: "https://ip-address-tracker-master-eosin.vercel.app/",
      screenshot: "/projects/ipTracker.webp",
      stack: ["HTML", "CSS", "JavaScript", "IP Geolocation API"],
    },
  ] satisfies Project[] as Project[],
  skills: {
    frameworks: ["React", "Next.js", "Angular", "Vue.js", "Nuxt.js", "Ionic", "Quasar"],
    languages: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS3", "SCSS / SASS"],
    styling: ["Tailwind CSS", "Bootstrap", "Vuetify", "Angular Material", "BEM", "OOCSS", "SMACSS"],
    stateData: ["RxJS", "Pinia", "RESTful APIs", "WebSockets", "Pusher", "Firebase"],
    quality: ["Accessibility", "Internationalization", "SEO for SPAs", "SSR", "Responsive & Mobile-First", "Charts & Data Viz", "Google Maps"],
    tooling: ["Vite", "Webpack", "Git", "Linux", "Agile"],
    also: ["Node.js", ".NET / ASP.NET Core", "PHP", "MySQL"],
  } satisfies Record<SkillGroupId, string[]>,
  certificates: [
    {
      id: "egfwd",
      issuer: "Udacity & FWD",
      url: "https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/917bfdf9-2cd6-4bd7-ad2f-d88c1ac3c514.pdf",
    },
    { id: "udacityFullStack", issuer: "Udacity" },
    {
      id: "udemyJs",
      issuer: "Udemy",
      url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-a78ef861-a6e6-4a23-95f7-550fca10b1ee.pdf",
    },
    {
      id: "maharaEs6",
      issuer: "Mahara-Tech",
      url: "https://drive.google.com/file/d/107Wy-T7oG0JkuBJLv8RwIvJKBorQAwFX/view",
    },
    {
      id: "atwInternship",
      issuer: "ATW Ltd.",
      url: "https://drive.google.com/file/d/1eNv6sySra8nmrZXqVDy2o-aDu85M4Fvd/view",
    },
  ] satisfies Certificate[] as Certificate[],
};
