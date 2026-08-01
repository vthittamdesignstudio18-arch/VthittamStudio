# V Thittam Design Studio — Website

Marketing website for **V Thittam Design Studio**, an architecture, interior design and
construction studio based in **Tiruchirappalli (Trichy), Tamil Nadu**.

## Tech Stack

- **React 18** + **Vite 5** — single-page app, two content routes plus a 404 view
- **Tailwind CSS 3** — all styling; design tokens live in `tailwind.config.js`
- **Framer Motion 11** — accordions, the lightbox and the testimonial rotation.
  Wrapped in `<MotionConfig reducedMotion="user">` so every animation honours the
  operating system's reduce-motion setting.
- **Lucide React** — icons
- No router library. `src/lib/router.jsx` is a ~120-line History API router exposing the
  slice of the react-router API the app uses, with identical call signatures.

There is **no scroll-driven motion anywhere on the site**. The hero plays a single opening
sequence on load and is then completely static.

## Getting Started

```bash
npm install
cp .env.example .env      # then paste your Web3Forms key in
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | **Yes** | Delivers quote-form submissions to the studio inbox. Get one at https://web3forms.com/. |

> **Production deploys.** Vite inlines this value **at build time**. A `.env` file on a
> developer's machine has no effect on the deployed site — the key must be set in the
> host's environment variables (Vercel: *Settings → Environment Variables → Production*)
> and the site **redeployed** afterwards. `scripts/postbuild.mjs` fails any CI or Vercel
> build where the key is missing, so a misconfigured deploy cannot silently ship a form
> that discards every enquiry.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `prebuild` regenerates the SEO block in `index.html`, Vite builds, then `postbuild` runs |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run verify` | Production-readiness check — parses every source file, resolves imports, confirms every responsive image variant exists, audits headings, alt text, CLS-safe dimensions, structured data and metadata lengths. Exits non-zero on any error. |

`npm run build` runs three steps in order:

1. **prebuild** (`scripts/generate-seo.mjs`) — writes the home page's `<head>` block into
   `index.html` from `src/config/site.js`, so the checked-in file can never drift.
2. **build** — Vite.
3. **postbuild** (`scripts/postbuild.mjs`) — checks the Web3Forms key is present,
   prerenders `/quote` and `/privacy` with their own metadata for crawlers that don't run
   JavaScript, generates `sitemap.xml` and `robots.txt`, and strips OS junk from `dist/`.

## Changing the domain

`SITE_URL` in `src/config/site.js` is the single source of truth. Canonicals, Open Graph
URLs, JSON-LD `@id`s, the sitemap and robots.txt all derive from it. **Change it there and
nowhere else** — and do so before the site is submitted to Search Console, since migrating
after indexing begins costs authority.

## Project Structure

```
src/
  components/
    construction/   hero photo sequence + stage captions
    layout/         Navbar, Footer, ScrollToTop
    sections/       the twelve home-page sections
    ui/             Button, Container, Logo, ResponsiveImage, form fields …
  config/site.js    business details (NAP), per-route metadata, JSON-LD graph
  data/             content, services, packages, projects, quote-form schema
  hooks/            active section, section navigation, document meta, scroll lock
  lib/              router, quote submission, quote validation, motion preference
  pages/            HomePage, QuotePage, PrivacyPolicy, NotFound
scripts/            SEO generation, postbuild, verification
public/             images, brand marks, host config
```

## Deployment

Configured for **Vercel** (`vercel.json`): SPA rewrites, long-lived immutable caching on
fingerprinted `/assets/*`, and a baseline security-header set.

`public/.htaccess` (Apache/cPanel) and `public/_redirects` (Netlify) are kept deliberately
so the same build can be dropped on either host without changes. They are inert on Vercel
and cost ~1.2 KB. Delete them if those targets are never going to be used.

## Accessibility notes

Worth knowing before making changes:

- Every section carries `aria-labelledby` pointing at its own heading.
- The lightbox traps focus and returns it to the element that opened it.
- The testimonial rotation pauses on hover and on focus, has an explicit pause control,
  and does not auto-rotate at all under reduced motion — WCAG 2.2.2.
- Small controls (carousel dots) keep a 24×24 CSS px hit area regardless of visual size —
  WCAG 2.5.8.
- `scroll-padding-top` on `<html>` keeps anchored sections clear of the fixed navbar.
  Don't reintroduce per-component scroll offsets.
- Colour choices in `index.css` carry their measured contrast ratios in comments. Keep
  them updated if you change a colour.
