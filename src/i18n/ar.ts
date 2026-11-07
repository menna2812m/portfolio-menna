import type { Dictionary } from "./types";

/*
 * Arabic copy is written in the first person and avoids gendered nouns/adjectives
 * for the site owner (job titles stay in Latin script as on the CV).
 */
export const ar: Dictionary = {
  meta: {
    title: "منة الله محمد — Frontend Web Developer",
    description:
      "أكثر من 4 سنوات من الخبرة في تطوير واجهات الويب التفاعلية والفورية باستخدام React وNext.js وAngular وVue. أبحث عن فرص عمل عن بُعد وفي المملكة العربية السعودية.",
  },
  chrome: {
    windowTitle: "~/mennatullah — portfolio.tsx",
    explorer: "المستكشف",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLanguage: "التبديل إلى اللغة الإنجليزية",
    otherLanguageLabel: "EN",
  },
  cta: {
    contact: "تواصل معي",
    downloadCv: "تحميل السيرة الذاتية",
    viewProjects: "عرض المشاريع",
    hireMe: "npm run hire-me",
  },
  hero: {
    name: "منة الله محمد",
    comment: "// أهلاً بالعالم 👋",
    role: "Frontend Web Developer",
    availability: "أبحث عن فرص عن بُعد وفي السعودية",
    tagline:
      "أبني منتجات ويب سريعة ومتجاوبة وسهلة الوصول — من منصات المزادات الفورية إلى المنصات السعودية ثنائية اللغة.",
    location: "الجيزة، مصر · أعمل عن بُعد",
  },
  sections: {
    about: { title: "نبذة عني", summary: "من أنا وكيف أعمل." },
    experience: { title: "الخبرات", summary: "أكثر من 4 سنوات في تطوير الواجهات لفرق المنتجات." },
    projects: { title: "المشاريع", summary: "منتجات منشورة وأعمال خاصة للعملاء." },
    skills: { title: "المهارات", summary: "الأدوات التي أستخدمها يومياً." },
    certificates: { title: "الشهادات", summary: "الدورات والمسارات التي أتممتها." },
    contact: { title: "التواصل", summary: "أسرع طرق التواصل معي." },
  },
  about: {
    paragraphs: [
      "أعمل في تطوير واجهات الويب الأمامية منذ أكثر من 4 سنوات، وأبني تطبيقات ويب متجاوبة باستخدام React وNext.js وAngular وVue وTypeScript.",
      "شاركت في بناء منصات فورية باستخدام WebSockets وPusher، ومنتجات ثنائية اللغة للسوق السعودي، وتطبيقات جوال هجينة باستخدام Ionic، ولوحات بيانات تفاعلية — مع التركيز على بنية مكوّنات قابلة للصيانة، والأداء، وسهولة الوصول.",
      "أعمل عن قرب مع فرق المنتج والتصميم لتحويل الرؤية الإبداعية إلى تجربة استخدام سلسة.",
    ],
    educationLabel: "education",
    education: "بكالوريوس نظم المعلومات — كلية الحاسبات والذكاء الاصطناعي، جامعة القاهرة (2018 – 2022)",
    softSkillsLabel: "softSkills",
    softSkills: [
      "القدرة على التكيّف",
      "إدارة الوقت وترتيب الأولويات",
      "الإرشاد ومشاركة المعرفة",
      "الاهتمام بالتفاصيل",
      "العمل الجماعي",
    ],
  },
  jobs: {
    azm: {
      role: "Frontend Web Developer",
      summary: [
        "بناء وصيانة تطبيقات ويب متجاوبة باستخدام Vue.js (2 و3) وTypeScript وJavaScript الحديثة.",
        "تصميم حلول قابلة للتوسع قائمة على المكوّنات لتحسين تجربة المستخدم وتلبية متطلبات الأعمال المعقدة.",
        "تطبيق أفضل الممارسات لقابلية صيانة الكود وتحسين الأداء.",
      ],
    },
    seamlabs: {
      role: "Frontend Web Developer",
      summary: [
        "تصميم وتنفيذ واجهات ديناميكية وسهلة الاستخدام باستخدام Angular.",
        "التعاون مع فرق المنتج والتصميم لربط الرؤية الإبداعية بالتنفيذ التقني.",
        "بناء تطبيقات عالية الأداء وقابلة للتوسع باستخدام RxJS وTypeScript.",
      ],
    },
    atw: {
      role: "Frontend Web Developer",
      summary: [
        "العمل مع المصممين والمنتجين وفرق خارجية على تحديث عالمي لموقع الشركة.",
        "بناء صفحات الواجهة باستخدام HTML وCSS وJavaScript وjQuery وAjax وAxios.",
        "إنشاء واجهات متجاوبة باستخدام SCSS وBootstrap وVuetify داخل Vue.js، وبناء مكوّنات وخدمات ووحدات Angular باستخدام RxJS وTypeScript.",
      ],
    },
    atwIntern: {
      role: "Frontend Web Developer Intern",
      summary: [
        "تحويل التصاميم الأولية إلى عناصر موقع باستخدام HTML وCSS وBootstrap وJavaScript.",
        "استخدام jQuery وAjax وJSON للتواصل مع الخادم.",
        "إنشاء مواقع ومسارات متجاوبة للجوال وسطح المكتب.",
      ],
    },
  },
  present: "حتى الآن",
  projects: {
    azm: {
      name: "AZM Website",
      tagline: "Saudi AZM for Communication & Information",
      description:
        "الموقع الرسمي لشركة AZM، شركة سعودية في مجال التقنية والتحول الرقمي، يعرض خدماتها وحلولها وملفها التعريفي بتجربة استخدام حديثة وتفاعلية.",
      features: ["حركات سلسة وجذابة باستخدام Framer Motion", "عرض الخدمات والحلول", "واجهة حديثة وتفاعلية"],
    },
    tasel: {
      name: "Tasel",
      tagline: "منصة عقارية رقمية — المملكة العربية السعودية",
      description:
        "منصة عقارية مرخّصة تربط ملّاك العقارات والمسوّقين المرخّصين والمشترين، وتتيح عرض العقارات واكتشافها وإدارة دورة البيع كاملة في تجربة رقمية موحّدة.",
      features: ["عرض العقارات واكتشافها", "تكامل مع Google Maps", "إدارة دورة البيع"],
    },
    tanafos: {
      name: "Tanafos",
      tagline: "منصة مشتريات B2B — المملكة العربية السعودية",
      description:
        "منصة مشتريات وسوق إلكتروني تسهّل عمليات الشراء للجهات غير الربحية عبر ربطها بموردين معتمدين، وتتيح المنافسة على العروض وتبسيط إجراءات الشراء.",
      features: ["منافسة على العروض", "تحديثات فورية عبر WebSockets", "تصميم متجاوب"],
    },
    bidxsell: {
      name: "BidxSell",
      tagline: "منصة مزادات الخيول الإلكترونية",
      description:
        "منصة مزادات إلكترونية لبيع وشراء الخيول بأمان عبر مزادات رقمية مع مزايدة فورية ومعاملات شفافة.",
      features: [
        "نظام مزادات فوري مع مزايدة مباشرة",
        "تسجيل الدخول وإدارة إعلانات الخيول",
        "نظام بحث وتصفية",
        "تصميم متجاوب ولوحة تحكم للإدارة",
      ],
    },
    sahl: {
      name: "Sahl (STC)",
      tagline: "تطبيق هجين شامل للموظفين على iOS وAndroid",
      description:
        "تطبيق جوال هجين لموظفي المؤسسة: منصة شاملة تجمع التجارة الإلكترونية مع طلبات الإجازات وتتبّع الحضور ولوحات بيانات تفاعلية للموظفين.",
      features: ["تجارة إلكترونية", "طلبات الإجازات وتتبّع الحضور", "لوحات بيانات تفاعلية", "iOS وAndroid"],
    },
    boulevard: {
      name: "Boulevard (STC)",
      tagline: "نظام إدارة صيانة الأجهزة",
      description:
        "نظام لإدارة صيانة الأجهزة مبني باستخدام Nuxt.js ومتكامل مع الواجهات البرمجية وGoogle Maps ورموز QR، مع اتباع منهجيات CSS ‏(BEM وOOCSS وSMACSS).",
      features: ["تكامل مع Google Maps", "مسارات عمل برموز QR", "بنية CSS قابلة للتوسع"],
    },
    mlDashboard: {
      name: "ML Dashboard",
      tagline: "لوحة تحليل بالذكاء الاصطناعي",
      description:
        "نظام لتحليل الموارد وتزويد أصحاب القرار بإحصائيات مفيدة لاتخاذ قرارات مدروسة، مبني باستخدام Nuxt.js وAxios وVue Chart.js.",
      features: ["تمثيل مرئي للبيانات", "إحصائيات لأصحاب القرار", "بنية CSS قابلة للتوسع"],
    },
    supplyChain: {
      name: "سلسلة الإمداد",
      tagline: "نقاط بيع، تجارة إلكترونية، لوحة تحكم، متعدد البائعين",
      description: "منظومة لسلسلة الإمداد تشمل نقاط البيع والتجارة الإلكترونية ولوحة تحكم ودعم تعدد البائعين.",
      features: ["نقاط البيع", "تجارة إلكترونية متعددة البائعين", "لوحة تحكم"],
    },
    lms: {
      name: "نظام إدارة التعلّم",
      tagline: "الدورات والمحتوى والاختبارات",
      description: "نظام لإدارة التعلّم يشمل تسجيل الدخول وإدارة الدورات وتقديم المحتوى وأدوات التقييم وتتبّع التقدّم.",
      features: ["تسجيل الدخول", "إدارة الدورات", "التقييم وتتبّع التقدّم"],
    },
    ipTracker: {
      name: "متتبّع عناوين IP",
      tagline: "اعرف موقع أي عنوان IP",
      description: "تطبيق يعرض موقع عنوان IP باستخدام IP Geolocation API.",
      features: ["IP Geolocation API", "خريطة تفاعلية"],
    },
  },
  projectLabels: {
    featured: "مشاريع مميزة — منتجات منشورة",
    private: "أعمال خاصة للعملاء",
    minor: "مشاريع أخرى",
    privateBadge: "خاص · سرّي",
    liveLabel: "الموقع",
    builtWith: "التقنيات",
    screenshotAlt: "لقطة شاشة للصفحة الرئيسية لـ {name}",
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
    egfwd: "مسار egFWD لتطوير الويب — Challenger Track",
    udacityFullStack: "مسار تطوير Full Stack",
    udemyJs: "دورات JavaScript",
    maharaEs6: "JavaScript الحديثة (ES6)",
    atwInternship: "تدريب Frontend Web Developer",
  },
  certificateView: "عرض الشهادة",
  contact: {
    intro: "هل يحتاج فريقكم إلى خبرة في تطوير الواجهات الأمامية؟ لنتحدث.",
    email: "البريد الإلكتروني",
    linkedin: "LinkedIn",
    whatsapp: "واتساب",
    github: "GitHub",
    cv: "تحميل السيرة الذاتية (PDF)",
  },
  footer: "مبني باستخدام Next.js وTypeScript وTailwind CSS · منشور على Cloudflare",
};
