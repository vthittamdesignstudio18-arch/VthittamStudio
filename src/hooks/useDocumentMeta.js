import { useEffect } from 'react'
import { useLocation } from '../lib/router.jsx'
import { absolute, defaultRoute, graphForRoute, routes } from '../config/site.js'

/**
 * Keeps <head> in step with the client-side route.
 *
 * The build prerenders real HTML for each route (scripts/postbuild.mjs), which
 * is what non-JavaScript crawlers read. This hook covers the other half: once
 * the router takes over in the browser, the tab title, description, canonical
 * and social tags must follow the user from / to /quote and back. Without it
 * the page would keep announcing itself as the home page after navigation —
 * wrong for bookmarks, share sheets, screen readers and Google's renderer
 * alike.
 *
 * Tags are updated in place rather than duplicated, so the prerendered markup
 * is corrected instead of competing with a second copy.
 */

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function useDocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = routes[pathname] ?? defaultRoute
    const canonical = absolute(route.path)
    const ogImage = absolute(route.ogImage)

    document.title = route.title

    upsertMeta('meta[name="description"]', { name: 'description', content: route.description })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: route.keywords.join(', ') })
    upsertLink('canonical', canonical)

    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: route.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: route.description })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: route.ogImageAlt })

    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: route.title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: route.description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: route.ogImageAlt })

    // Replace the structured data wholesale — a stale BreadcrumbList left over
    // from /quote would otherwise describe the home page incorrectly.
    let ld = document.head.querySelector('script[type="application/ld+json"]')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(graphForRoute(route))
  }, [pathname])
}
