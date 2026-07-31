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

console.log('postbuild:')
prerendered.forEach((l) => console.log('  prerendered', l))
console.log(`  sitemap.xml   ${Object.keys(routes).length} urls`)
console.log(`  robots.txt    sitemap -> ${SITE_URL}/sitemap.xml`)
