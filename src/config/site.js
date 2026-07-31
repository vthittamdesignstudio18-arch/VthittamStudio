/**
 * Single source of truth for everything that describes the business to the
 * outside world: canonical URLs, contact details (NAP), and per-route
 * metadata.
 *
 * The build script (scripts/postbuild.mjs) reads this same file to emit
 * sitemap.xml, robots.txt and the prerendered /quote page, so the HTML a
 * crawler receives can never drift from what the app renders.
 *
 * ── If the domain changes, change SITE_URL and nothing else. ──
 */

import { faqs } from '../data/content.js'

export const SITE_URL = 'https://vthittam-studio.vercel.app'

export const business = {
  name: 'V Thittam Design Studio',
  legalName: 'V Thittam Design Studio',
  tagline: 'Architecture, Interiors & Construction',
  // Kept short enough to survive Google's ~155 character snippet truncation.
  description:
    'Architecture firm and interior design studio in Trichy delivering residential and commercial projects end to end — design, approvals and construction.',
  telephone: '+91 98765 43210',
  email: 'studio@vthittam.com',
  address: {
    street: 'No. 48, 1st Floor, SG Complex, Puthur Main Road',
    locality: 'Tiruchirappalli',
    region: 'Tamil Nadu',
    postalCode: '620017',
    country: 'IN',
  },
  // Matches the studio pin already embedded in the Contact section map.
  geo: { latitude: 10.8160354, longitude: 78.6803376 },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
  ],
  priceRange: '₹₹',
  areaServed: ['Tiruchirappalli', 'Trichy', 'Tamil Nadu', 'South India'],
  sameAs: [],
  foundingYear: 2005,
}

/** Services surfaced to search engines as an offer catalogue. */
export const serviceOffers = [
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'House Plan Design & Approval',
  'Elevation Design',
  '3D Visualisation',
  'Turnkey Construction',
  'Space Planning',
  'Home Renovation',
]

/**
 * Per-route metadata. `path` must match the router path exactly.
 * Descriptions are written for humans first; the keywords they contain are
 * the ones the page genuinely answers.
 */
export const routes = {
  '/': {
    path: '/',
    title: 'Architecture Firm in Trichy | V Thittam Design Studio',
    description:
      'Architecture firm and interior designers in Trichy. Residential and commercial architecture, luxury home design, house plans and turnkey construction.',
    keywords: [
      'architecture firm in Trichy',
      'interior designers in Trichy',
      'residential architecture Trichy',
      'commercial architecture Trichy',
      'luxury home design Trichy',
      'house plan designers Trichy',
      'modern architects Trichy',
      'building design Trichy',
    ],
    ogImage: '/projects/residential/residential-image-1-1200.webp',
    ogImageAlt: 'Contemporary villa designed by V Thittam Design Studio in Trichy',
  },
  '/quote': {
    path: '/quote',
    title: 'Request a Quote | V Thittam Design Studio, Trichy',
    description:
      'Request a free quote for your architecture, interior design or construction project in Trichy. A principal architect replies within one business day.',
    keywords: [
      'architecture quote Trichy',
      'interior design cost Trichy',
      'house construction estimate Trichy',
      'architectural consultancy',
      'building design Trichy',
    ],
    ogImage: '/projects/interior/interior-image-5-1200.webp',
    ogImageAlt: 'Interior project completed by V Thittam Design Studio',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }],
  },
}

export const defaultRoute = routes['/']

/** Absolute URL for any site-relative path. */
export const absolute = (p = '/') => `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`

/* ── Structured data ─────────────────────────────────────────────────────
   One @graph so the entities can reference each other by @id rather than
   repeating the business details three times. The studio is genuinely all
   three of these things, which is why LocalBusiness, ArchitecturalService
   and InteriorDesign each appear.                                        */

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
}

const openingHoursSpecification = business.openingHours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}))

export function organizationSchema() {
  return {
    '@type': ['LocalBusiness', 'ArchitecturalService', 'ProfessionalService'],
    '@id': ORG_ID,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    telephone: business.telephone,
    email: business.email,
    image: absolute('/brand/logo.webp'),
    logo: {
      '@type': 'ImageObject',
      url: absolute('/brand/logo.webp'),
      width: 1071,
      height: 320,
    },
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification,
    priceRange: business.priceRange,
    foundingDate: String(business.foundingYear),
    areaServed: business.areaServed.map((n) => ({ '@type': 'Place', name: n })),
    knowsAbout: serviceOffers,
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Architecture, Interior & Construction Services',
      itemListElement: serviceOffers.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s, areaServed: 'Tiruchirappalli, Tamil Nadu' },
      })),
    },
  }
}

/** The interior arm, described on its own so it can rank for interior queries. */
export function interiorDesignSchema() {
  return {
    '@type': ['InteriorDesign', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#interior-design`,
    name: `${business.name} — Interior Design Studio`,
    description:
      'Interior design studio in Trichy delivering residential and commercial interiors — space planning, modular kitchens, lighting and turnkey solutions.',
    url: `${SITE_URL}/#interior-design`,
    telephone: business.telephone,
    address: postalAddress,
    parentOrganization: { '@id': ORG_ID },
    areaServed: business.areaServed.map((n) => ({ '@type': 'Place', name: n })),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    description: business.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  }
}

export function webPageSchema(route) {
  return {
    '@type': 'WebPage',
    '@id': `${absolute(route.path)}#webpage`,
    url: absolute(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    primaryImageOfPage: { '@type': 'ImageObject', url: absolute(route.ogImage) },
  }
}

export function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  }
}

/**
 * The FAQ section is real, visible, on-page content answering real questions,
 * which is exactly what FAQPage markup is for — and it is eligible for
 * expanded search results. Generated from the same array the section renders,
 * so the two can never disagree.
 */
export function faqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** Full JSON-LD graph for a given route. */
export function graphForRoute(route) {
  const graph = [
    organizationSchema(),
    interiorDesignSchema(),
    websiteSchema(),
    webPageSchema(route),
  ]
  if (route.path === '/') graph.push(faqSchema())
  if (route.breadcrumb) graph.push(breadcrumbSchema(route.breadcrumb))
  return { '@context': 'https://schema.org', '@graph': graph }
}
