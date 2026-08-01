/**
 * Postbuild step. Three jobs, all derived from src/config/site.js:
 *
 *   1. Prerender /quote — Facebook, WhatsApp, LinkedIn and X do not execute
 *      JavaScript, so a single-page app serves them one identical <head> for
 *      every URL. Copying dist/index.html to dist/quote/index.html with the
 *      quote route's metadata swapped in gives crawlers real per-page HTML
 *      while the client router still takes over for human visitors.
 *
 *   2. sitemap.xml — every indexable route, with the canonical host.
 *
 *   3. robots.txt — pointing at that sitemap.
 *
 * Runs automatically via the `postbuild` npm hook. No dependencies.
 */
import fs from 'node:fs'
import path from 'node:path'
import { SITE_URL, absolute, routes } from '../src/config/site.js'
import { replaceHead } from './seo-head.mjs'

const DIST = 'dist'
const indexPath = path.join(DIST, 'index.html')

if (!fs.existsSync(indexPath)) {
  console.error('postbuild: dist/index.html missing — did vite build run?')
  process.exit(1)
}

const shell = fs.readFileSync(indexPath, 'utf8')

// ── 0. deploy sanity check
// Vite inlines VITE_WEB3FORMS_KEY at build time. Without it the quote form —
// the site's only lead-capture route — returns a generic apology for every
// submission and logs the real cause to a console nobody reads. A local build
// is allowed to proceed with a warning; a CI or Vercel build is not, so a
// misconfigured deploy can never reach production silently.
if (!process.env.VITE_WEB3FORMS_KEY) {
  const message =
    'VITE_WEB3FORMS_KEY is not set — the quote form will not deliver. ' +
    'Set it in the host environment (Vercel: Settings → Environment Variables) and redeploy.'
  if (process.env.CI || process.env.VERCEL) {
    console.error(`postbuild: ${message}`)
    process.exit(1)
  }
  console.warn(`postbuild: warning — ${message}`)
}

// ── 1. prerender every route except "/" (which is dist/index.html already)
const prerendered = []
for (const route of Object.values(routes)) {
  if (route.path === '/') continue
  const dir = path.join(DIST, route.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), replaceHead(shell, route))
  prerendered.push(`${route.path} -> ${path.join(dir, 'index.html')}`)
}

// ── 2. sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const urls = Object.values(routes)
  .map(
    (r) => `  <url>
    <loc>${absolute(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
)

// ── 3. robots.txt
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `# ${SITE_URL}
User-agent: *
Allow: /

# No admin, auth or search pages exist on this site, so nothing is disallowed.

Sitemap: ${SITE_URL}/sitemap.xml
`
)

// ── 4. strip OS junk that Vite copies verbatim out of public/
// Deleting these from the working tree is pointless: macOS writes .DS_Store
// back the moment a folder is opened in Finder. Removing them from dist on
// every build is the only fix that stays fixed.
let junk = 0
;(function sweep(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) sweep(full)
    else if (entry.name === '.DS_Store' || entry.name === 'Thumbs.db') {
      fs.rmSync(full)
      junk++
    }
  }
})(DIST)

console.log('postbuild:')
prerendered.forEach((l) => console.log('  prerendered', l))
console.log(`  sitemap.xml   ${Object.keys(routes).length} urls`)
console.log(`  robots.txt    sitemap -> ${SITE_URL}/sitemap.xml`)
console.log(`  junk removed  ${junk} file(s)`)
