# Mennatullah Mohamed — Portfolio

Bilingual (English / العربية, full RTL) developer portfolio styled as a code editor.
Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · IBM Plex fonts.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000/en/  (note: "/" redirect only works in the exported build)
```

## Edit content

All text lives in data files — no component changes needed:

| What | File |
| --- | --- |
| Contact links, jobs, projects, skills, certificates | `src/content/profile.ts` |
| English copy | `src/i18n/en.ts` |
| Arabic copy | `src/i18n/ar.ts` |
| CV download | `public/Mennatullah_Mohamed-CV.pdf` (replace the file, keep the name) |
| Project screenshots | `npm run screenshots` (re-captures the live sites into `public/projects/`) |

The English and Arabic files must have the same keys — `npm test` checks this.

## Test

```bash
npm test             # unit tests (content + dictionaries + typewriter)
npm run e2e          # builds, serves out/ on :4173 and runs Playwright (routing, RTL, mobile, a11y, SEO)
```

## Build

```bash
npm run build        # static site in out/
npm run preview      # serve out/ on http://localhost:4173
```

## Deploy to Cloudflare

`wrangler.jsonc` deploys the static export (`out/`) as **Workers static assets** — no server, no OpenNext.

### Connected Git repo (current setup)

Cloudflare dashboard → Workers & Pages → your project → Settings → Build:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Variables: `SITE_URL` = your final URL (e.g. `https://portfolio-menna.<subdomain>.workers.dev`) — used for canonical links, sitemap and the link-preview image

Every push to `master` rebuilds and redeploys.

### From your machine

```bash
npx wrangler login   # once
npm run deploy       # build + wrangler deploy
```

### Check locally on the Workers runtime

```bash
npm run build && npx wrangler dev --port 8787
BASE_URL=http://localhost:8787 npx playwright test
```

### Custom domain

Worker → Settings → Domains & Routes → Add → Custom domain, then update `SITE_URL` and redeploy.

## Structure

```
src/app/[locale]/        page + layout (lang/dir, fonts, metadata) for /en/ and /ar/
src/app/og.png/          1200×630 link-preview image (LinkedIn, WhatsApp)
src/app/sitemap.ts       sitemap.xml · robots.ts → robots.txt
src/components/shell/    editor chrome: title bar, file tree, mobile drawer, status bar, language toggle
src/components/sections/ hero, about, experience, projects, skills, certificates, contact
public/index.html        "/" → "/en/" redirect
```
