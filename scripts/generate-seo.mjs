/**
 * Prebuild step: rewrites the marked <head> block in index.html from
 * src/config/site.js, so the committed HTML always matches the config.
 * Runs automatically via the `prebuild` npm hook.
 */
import fs from 'node:fs'
import { routes } from '../src/config/site.js'
import { replaceHead } from './seo-head.mjs'

const FILE = 'index.html'
const before = fs.readFileSync(FILE, 'utf8')
const after = replaceHead(before, routes['/'])

if (before === after) {
  console.log('seo: index.html already up to date')
} else {
  fs.writeFileSync(FILE, after)
  console.log('seo: index.html head regenerated from src/config/site.js')
}
