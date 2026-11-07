# Mennatullah Mohamed — Portfolio Website Design

Date: 2026-11-07
Source of truth for content: `c:\Users\menna\Downloads\Mennatullah_Mohamed-CV.pdf`

## Intent and why

Mennatullah is a frontend engineer (4+ years, React / Angular / Vue / TypeScript; title: "Frontend Web Developer") looking to be **hired** by
**international remote companies** and **Saudi companies**. The existing portfolio
(`portfolio-topaz-iota-96.vercel.app`) is an old HTML/CSS Grid project and no longer represents current skill level.

The new site must make a recruiter or tech lead think, within ~10 seconds: *"experienced frontend developer who ships
real products — and has taste."* The site itself is a portfolio piece: its polish, animation, performance, and
bilingual RTL support are evidence of skill.

## Goals

- Communicate role, years of experience, stack, and availability in the first screen.
- Show real shipped work (live Saudi products first) with credible detail.
- Make making contact one click away from anywhere on the site.
- Full **English / Arabic** experience with correct RTL layout — a deliberate signal to Saudi employers
  (internationalization is a CV skill).
- Fast and accessible: Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.

## Non-goals

- No blog, CMS, or admin panel.
- No contact form / backend (decided: direct links only).
- No Vue/Nuxt (decided by Mennatullah — Mennatullah wants to show React/Next).

## Anti-goals (would be a failure even if it works)

- Looks like a generic template ("Hi, I'm X" + three cards).
- The terminal theme becomes a gimmick that hides the content — a recruiter who doesn't care about code must
  still find projects, experience, and contact instantly.
- Exposes private/NDA material from STC projects.
- Arabic version that is a half-translated or visually broken RTL afterthought.
- Heavy, slow, janky animations, especially on mobile.

## Decided by Mennatullah

- **Framework family:** React-based (Next.js, React, or Angular were the acceptable options).
- **Hosting:** Cloudflare (Pages).
- **Audience:** international remote companies + Saudi companies, goal = get hired.
- **Visual direction:** **Dark & techy — "Terminal / Code Editor"** (direction A from mockups):
  editor window chrome (traffic-light dots, tab/title bar `~/mennatullah — portfolio.tsx`), file-tree sidebar used
  as navigation, code-syntax colouring of content, typing animation, blinking cursor `$ npm run hire-me_`.
  Palette reference: GitHub-dark-like — bg `#0b0f14`, panels `#11161d`, borders `#1f2933`, text `#c9d1d9`,
  muted `#6e7681`, green accent `#3fb950`, keyword `#ff7b72`, string `#a5d6ff`, number `#79c0ff`, purple `#d2a8ff`.
  Monospace display font (e.g. JetBrains Mono) + a readable sans for long text.
- **Languages:** EN / عربي toggle in the title bar. Arabic = full RTL layout.
- **Contact:** Email, LinkedIn, WhatsApp, and CV download. No form.
- **Projects:** some have live links; STC projects are private.

## Decided by Claude (calls for Mennatullah to review)

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, `output: 'export'` (static) deployed to
  Cloudflare Pages. Rationale: best animation ecosystem, recruiter-recognisable, Mennatullah already used Framer Motion on
  AZM, static export avoids Cloudflare runtime adapters.
- **i18n:** locale-prefixed routes `/en` and `/ar` (statically generated), root `/` redirects/links to `/en`
  (static-friendly). `<html lang dir>` set per locale. Translations in typed dictionary files
  (`en.ts`, `ar.ts`) — no runtime i18n service needed. Arabic font: IBM Plex Sans Arabic (pairs with mono theme).
  Code-styled snippets stay LTR inside the RTL page (as in a real editor); prose, layout, sidebar flip to RTL.
- **Single page with sections** (smooth-scroll), file tree items map to sections:
  `about.ts`, `experience.log`, `projects/`, `skills.json`, `certificates.md`, `contact.sh`.
  Active file highlights while scrolling. On mobile the file tree becomes a slide-out drawer; editor chrome simplifies.
- **"Recruiter-safe" layer:** every section has a plain, readable heading/summary beside the code styling;
  a persistent "Hire me" / contact button and "Download CV" are always visible.
- **Sections & content** (all from the CV):
  1. **Hero** — code-object intro (name, role "Frontend Web Developer" (matches CV — decided), stack, years 4+, `openToWork: true`),
     typing animation, CTAs: Contact, Download CV, View projects. Availability: "Open to remote & KSA roles".
  2. **About** — short bio: Cairo University Information Systems grad (2022), 4+ yrs, React/Angular/Vue,
     real-time apps, i18n, accessibility; soft skills (mentorship, collaboration, attention to detail).
  3. **Experience** — styled like `git log`: Azm Squad (06/2025–present, Vue/TS), SeamLabs (06/2024–06/2025,
     Angular/RxJS), ATW Ltd. (09/2021–07/2024), ATW intern (07/2021–09/2021).
  4. **Projects** — featured first, live ones with screenshot in a mini-browser frame + "Live ↗":
     - AZM Website — azm.sa — React, TS, Tailwind, Framer Motion
     - Tasel — tasel.sa — Vue, Quasar, Vite, Tailwind, Firebase, Google Maps
     - Tanafos — tanafos.sa — Vue, Quasar, TS, WebSockets
     - BidxSell — bidxsell.com — Angular, RxJS, Angular Material, Pusher (real-time bidding)
     Private (badge `🔒 private · NDA`, no screenshots, themed illustration + mini case study):
     - Sahl (STC) — Angular + Ionic hybrid app (iOS/Android), e-commerce, attendance, dashboards
     - Boulevard (STC) — Nuxt maintenance management, Google Maps, QR codes, BEM/OOCSS/SMACSS
     - ML Dashboard — Nuxt + Vue Chart.js analytics
     Secondary/smaller (compact list): Supply Chain system, LMS, IP Address Tracker (live link).
     Live URLs: https://azm.sa/ , https://tasel.sa/ , https://tanafos.sa/ , https://bidxsell.com/ ,
     https://ip-address-tracker-master-eosin.vercel.app/
  5. **Skills** — rendered as `skills.json`, grouped: Frameworks (React, Next.js, Angular, Vue, Nuxt, Ionic, Quasar),
     Languages (TypeScript, JavaScript ES6+, HTML, CSS3, SCSS), Styling (Tailwind, Bootstrap, Vuetify,
     Angular Material, BEM/OOCSS/SMACSS), State & Data (RxJS, Pinia, REST, WebSockets/Pusher/Firebase),
     Quality (Accessibility, i18n, SEO for SPAs, SSR, Responsive), Tooling (Vite, Webpack, Git, Linux, Agile),
     Also (Node.js, .NET/ASP.NET Core, PHP, MySQL).
  6. **Certificates** — Udacity egFWD Challenger, Udacity Full Stack, Udemy JavaScript, Mahara-Tech ES6,
     ATW internship. Links extracted from CV PDF (map each to its certificate by opening it):
     https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/917bfdf9-2cd6-4bd7-ad2f-d88c1ac3c514.pdf ,
     https://udemy-certificate.s3.amazonaws.com/pdf/UC-a78ef861-a6e6-4a23-95f7-550fca10b1ee.pdf ,
     https://drive.google.com/file/d/1eNv6sySra8nmrZXqVDy2o-aDu85M4Fvd/view ,
     https://drive.google.com/file/d/107Wy-T7oG0JkuBJLv8RwIvJKBorQAwFX/view
  7. **Contact** — `contact.sh` style: email `menna.tullah5112@gmail.com`, LinkedIn
     `linkedin.com/in/mennatullah-mohamed-29657818b`, WhatsApp `wa.me/201149533878`, GitHub `github.com/menna2812m`,
     Download CV button.
- **Assets:** CV PDF copied into `public/` as `Mennatullah_Mohamed-CV.pdf`. Project screenshots captured from the
  live sites (desktop, optimised WebP). OG image (1200×630, terminal style) for LinkedIn/WhatsApp link previews.
- **SEO/meta:** per-locale title/description, `hreflang` alternates, sitemap, robots, JSON-LD `Person`.
- **Motion:** typing hero, staggered reveal on scroll, cursor blink; all respect `prefers-reduced-motion`.
- **Accessibility:** semantic sections, keyboard-navigable file tree, visible focus, AA contrast on dark theme.

## Constraints

- Static export only (no server functions) → Cloudflare Pages with build command `npm run build`, output `out/`.
- Images: `next/image` with `unoptimized: true` (static export) — pre-optimise screenshots manually.
- Must work and look right at 360px mobile width, both LTR and RTL.

## Left to the builder

- Exact component structure, animation timings, file-tree icons, illustration style for private projects.
- Arabic copy (translate faithfully from English; keep tech names in Latin script).
- Domain setup (works on `*.pages.dev` first; custom domain can be attached later).

## Tooling (from "download all skills")

- Use the `frontend-design` skill during implementation for distinctive visual quality.
- Install: next, react, react-dom, typescript, tailwindcss, framer-motion, fonts via `next/font`
  (JetBrains Mono, Inter, IBM Plex Sans Arabic), lucide-react / simple-icons for icons.

## Answers from Mennatullah (builder check, 2026-11-07)

- **Title:** keep **"Frontend Web Developer"** everywhere (hero, meta title, JSON-LD jobTitle, OG image) — matches CV.
  Never use "Senior" in copy.
- **Project copy:** write **only from CV content**. No invented metrics, ownership claims, or results. Cards are
  description + stack + feature bullets as stated in the CV. Employer per project is not stated — do not attribute.
- **Private projects:** showing **"STC"** next to Sahl and Boulevard is OK. Keep descriptions to CV wording
  (styled summary, not an extended case study). Still badge them `🔒 private` with themed illustration.
- **Screenshots:** OK to publish screenshots of azm.sa, tasel.sa, tanafos.sa, bidxsell.com (and the IP tracker).
