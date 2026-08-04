/**
 * Prebuild step: rewrites the marked <head> block in index.html from
 * src/config/site.js, so the committed HTML always matches the config.
 * Runs automatically via the `prebuild` npm hook.
 */
import fs from 'node:fs'
import { routes, SITE_URL } from '../src/config/site.js'
import { replaceHead } from './seo-head.mjs'

// A bare hostname here (no scheme) yields relative canonicals and og:url
// values, which Google ignores and every social scraper rejects. It is a
// silent failure at runtime, so it is a loud one at build time instead.
if (!/^https:\/\/[^/]+$/.test(SITE_URL)) {
  console.error(
    `seo: SITE_URL must be an absolute https origin with no trailing slash.\n` +
    `     got: ${JSON.stringify(SITE_URL)}\n` +
    `     fix: src/config/site.js`
  )
  process.exit(1)
}

const FILE = 'index.html'
const before = fs.readFileSync(FILE, 'utf8')
const after = replaceHead(before, routes['/'])

if (before === after) {
  console.log('seo: index.html already up to date')
} else {
  fs.writeFileSync(FILE, after)
  console.log('seo: index.html head regenerated from src/config/site.js')
}
