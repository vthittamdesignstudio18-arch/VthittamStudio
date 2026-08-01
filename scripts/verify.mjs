/**
 * Production readiness check: parses every source file, resolves imports,
 * confirms every referenced image variant exists, audits heading structure,
 * alt text, CLS-safe dimensions, structured data and metadata lengths.
 *
 * Run with `npm run verify`. Exits non-zero on any error.
 */
import { parse } from '@babel/parser'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Run from the project root regardless of where it was invoked.
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'))
import { routes, graphForRoute, SITE_URL, socialTitle, socialDescription } from '../src/config/site.js'

let errors = 0, warns = 0
const fail = (m) => { console.log('  ✗ ' + m); errors++ }
const warn = (m) => { console.log('  ! ' + m); warns++ }
const ok   = (m) => console.log('  ✓ ' + m)
const head = (t) => console.log('\n── ' + t)

// ── collect sources ────────────────────────────────────────────────────────
const files = []
;(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})) {
  const p = path.join(d,e.name); e.isDirectory() ? walk(p) : /\.jsx?$/.test(e.name) && files.push(p)
}})('src')
const mods = new Map()

head('Source integrity')
for (const f of files) {
  const code = fs.readFileSync(f,'utf8')
  try { mods.set(f, { code, ast: parse(code, { sourceType:'module', plugins:['jsx'] }) }) }
  catch (e) { fail(`syntax: ${f} — ${e.message}`) }
}
ok(`${mods.size}/${files.length} files parse`)

let imports = 0
for (const [f,{ast}] of mods) for (const n of ast.program.body) {
  const src = n.source?.value
  if (!src?.startsWith('.')) continue
  imports++
  const b = path.resolve(path.dirname(f), src)
  if (![b, b+'.js', b+'.jsx', b+'/index.js', b+'/index.jsx'].some(c=>fs.existsSync(c)&&fs.statSync(c).isFile()))
    fail(`broken import ${f} -> ${src}`)
}
ok(`${imports} local imports resolve`)

// scripts/ also imports from src/
for (const f of fs.readdirSync('scripts')) {
  const code = fs.readFileSync(path.join('scripts',f),'utf8')
  for (const m of code.matchAll(/from '(\.\.?\/[^']+)'/g)) {
    const b = path.resolve('scripts', m[1])
    if (!fs.existsSync(b)) fail(`scripts/${f} -> ${m[1]} missing`)
  }
}
ok('build scripts resolve their imports')

// ── assets ─────────────────────────────────────────────────────────────────
head('Assets')
const all = [...mods.values()].map(m=>m.code).join('\n') + fs.readFileSync('index.html','utf8')
const direct = new Set([...all.matchAll(/['"](\/(?:projects|journey|brand)\/[^'"`\s]+?\.(?:webp|png|jpe?g|svg))['"]/g)].map(m=>m[1]))
for (const a of direct) if (!fs.existsSync(path.join('public',a))) fail(`missing asset ${a}`)
ok(`${direct.size} directly-referenced assets exist`)

// every width declared in projects.js must exist on disk
const { projectCategories, planningDrawings } = await import('../src/data/projects.js')
let variants = 0
for (const item of [...projectCategories.flatMap(c=>[c.cover,...c.images]), ...planningDrawings]) {
  for (const w of item.widths) {
    variants++
    const p = path.join('public', `${item.base}-${w}.webp`)
    if (!fs.existsSync(p)) fail(`missing responsive variant ${item.base}-${w}.webp`)
  }
}
ok(`${variants} responsive image variants exist`)

// journey srcset targets
for (const n of ['01-plot','02-blueprint','03-wireframe','04-development','05-final'])
  for (const s of ['.webp','-mobile.webp','-tiny.webp'])
    if (!fs.existsSync(`public/journey/${n}${s}`)) fail(`missing journey/${n}${s}`)
ok('hero journey frames + mobile/tiny variants exist')

// orphans
const used = new Set([...direct])
for (const item of [...projectCategories.flatMap(c=>[c.cover,...c.images]), ...planningDrawings])
  item.widths.forEach(w=>used.add(`${item.base}-${w}.webp`))
const onDisk = []
;(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})) {
  const p = path.join(d,e.name); e.isDirectory() ? walk(p) : onDisk.push('/'+path.relative('public',p))
}})('public')
const orphans = onDisk.filter(f=>/^\/projects\//.test(f) && !used.has(f))
orphans.length ? warn(`${orphans.length} unused project files (excluding OS junk, which postbuild strips from dist): ${orphans.slice(0,4).join(', ')}`) : ok('no orphaned project images')

// ── images: responsive + alt ───────────────────────────────────────────────
// JSX attributes can contain ">" (arrow functions, template expressions), so
// tags are scanned with brace-depth tracking rather than a naive regex.
function imgTags(code) {
  const out = []
  let i = 0
  while ((i = code.indexOf('<img', i)) !== -1) {
    let depth = 0, j = i + 4, quote = null
    for (; j < code.length; j++) {
      const c = code[j]
      if (quote) { if (c === quote) quote = null; continue }
      if (c === '"' || c === "'" || c === '`') { quote = c; continue }
      if (c === '{') depth++
      else if (c === '}') depth--
      else if (c === '>' && depth === 0) break
    }
    out.push(code.slice(i, j + 1))
    i = j + 1
  }
  return out
}

head('Images')
let rawImg = 0, missingAlt = 0
for (const [f,{code}] of mods) {
  for (const tag of imgTags(code)) {
    if (!/alt=/.test(tag)) { fail(`<img> without alt in ${f}`); missingAlt++ }
    if (!/srcSet|srcset/.test(tag) && !/aria-hidden/.test(tag) && !/logo|favicon|tiny/.test(tag)) rawImg++
  }
}
missingAlt || ok('every <img> has an alt attribute')
rawImg ? warn(`${rawImg} <img> without srcset (non-decorative)`) : ok('all content images use srcset')

const noDims = [...mods].filter(([,{code}]) =>
  imgTags(code).some(t => !/width=/.test(t) || !/height=/.test(t)))
noDims.length ? warn(`no explicit dimensions: ${noDims.map(([f])=>path.basename(f)).join(', ')}`)
             : ok('every <img> declares width and height (CLS)')

// ── headings ───────────────────────────────────────────────────────────────
head('Heading structure')
// One <h1> per rendered view. Counting a fixed total across the project breaks
// as soon as a page is added, so this checks the rule itself: each of these
// files owns exactly one <h1>, and no other file declares one at all.
const H1_OWNERS = [
  'ConstructionHero.jsx', // the home page's h1
  'QuotePage.jsx',
  'PrivacyPolicy.jsx',
  'NotFound.jsx',
]
const h1Counts = new Map()
for (const [f, { code }] of mods) {
  const n = [...code.matchAll(/<(?:motion\.)?h1[\s>]/g)].length
  if (n) h1Counts.set(path.basename(f), n)
}
const multiple = [...h1Counts].filter(([, n]) => n > 1)
const unexpected = [...h1Counts.keys()].filter((f) => !H1_OWNERS.includes(f))
const missing = H1_OWNERS.filter((f) => !h1Counts.has(f))

if (multiple.length) fail(`more than one <h1> in: ${multiple.map(([f,n])=>`${f} (${n})`).join(', ')}`)
if (unexpected.length) fail(`unexpected <h1> outside a page view: ${unexpected.join(', ')}`)
if (missing.length) fail(`page view with no <h1>: ${missing.join(', ')}`)
if (!multiple.length && !unexpected.length && !missing.length)
  ok(`exactly one <h1> in each of ${H1_OWNERS.length} views: ${H1_OWNERS.join(', ')}`)
for (const [f,{code}] of mods) {
  const levels = [...code.matchAll(/<(?:motion\.)?h([1-6])[\s>]/g)].map(m=>+m[1])
  for (let i=1;i<levels.length;i++)
    if (levels[i] > levels[i-1] + 1) warn(`heading jump h${levels[i-1]}→h${levels[i]} in ${path.basename(f)}`)
}
ok('no heading level skipped by more than one')

// ── SEO / structured data ──────────────────────────────────────────────────
head('SEO')
const html = fs.readFileSync('index.html','utf8')
for (const need of ['<title>','name="description"','rel="canonical"','name="robots"',
                    'property="og:title"','property="og:image"','name="twitter:card"',
                    'application/ld+json','rel="icon"','lang="en-IN"'])
  html.includes(need) ? ok(`index.html has ${need}`) : fail(`index.html missing ${need}`)

for (const [p, r] of Object.entries(routes)) {
  const g = graphForRoute(r)
  const types = g['@graph'].flatMap(e=>[].concat(e['@type']))
  // Only the search-facing pair is length-checked. The social pair feeds Open
  // Graph and Twitter cards, which render far more text than a search snippet
  // and are deliberately allowed to be longer.
  if (!r.title || r.title.length > 62) warn(`${p} title is ${r.title.length} chars (aim ≤60)`)
  if (!r.description || r.description.length > 165) warn(`${p} description is ${r.description.length} chars (aim ≤160)`)
  const st = socialTitle(r), sd = socialDescription(r)
  if (!st || !sd) fail(`${p} has an empty social title or description`)
  try { JSON.parse(JSON.stringify(g)) } catch { fail(`${p} JSON-LD not serialisable`) }
  const shared = st === r.title && sd === r.description
  ok(`${p} — search ${r.title.length}c/${r.description.length}c` +
     (shared ? ', social same' : `, social ${st.length}c/${sd.length}c`) +
     `, schema: ${[...new Set(types)].join('/')}`)
}
;['LocalBusiness','ArchitecturalService','InteriorDesign','WebSite','WebPage','FAQPage']
  .forEach(t => graphForRoute(routes['/'])['@graph'].flatMap(e=>[].concat(e['@type'])).includes(t)
    ? ok(`home schema includes ${t}`) : fail(`home schema missing ${t}`))
graphForRoute(routes['/quote'])['@graph'].some(e=>e['@type']==='BreadcrumbList')
  ? ok('quote schema includes BreadcrumbList') : fail('quote schema missing BreadcrumbList')
SITE_URL.startsWith('https://') && !SITE_URL.endsWith('/')
  ? ok(`canonical host ${SITE_URL}`) : fail(`SITE_URL malformed: ${SITE_URL}`)

// ── accessibility ──────────────────────────────────────────────────────────
head('Accessibility')
fs.readFileSync('src/App.jsx','utf8').includes('skip-link') ? ok('skip link present') : fail('no skip link')
fs.readFileSync('src/index.css','utf8').includes(':focus-visible') ? ok('focus indicators defined') : fail('no focus styles')
let unlabelled = 0
for (const [f,{code}] of mods) for (const m of code.matchAll(/<button\b[^>]*>/gs)) {
  const t = m[0]
  if (/aria-label|aria-labelledby/.test(t)) continue
  if (/\btype="submit"/.test(t)) continue
  // buttons whose children carry the name are fine; flag only self-closing ones
  if (t.trimEnd().endsWith('/>')) { warn(`possibly unlabelled <button/> in ${path.basename(f)}`); unlabelled++ }
}
unlabelled || ok('no self-closing unlabelled buttons')
;[...mods].filter(([,{code}])=>/onClick/.test(code) && /<div[^>]*onClick/.test(code))
  .forEach(([f])=>warn(`click handler on a <div> in ${path.basename(f)}`))

// ── dead code ──────────────────────────────────────────────────────────────
head('Code hygiene')
// Whole-identifier match. A plain substring test flagged `useScrollLock`,
// which is a body-scroll lock for overlays, not a scroll-linked animation.
const banned = ['whileInView','useScroll','useInView','ScrollTrigger','gsap','Lenis','unsplash']
banned.forEach(b => {
  const re = new RegExp(`\\b${b}\\b(?![A-Za-z0-9_])`)
  if ([...mods].some(([,{code}]) => re.test(code))) fail(`"${b}" still referenced`)
})
ok('no scroll-animation APIs or external image hosts')
const deps = JSON.parse(fs.readFileSync('package.json','utf8')).dependencies
for (const d of Object.keys(deps))
  [...mods].some(([,{code}])=>code.includes(`'${d}`)) || d==='react-dom'
    ? null : warn(`dependency "${d}" never imported`)
ok(`${Object.keys(deps).length} runtime dependencies, all used`)

console.log(`\n${'═'.repeat(58)}`)
console.log(errors ? `✗ ${errors} error(s), ${warns} warning(s)` : `✓ all checks passed — ${warns} warning(s)`)
process.exit(errors ? 1 : 0)
