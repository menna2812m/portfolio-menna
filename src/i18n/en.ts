import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Mennatullah Mohamed — Frontend Web Developer",
    description:
      "Frontend Web Developer with 4+ years building responsive, real-time web apps with React, Next.js, Angular and Vue. Open to remote and Saudi Arabia roles.",
  },
  chrome: {
    windowTitle: "~/mennatullah — portfolio.tsx",
    explorer: "Explorer",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    switchLanguage: "Switch language to Arabic",
    otherLanguageLabel: "عربي",
  },
  cta: {
    contact: "Contact me",
    downloadCv: "Download CV",
    viewProjects: "View projects",
    hireMe: "npm run hire-me",
  },
  hero: {
    name: "Mennatullah Mohamed",
    comment: "// hello world 👋",
    role: "Frontend Web Developer",
    availability: "Open to remote & KSA roles",
    tagline:
      "I build fast, responsive and accessible web products — from real-time auction platforms to bilingual Saudi marketplaces.",
    location: "Giza, Egypt · working remotely",
  },
  sections: {
    about: { title: "About", summary: "Who I am and how I work." },
    experience: { title: "Experience", summary: "4+ years shipping frontend for product teams." },
    projects: { title: "Projects", summary: "Live products and private client work." },
    skills: { title: "Skills", summary: "The tools I use every day." },
    certificates: { title: "Certificates", summary: "Courses and tracks I've completed." },
    contact: { title: "Contact", summary: "The fastest ways to reach me." },
  },
  about: {
    paragraphs: [
      "I'm a Frontend Web Developer with 4+ years of experience building responsive web applications with React, Next.js, Angular and Vue, always in TypeScript.",
      "I've shipped real-time platforms with WebSockets and Pusher, bilingual products for the Saudi market, hybrid mobile apps with Ionic, and data dashboards — with a focus on maintainable component architecture, performance and accessibility.",
      "I work closely with product and design teams to turn creative vision into seamless user experiences.",
    ],
    educationLabel: "education",
    education: "B.Sc. Information Systems — Faculty of Computers and AI, Cairo University (2018 – 2022)",
    softSkillsLabel: "softSkills",
    softSkills: [
      "Adaptability",
      "Time management & prioritization",
      "Mentorship & knowledge sharing",
      "Attention to detail",
      "Team collaboration",
    ],
  },
  jobs: {
    azm: {
      role: "Frontend Web Developer",
      summary: [
        "Build and maintain responsive web applications with Vue.js (2 & 3), TypeScript and modern JavaScript.",
        "Architect scalable component-based solutions that improve user experience and meet complex business requirements.",
        "Apply best practices for code maintainability and performance optimization.",
      ],
    },
    seamlabs: {
      role: "Frontend Web Developer",
      summary: [
        "Designed and implemented dynamic, user-friendly interfaces with Angular.",
        "Collaborated with product and design teams to bridge creative vision and technical execution.",
        "Built scalable, high-performance applications with RxJS and TypeScript.",
      ],
    },
    atw: {
      role: "Frontend Web Developer",
      summary: [
        "Worked with designers, producers and offshore teams on a global refresh of the company website.",
        "Built UI pages with HTML, CSS, JavaScript, jQuery, Ajax and Axios.",
        "Created responsive interfaces with SCSS, Bootstrap and Vuetify in Vue.js, and built Angular components, services and modules with RxJS and TypeScript.",
      ],
    },
    atwIntern: {
      role: "Frontend Web Developer Intern",
      summary: [
        "Converted design wireframes into website elements with HTML, CSS, Bootstrap and JavaScript.",
        "Used jQuery, Ajax and JSON to communicate with the server.",
        "Created responsive sites and flows for mobile and desktop.",
      ],
    },
  },
  present: "present",
  projects: {
    azm: {
      name: "AZM Website",
      tagline: "Saudi AZM for Communication & Information",
      description:
        "Corporate website for AZM, a Saudi technology and digital transformation company, showcasing its services, solutions and company profile with a modern, interactive user experience.",
      features: ["Smooth, engaging Framer Motion animations", "Services & solutions showcase", "Modern interactive UI"],
    },
    tasel: {
      name: "Tasel",
      tagline: "Digital real estate platform — Saudi Arabia",
      description:
        "A licensed real estate platform that connects property owners, licensed marketers and buyers, enabling property listing, discovery and sales lifecycle management in one digital experience.",
      features: ["Property listing & discovery", "Google Maps integration", "Sales lifecycle management"],
    },
    tanafos: {
      name: "Tanafos",
      tagline: "B2B procurement platform — Saudi Arabia",
      description:
        "A procurement and marketplace platform that streamlines purchasing for non-profit organizations by connecting them with verified suppliers, enabling competitive bidding and simpler procurement workflows.",
      features: ["Competitive bidding", "Real-time updates with WebSockets", "Responsive design"],
    },
    bidxsell: {
      name: "BidxSell",
      tagline: "Premier online horse auction platform",
      description:
        "An online horse auction platform enabling secure buying and selling of horses through digital auctions with real-time bidding and transparent transactions.",
      features: [
        "Real-time auction system with live bidding",
        "User authentication & horse listing management",
        "Search & filter system",
        "Mobile-responsive design & admin dashboard",
      ],
    },
    sahl: {
      name: "Sahl (STC)",
      tagline: "Hybrid employee super-app for iOS & Android",
      description:
        "A hybrid mobile application for employees within an organization: an all-in-one platform offering e-commerce alongside vacation requests, attendance tracking and dynamic dashboards of employee data.",
      features: ["E-commerce", "Vacation requests & attendance tracking", "Dynamic dashboards", "iOS & Android"],
    },
    boulevard: {
      name: "Boulevard (STC)",
      tagline: "Device maintenance management system",
      description:
        "A system for device maintenance management built with Nuxt.js, integrated with APIs, Google Maps and QR codes, following the BEM, OOCSS and SMACSS CSS methodologies.",
      features: ["Google Maps integration", "QR code workflows", "Scalable CSS architecture"],
    },
    mlDashboard: {
      name: "ML Dashboard",
      tagline: "AI analysis dashboard",
      description:
        "A system that analyzes resources and gives stakeholders useful statistics to make informed decisions, built with Nuxt.js, Axios and Vue Chart.js.",
      features: ["Data visualization", "Stakeholder statistics", "Scalable CSS architecture"],
    },
    supplyChain: {
      name: "Supply Chain",
      tagline: "Point of sale, e-commerce, admin panel, multi-vendor",
      description: "A supply chain suite covering point of sale, e-commerce, an admin panel and multi-vendor support.",
      features: ["Point of sale", "Multi-vendor e-commerce", "Admin panel"],
    },
    lms: {
      name: "Learning Management System",
      tagline: "Courses, content and assessments",
      description:
        "An LMS with user authentication, course management, content delivery, assessment tools and progress tracking.",
      features: ["Authentication", "Course management", "Assessments & progress tracking"],
    },
    ipTracker: {
      name: "IP Address Tracker",
      tagline: "Find the location of any IP address",
      description: "An app that shows the location of an IP address, built with the IP Geolocation API.",
      features: ["IP Geolocation API", "Interactive map"],
    },
  },
  projectLabels: {
    featured: "Featured — live products",
    private: "Private client work",
    minor: "More projects",
    privateBadge: "private · NDA",
    liveLabel: "Live",
    builtWith: "built with",
    screenshotAlt: "Screenshot of the {name} homepage",
  },
  skillGroups: {
    frameworks: "frameworks",
    languages: "languages",
    styling: "styling",
    stateData: "stateAndData",
    quality: "quality",
    tooling: "tooling",
    also: "alsoWorkedWith",
  },
  certificates: {
    egfwd: "egFWD Web Development — Challenger Track",
    udacityFullStack: "Full Stack Development Track",
    udemyJs: "JavaScript Courses",
    maharaEs6: "Modern JavaScript (ES6)",
    atwInternship: "Frontend Web Developer Internship",
  },
  certificateView: "view certificate",
  contact: {
    intro: "Looking for a frontend developer for your team? Let's talk.",
    email: "Email",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    github: "GitHub",
    cv: "Download CV (PDF)",
  },
  footer: "Built with Next.js, TypeScript & Tailwind CSS · deployed on Cloudflare",
};
