# NY Central Comfort — website

Warm, light marketing site for NY Central Comfort (HVAC, New York City).
Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript strict. Built from the Website Blueprint with the
light-only overrides in `docs/asset-prompts.md` (section 6). Deployment steps: `docs/DEPLOYMENT.md`.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000 (live reload while editing)
npm run build        # production build
npm run start        # serve the production build (restart after every build)
```

## Where things live

| Path | What |
| --- | --- |
| `content/site.ts` | Brand, contact, hero, about, values (verbatim from nycentralcomfort.net) |
| `content/services.ts` | The six services (descriptions verbatim) |
| `content/projects.ts` | The three real projects for the Gallery |
| `content/faq.ts`, `content/process.ts` | FAQ and "How it works", written only from facts on the current site |
| `content/assets.ts` | Every image and its alt text |
| `app/globals.css` | Design tokens (ivory, stone, navy ink, brand orange #FF800F), components, motion |
| `components/` | Header, footer, mobile call bar, sections, form, gallery lightbox |
| `app/actions/inquiry.ts` | Quote form server action (Resend) |
| `lib/` | Validation schema, inquiry service, rate limiter, SEO / JSON-LD helpers |
| `assets-src/` | Full-size masters (generated + client photos). Not served. |
| `media/` | Optimised WebP built from `assets-src/` |
| `tests/unit`, `tests/e2e` | Node unit tests, Playwright end-to-end tests |
| `docs/DEPLOYMENT.md` | GitHub, Vercel, domain, SEO migration, email setup, launch checklist |

## Images

All 27 generated images and 21 of the client's real project photos are in use.

1. Save a new or replacement master as `assets-src/<name>.png` (names from `docs/asset-prompts.md`).
2. Run `npm run media` (converts only new or changed files into `media/<name>.webp`).
3. Import it in `content/assets.ts` with alt text that describes the actual photo.

Unused originals live in `assets-src/archive/` and are skipped. Masters are stored with **Git LFS**
(run `git lfs install` once before cloning); `*.original.*` duplicates are not committed. The build only
needs `media/`, so Vercel does not have to fetch LFS files.

## Quote form

Works with and without JavaScript. It reports success only when Resend confirms delivery; otherwise it
tells the visitor honestly and shows the phone number. Variables are listed in `.env.example`.

## Quality checks

| Command | What it does |
| --- | --- |
| `npm run check` | Format, lint, types, unit tests, production build |
| `npm run test:e2e` | Playwright on 5 browsers/devices: routes, axe WCAG 2.2 AA, redirects, SEO, headers, form |
| `npm run check:all` | Both of the above (what CI runs) |
| `npm run audit -- <dir> / /about` | Screenshots, axe and overflow check against a running server (`BASE=...`) |

## SEO, AEO and GEO

- Unique title, description, canonical and Open Graph per page, plus a generated share image.
- JSON-LD: `HVACBusiness` (address, phone, services), `WebSite`, page types with `speakable`, a `Service`
  per offering, `BreadcrumbList`, `FAQPage`, and the gallery as an `ItemList` of projects with photos.
- `sitemap.xml` with image entries, `robots.txt` welcoming search and AI crawlers (previews blocked), and
  `llms.txt` generated from the same content files.
- Old `.html` URLs from the previous site redirect permanently (table in `docs/DEPLOYMENT.md`).

## Security

- Headers: CSP, HSTS, frame denial, nosniff, COOP/CORP, Permissions-Policy, no `X-Powered-By`.
- Form: server-side zod validation, honeypot, time trap, rate limit (Upstash Redis or in-memory), no line
  breaks in the name (email header injection), HTML-escaped email body, honest failure messages.
  Server Actions only accept same-origin requests (Next.js).
- `npm audit --omit=dev`: 0 vulnerabilities in production dependencies.

## Before launch — confirm with the client

- 24/7 availability (used in the contact section, from their current Contact page).
- FAQ answers and "How it works" steps.
- Permission to name "NYC Muslim School" in the Gallery.
- Licences or certifications to name, and social media links (none are shown yet).
- Replace the draft Privacy and Terms pages with reviewed copy (they are `noindex` until then).
- Logo: the house mark is redrawn as SVG from the small PNG; swap in the original vector if available.
