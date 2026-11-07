# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A bilingual (EN/AR, full RTL) "Terminal / Code Editor"-themed single-page portfolio for Mennatullah Mohamed, statically exported and deployable to Cloudflare Pages.

**Architecture:** Next.js App Router with `output: 'export'`; routes `/en/` and `/ar/` generated via `generateStaticParams`. All content lives in typed data files (locale-neutral facts in `src/content/profile.ts`, translated strings in `src/i18n/{en,ar}.ts`); presentational components read only from those. Editor chrome (title bar + file-tree nav) wraps the sections.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS 4, Framer Motion 14 (`motion`), `next/font/google` (JetBrains Mono, Inter, IBM Plex Sans Arabic), lucide-react, Vitest (unit), Playwright (e2e + screenshots), `serve` (static preview), Node 22.

**Spec:** `docs/superpowers/specs/2026-11-07-portfolio-design.md` (read it — it holds the palette, section list, all URLs, and the copy rules).

Project root: `D:\Me\portfolio` (the spec's `docs/` already lives there). Run every command from that root.

## Global Constraints

- Title everywhere is **"Frontend Web Developer"**. The string "Senior" must never appear in rendered copy, metadata, JSON-LD or OG image.
- Project copy comes **only from the CV**: no invented metrics, ownership claims, or employer attribution for projects.
- `🔒 private` badge on Sahl (STC), Boulevard (STC), ML Dashboard; no screenshots for them. "STC" may be shown.
- Contact = email `menna.tullah5112@gmail.com`, LinkedIn `https://www.linkedin.com/in/mennatullah-mohamed-29657818b/`, WhatsApp `https://wa.me/201149533878`, GitHub `https://github.com/menna2812m`, CV `/Mennatullah_Mohamed-CV.pdf`. No contact form.
- Static export only: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`; build output `out/`.
- Palette: bg `#0b0f14`, panel `#11161d`, border `#1f2933`, text `#c9d1d9`, muted `#6e7681`, green `#3fb950`, keyword `#ff7b72`, string `#a5d6ff`, number `#79c0ff`, purple `#d2a8ff`.
- `/ar/` has `<html lang="ar" dir="rtl">`; `/en/` has `<html lang="en" dir="ltr">`. Code-styled snippets are `dir="ltr"` inside RTL.
- Must render with no horizontal scroll at 360px width in both locales.
- All motion respects `prefers-reduced-motion: reduce`.
- Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO (mobile) for `/en/` and `/ar/`.

## Review Focus

1. **Arabic at 360px:** long Latin tokens (URLs, email, `"Frontend Web Developer"`, tech tags) inside RTL layout overflow horizontally → test in Task 3 and Task 5 (`no-overflow.spec.ts`, both locales, every section).
2. **Mixed-direction text:** email, URLs and tech names inside Arabic sentences get reordered by the bidi algorithm (e.g. `@` jumping) → wrap Latin tokens in `<bdi>` / `dir="ltr"`; e2e asserts email element has `dir="ltr"` on `/ar/` (Task 4).
3. **Language toggle loses place:** switching EN↔AR while viewing `#projects` should land on `/ar/#projects`, not the top → test in Task 3.
4. **Content invisible without animation:** Framer Motion `initial={{opacity:0}}` leaves text hidden in static HTML / for reduced-motion users / crawlers → test in Task 4 that exported HTML contains hero name and every section heading, and reduced-motion e2e sees full hero text immediately.
5. **Deep links on Cloudflare:** `/ar` (no slash), `/` and `/en/#contact` must resolve → `trailingSlash: true`, root `out/index.html` redirects to `/en/`; e2e in Task 1 against the static server.

---

### Task 1: Scaffold, static export, test harness

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx` (root pass-through), `src/app/page.tsx` (root redirect), `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` (placeholder), `src/i18n/locales.ts`, `vitest.config.ts`, `playwright.config.ts`, `e2e/routing.spec.ts`, `.gitignore`, `public/Mennatullah_Mohamed-CV.pdf` (copy of `c:\Users\menna\Downloads\Mennatullah_Mohamed-CV.pdf`)

**Interfaces:**
- Produces: `export const locales = ['en', 'ar'] as const; export type Locale = typeof locales[number]; export const dirOf: (l: Locale) => 'ltr' | 'rtl'; export const isLocale: (s: string) => s is Locale` in `src/i18n/locales.ts`.
- Produces: npm scripts `dev`, `build` (`next build`), `preview` (`serve out -l 4173`), `test` (`vitest run`), `e2e` (`playwright test`), `screenshots` (Task 5).
- Produces: Tailwind theme tokens in `globals.css` `@theme`: `--color-bg, --color-panel, --color-border, --color-text, --color-muted, --color-green, --color-keyword, --color-string, --color-number, --color-purple` with the Global Constraints values.

- [ ] **Step 1:** `git init` in `D:\Me\portfolio`; scaffold with `npx create-next-app@16 . --ts --tailwind --app --src-dir --eslint --import-alias "@/*" --use-npm` (keep existing `docs/`). Add deps: `motion lucide-react`; dev deps: `vitest @playwright/test serve`. `npx playwright install chromium`. Copy the CV PDF into `public/`.
- [ ] **Step 2:** Configure `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`. Root `src/app/page.tsx` renders `<meta httpEquiv="refresh" content="0; url=/en/">` plus a visible link to `/en/` and `/ar/`. `[locale]/layout.tsx`: `generateStaticParams` returns both locales, `dynamicParams = false`, renders `<html lang={locale} dir={dirOf(locale)}>` with body bg `--color-bg`.
- [ ] **Step 3: Write failing e2e** `e2e/routing.spec.ts` (Playwright `webServer: npm run build && npm run preview`, baseURL `http://localhost:4173`):
  - `GET /` ends at URL matching `/en/$`
  - `/en/` → `html[lang=en][dir=ltr]`; `/ar/` → `html[lang=ar][dir=rtl]`
  - `/ar` (no slash) loads with status 200 and `dir=rtl`
  - `/Mennatullah_Mohamed-CV.pdf` returns 200 with `content-type` containing `pdf`
- [ ] **Step 4:** `npm run e2e -- routing` → all PASS. `npm test` runs (no tests yet is OK: add `passWithNoTests: true`).
- [ ] **Step 5:** Commit `chore: scaffold Next.js static-export portfolio with test harness`.

### Task 2: Content data and dictionaries

**Files:**
- Create: `src/content/profile.ts`, `src/i18n/en.ts`, `src/i18n/ar.ts`, `src/i18n/types.ts`, `src/i18n/get-dictionary.ts`, `src/content/profile.test.ts`, `src/i18n/dictionaries.test.ts`

**Interfaces:**
- Produces in `profile.ts`:
  ```ts
  type ProjectId = 'azm'|'tasel'|'tanafos'|'bidxsell'|'sahl'|'boulevard'|'mlDashboard'|'supplyChain'|'lms'|'ipTracker'
  type Project = { id: ProjectId; tier: 'featured'|'private'|'minor'; url?: string; screenshot?: string /* /projects/<id>.webp */; stack: string[] }
  type Job = { id: 'azm'|'seamlabs'|'atw'|'atwIntern'; company: string; start: string /* 'YYYY-MM' */; end: string|null; location: string; stack: string[] }
  type SkillGroupId = 'frameworks'|'languages'|'styling'|'stateData'|'quality'|'tooling'|'also'
  type Certificate = { id: string; issuer: string; url?: string }
  export const profile: { name: string; title: 'Frontend Web Developer'; years: 4; location: string; contact: { email; linkedin; whatsapp; github; cv }; jobs: Job[]; projects: Project[]; skills: Record<SkillGroupId, string[]>; certificates: Certificate[] }
  ```
- Produces `Dictionary` type in `types.ts` (nav labels per file, section titles + plain-language summaries, hero lines, CTA labels, `projects: Record<ProjectId, { name; tagline; description; features: string[] }>`, `jobs: Record<Job['id'], { role; summary: string[] }>`, `skillGroups: Record<SkillGroupId,string>`, `certificates: Record<string,string>`, `meta: { title; description }`, `about: string[]`, `softSkills: string[]`, `privateBadge`, `liveLabel`, `availability: 'Open to remote & KSA roles'` (EN)).
- Produces `getDictionary(locale: Locale): Dictionary`.

- [ ] **Step 1: Write failing tests**:
  - `profile.test.ts`: project order of `tier==='featured'` is exactly `['azm','tasel','tanafos','bidxsell']` with urls `https://azm.sa/`, `https://tasel.sa/`, `https://tanafos.sa/`, `https://bidxsell.com/`; `private` ids are `['sahl','boulevard','mlDashboard']` and none has `screenshot` or `url`; `ipTracker.url === 'https://ip-address-tracker-master-eosin.vercel.app/'`; contact values equal Global Constraints; jobs ordered newest first with `azm.end === null`; `profile.title === 'Frontend Web Developer'`.
  - `dictionaries.test.ts`: deep key sets of `en` and `ar` are identical; no string value in either is empty; `JSON.stringify(en)+JSON.stringify(ar)` does not match `/senior/i`; `en.hero.role === "Frontend Web Developer"` and `ar.hero.role === "مطوّر واجهات أمامية"`.
- [ ] **Step 2:** `npm test` → FAIL (modules missing).
- [ ] **Step 3:** Fill data strictly from the CV (spec §Sections lists every item and URL; certificate URLs: open each to map to its issuer). Arabic: faithful translation, tech names kept in Latin script.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: typed CV content and EN/AR dictionaries`.

### Task 3: Editor shell — chrome, file-tree nav, language toggle, mobile drawer

**Files:**
- Create: `src/components/shell/EditorChrome.tsx`, `src/components/shell/FileTree.tsx`, `src/components/shell/LangToggle.tsx`, `src/components/shell/MobileDrawer.tsx`, `src/components/shell/HireBar.tsx`, `src/components/shell/useActiveSection.ts`, `src/content/sections.ts`, `e2e/shell.spec.ts`, `e2e/no-overflow.spec.ts`
- Modify: `src/app/[locale]/layout.tsx` (fonts via `next/font/google`: JetBrains Mono `--font-mono`, Inter `--font-sans`, IBM Plex Sans Arabic `--font-arabic`; body uses arabic font when `dir=rtl`), `src/app/[locale]/page.tsx`

**Interfaces:**
- Produces `sections.ts`: `export const sections = [{ id:'about', file:'about.ts' }, { id:'experience', file:'experience.log' }, { id:'projects', file:'projects/' }, { id:'skills', file:'skills.json' }, { id:'certificates', file:'certificates.md' }, { id:'contact', file:'contact.sh' }] as const; export type SectionId = typeof sections[number]['id']`. Hero has id `top`.
- Produces `<EditorChrome locale dict>{children}</EditorChrome>`: title bar (3 dots, `~/mennatullah — portfolio.tsx`, `LangToggle`), desktop sidebar `FileTree` (≥ lg), `MobileDrawer` (< lg) with hamburger, main scroll area, `HireBar` (persistent "Contact" + "Download CV" buttons).
- Produces `useActiveSection(ids: string[]): string` (IntersectionObserver).
- `LangToggle` links to the other locale preserving `location.hash`.

- [ ] **Step 1: Write failing e2e** `shell.spec.ts`:
  - desktop (1280×800): each file-tree link has text of its `file` and clicking `projects/` scrolls `#projects` into view and gives that link `aria-current="true"`.
  - on `/en/#projects`, clicking toggle navigates to `/ar/#projects` and `#projects` is in viewport.
  - mobile (360×740): sidebar hidden; hamburger `aria-expanded=false`→click→`true`, drawer shows links; `Escape` closes it; focus returns to hamburger.
  - Tab from page start reaches file-tree links and they show a visible focus ring (computed `outline-style` ≠ `none`).
  - `HireBar` "Download CV" `href` is `/Mennatullah_Mohamed-CV.pdf` with `download` attribute, visible after scrolling to bottom.
- [ ] **Step 2: Write failing e2e** `no-overflow.spec.ts`: for `/en/` and `/ar/` at 360×740, `document.documentElement.scrollWidth <= 360` (runs again after Task 4/5 add content — keep it as a permanent test).
- [ ] **Step 3:** `npm run e2e -- shell no-overflow` → FAIL.
- [ ] **Step 4:** Implement. Use logical CSS (`ms-/me-/ps-/pe-/start/end` Tailwind utilities) so RTL flips the sidebar to the right automatically. Load `frontend-design` skill for visual quality before styling.
- [ ] **Step 5:** `npm run e2e` → PASS.
- [ ] **Step 6:** Commit `feat: editor chrome, file-tree navigation and language toggle`.

### Task 4: Sections — Hero, About, Experience, Skills, Certificates, Contact

**Files:**
- Create: `src/components/sections/{Hero,About,Experience,Skills,Certificates,Contact}.tsx`, `src/components/code/{CodeLine,Token,TypeWriter,Reveal}.tsx`, `e2e/sections.spec.ts`, `src/components/code/TypeWriter.test.tsx` (vitest + `@testing-library/react`, `jsdom`)

**Interfaces:**
- Consumes: `profile`, `getDictionary`, `sections`, theme tokens.
- Produces `<Token kind="keyword|string|number|prop|comment|punct">`; `<CodeLine>` (always `dir="ltr"`); `<TypeWriter text: string; speedMs?: number />` that renders the **full text in server HTML** (visually-hidden full copy for SR + animated visible copy) and skips animation when `matchMedia('(prefers-reduced-motion: reduce)').matches`; `<Reveal>` wrapper using `motion` `whileInView` whose initial state is visible when reduced-motion or before hydration (animate via `opacity` from 1 using `initial={false}` fallback).
- Section designs: Hero = `const developer = {...}` object (name, role from `profile.title`, stack, `experience: 4+`, `openToWork: true`) + availability pill + CTAs (Contact, Download CV, View projects) + `$ npm run hire-me_` blinking cursor. About = `about.ts` comment-block bio + soft skills. Experience = `git log` style (commit hash-like short id, dates, company, role, bullets). Skills = `skills.json` grouped object with tag chips. Certificates = markdown list with links (`target=_blank rel=noopener`). Contact = `contact.sh` lines `$ mail …`, `$ open linkedin …`, `$ whatsapp …`, `$ curl -O cv.pdf` each as real links/buttons.
- Every section has a plain `<h2>` (dict section title) + one-sentence plain summary beside the code styling.

- [ ] **Step 1: Write failing tests** (Task 4 only: first `npm i -D @testing-library/react jsdom` and set vitest `environment: "jsdom"` for `*.test.tsx`):
  - `TypeWriter.test.tsx`: with reduced motion mocked true, full `text` is in the DOM immediately; with false, the accessible (sr-only) copy contains full text at t=0.
  - `sections.spec.ts`: raw HTML of `out/en/index.html` (read via `fs`) contains `Mennatullah Mohamed`, `Frontend Web Developer`, and every EN section `<h2>`; same for `out/ar/index.html` with AR headings. Using `page.emulateMedia({ reducedMotion: 'reduce' })` on `/en/`, hero name is visible with opacity 1 without waiting. On `/ar/`, the email link has `dir="ltr"` and text exactly `menna.tullah5112@gmail.com`. WhatsApp link href is `https://wa.me/201149533878`. Experience lists 4 entries, first contains `Azm Squad`.
- [ ] **Step 2:** Run `npm test` and `npm run e2e -- sections` → FAIL.
- [ ] **Step 3:** Implement components (Latin tokens inside Arabic prose wrapped in `<bdi>`).
- [ ] **Step 4:** `npm test && npm run e2e` → PASS (including `no-overflow`).
- [ ] **Step 5:** Commit `feat: hero, about, experience, skills, certificates, contact sections`.

### Task 5: Projects section with screenshots and private-project illustrations

**Files:**
- Create: `scripts/capture-screenshots.ts` (Playwright, run via `npx tsx`), `public/projects/{azm,tasel,tanafos,bidxsell,ipTracker}.webp`, `src/components/sections/Projects.tsx`, `src/components/projects/{BrowserFrame,ProjectCard,PrivateIllustration,MinorList}.tsx`, `e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `profile.projects`, `dict.projects`, `dict.privateBadge`, `dict.liveLabel`.
- `capture-screenshots.ts`: for each project with `url`, open at 1440×900, wait `networkidle` (timeout 30s, on failure log and continue), dismiss nothing, screenshot viewport as PNG, convert to WebP quality 80 width 1200 (use `sharp`, dev dep). npm script `screenshots`.
- `PrivateIllustration` = per-project inline SVG in theme colours (Sahl: phone frame + dashboard bars; Boulevard: map pin + QR grid; ML Dashboard: chart lines). No real screenshots.

- [ ] **Step 1:** `npm i -D sharp tsx`; add script `"screenshots": "tsx scripts/capture-screenshots.ts"`; run `npm run screenshots`; verify 5 files exist and each is < 250 KB. Commit images.
- [ ] **Step 2: Write failing e2e** `projects.spec.ts`: on `/en/#projects`, featured cards appear in order AZM, Tasel, Tanafos, BidxSell; each has an `<img>` with non-empty `alt`, and a "Live ↗" link with `target="_blank"` and `rel` containing `noopener` pointing to the exact URL; three cards carry the private badge text and contain no `<img>`; Sahl and Boulevard cards contain `STC`; minor list includes IP Address Tracker linking to its URL. Page text does not match `/senior/i`.
- [ ] **Step 3:** `npm run e2e -- projects` → FAIL.
- [ ] **Step 4:** Implement (`BrowserFrame` = mini window with URL bar showing the domain; images `loading="lazy"` with explicit width/height).
- [ ] **Step 5:** `npm run e2e` → PASS (incl. `no-overflow` both locales).
- [ ] **Step 6:** Commit `feat: projects section with live screenshots and private case cards`.

### Task 6: SEO, social preview, Lighthouse, Cloudflare deploy

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/[locale]/opengraph-image.tsx` (static, `dynamic = 'force-static'`, 1200×630 terminal-style card with name + "Frontend Web Developer"), `src/components/seo/JsonLd.tsx`, `e2e/seo.spec.ts`, `README.md` (dev + deploy instructions)
- Modify: `src/app/[locale]/layout.tsx` (`generateMetadata`)

**Interfaces:**
- `generateMetadata({params})` → `title: dict.meta.title`, `description`, `metadataBase` from `process.env.SITE_URL ?? 'https://mennatullah-portfolio.pages.dev'`, `alternates.languages: { en: '/en/', ar: '/ar/', 'x-default': '/en/' }`, `openGraph` locale `en_US` / `ar_SA`.
- `JsonLd`: `Person` with `name`, `jobTitle: 'Frontend Web Developer'`, `email`, `sameAs: [linkedin, github]`, `address.addressLocality: 'Giza'`.

- [ ] **Step 1: Write failing e2e** `seo.spec.ts`: each locale has `<title>` non-empty, `meta[name=description]`, `link[rel=alternate][hreflang=ar]` and `[hreflang=en]`, `meta[property="og:image"]` whose URL returns 200 `image/png`; JSON-LD parses and `jobTitle === 'Frontend Web Developer'`; `/sitemap.xml` lists both locale URLs; `/robots.txt` returns 200.
- [ ] **Step 2:** `npm run e2e -- seo` → FAIL. **Step 3:** implement. **Step 4:** `npm run e2e` → all PASS.
- [ ] **Step 5: Lighthouse:** with `npm run preview` running, `npx lighthouse http://localhost:4173/en/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lh-en.json --chrome-flags="--headless"` and same for `/ar/`. Expected: every category score ≥ 0.95. Fix and re-run until met. Don't commit the JSON.
- [ ] **Step 6:** `README.md`: Cloudflare Pages settings — framework preset *Next.js (Static HTML Export)*, build command `npm run build`, output dir `out`, env `NODE_VERSION=22`, `SITE_URL=<final url>`; alternative CLI `npx wrangler pages deploy out --project-name mennatullah-portfolio`.
- [ ] **Step 7:** Commit `feat: SEO metadata, OG image, sitemap and deploy docs`.
