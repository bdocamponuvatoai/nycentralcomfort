# Deployment — NY Central Comfort

## 1. Before the first push

- `npm run check` passes locally (format, lint, types, unit tests, build).
- `npm run test:e2e` passes (needs `npx playwright install` once).
- Only `.env.example` is tracked. No secrets in the repo history.

## 2. GitHub

```bash
git init && git add -A && git commit -m "NY Central Comfort website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

CI (`.github/workflows/ci.yml`) runs on every push and pull request: audit → format → lint → types → unit
→ build → Playwright (Chrome, Firefox, Safari, Pixel 7, iPhone 14).

## 3. Vercel

1. Vercel → Add New Project → import the repo. Next.js is detected automatically.
2. Environment variables (Production + Preview):

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://nycentralcomfort.net` |
| `RESEND_API_KEY` | from resend.com |
| `INQUIRY_FROM_EMAIL` | `NY Central Comfort <website@nycentralcomfort.net>` |
| `INQUIRY_TO_EMAIL` | `info@nycentralcomfort.net` |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | optional: Upstash Redis via Vercel Marketplace (`KV_REST_API_*` also works) |

3. Enable **Web Analytics** and **Speed Insights** in the project (scripts load in production only).

## 4. Domain and SEO migration (keep the current rankings)

1. Add `nycentralcomfort.net` and `www.nycentralcomfort.net` in Vercel → Domains. Set the apex as primary so
   `www` redirects to it.
2. Update DNS at the registrar as Vercel instructs. HTTPS is issued automatically.
3. Old URLs are already redirected permanently in `next.config.ts`:

| Old URL | New URL |
| --- | --- |
| `/index.html` | `/` |
| `/about.html` | `/about` |
| `/service.html` | `/services` |
| `/contact.html` | `/contact` |
| `/gallery.html` | `/gallery` |
| `/img/*`, `/audio/*` | `/gallery`, `/services` |

4. Google Search Console: verify the domain, submit `https://nycentralcomfort.net/sitemap.xml`, then use
   URL Inspection on the home page and a service page. Watch Coverage for 404s for two weeks.
5. Bing Webmaster Tools: import from Search Console.
6. Google Business Profile: make sure the name, address (1870 W 3rd St, Brooklyn, NY 11223), phone
   ((646) 509-9678) and website match the site exactly.

## 5. Email (Resend)

1. Add the domain `nycentralcomfort.net` in Resend and create the SPF and DKIM DNS records it lists.
2. Wait until it shows **Verified**, then set `RESEND_API_KEY`.
3. Send a real test from the live contact page and confirm it arrives at info@nycentralcomfort.net.
   Until then the form honestly tells visitors it is not connected and shows the phone number.

## 6. Environment behaviour

| | Local | Preview | Production |
| --- | --- | --- | --- |
| Indexing | n/a | blocked (`robots.txt` disallow + `noindex`) | allowed |
| Analytics | off | off | on |
| Rate limit | memory | Redis if set | Redis if set |
| Form email | not connected unless `.env.local` | real if keys set | real |

## 7. Rollback

Vercel → Deployments → pick the last good one → **Promote to Production**.

## 8. Pre-launch checklist

- [ ] Client approved FAQ answers, "How it works" steps and the 24/7 line.
- [ ] Permission to name "NYC Muslim School" in the Gallery.
- [ ] Privacy and Terms replaced with reviewed copy (remove `noindex` in `app/privacy` and `app/terms`).
- [ ] Original vector logo swapped in (`LogoMark` in `components/ui.tsx`, then `npm run icons`).
- [ ] Production form test email received.
- [ ] Search Console sitemap submitted, no crawl errors.
