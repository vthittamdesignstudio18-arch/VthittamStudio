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
    'Architecture and interior design studio in Trichy. Residential and commercial architects delivering design, working drawings, approvals and construction.',
  // Primary line first — it is the one used in schema.org telephone and in
  // the tel: links. The second line is listed alongside it everywhere the
  // studio's numbers are shown.
  telephone: '+91 80151 45040',
  telephoneAlt: '+91 87607 80610',
  email: 'vthittamdesignstudio@gmail.com',
  /** WhatsApp business line. wa.me needs the bare international form. */
  whatsapp: '918760780610',
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
  sameAs: [
    'https://www.instagram.com/thittam_design_studio',
    'https://www.facebook.com/share/1DhSGaWCUN/',
  ],
  foundingYear: 2021,
}

/** Services surfaced to search engines as an offer catalogue. */
export const serviceOffers = [
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'House Plan Design & Approval',
  '3D Elevation Design',
  'Working Drawings',
  'Structural Drawings',
  'Building Planning',
  'Construction Consultancy',
  'Home Construction',
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
    /**
     * `title` and `description` are the search-facing pair: they become the
     * <title> and <meta name="description">, which Google truncates at roughly
     * 60 characters and 155 respectively. These are written to survive that cut
     * with the offer still visible.
     *
     * `socialTitle` and `socialDescription` carry the studio's full approved
     * wording. Facebook, LinkedIn, X and WhatsApp render far more text than a
     * search result does, so the complete message goes there unabridged.
     *
     * Routes that omit the social pair simply reuse their search pair.
     */
    title: 'V Thittam Studio | Architects & Interior Designers, Trichy',
    description:
      'Architecture and interior design firm in Trichy — house plans, 3D elevations, working drawings, interiors and construction. Free consultation.',
    socialTitle: 'V Thittam Studio | Architects, Interior Designers & Construction Consultants',
    socialDescription:
      'V Thittam Studio is a trusted architecture and interior design firm in Trichy. We specialize in house plans, 3D elevations, working drawings, interiors and construction executed by experienced site engineers. Contact us for a free consultation.',
    keywords: [
      'architecture in Trichy',
      'interior designers Trichy',
      'residential architects Trichy',
      'commercial architects Tamil Nadu',
      'architects in Tamil Nadu',
      'construction consultants Trichy',
      'house plan designers',
      '3D elevation design',
      'working drawings',
      'interior design studio',
      'home construction Trichy',
      'architecture and interior design',
      'building planning',
      'structural drawings',
      'house design',
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
      'architecture in Trichy',
      'construction consultants Trichy',
      'house plan designers',
      'home construction Trichy',
      'building planning',
      'interior design studio',
    ],
    ogImage: '/projects/interior/interior-image-5-1200.webp',
    ogImageAlt: 'Interior project completed by V Thittam Design Studio',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | V Thittam Design Studio',
    description:
      'How V Thittam Design Studio collects, uses and stores the personal details you share through the quote form, and how to request their deletion.',
    keywords: ['privacy policy', 'data protection', 'V Thittam Design Studio'],
    ogImage: '/projects/residential/residential-image-1-1200.webp',
    ogImageAlt: 'Contemporary villa designed by V Thittam Design Studio in Trichy',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }],
  },
}

/**
 * Metadata for unmatched URLs.
 *
 * Deliberately kept out of `routes` so it is never prerendered into the sitemap
 * — it exists only so the 404 view can set `noindex` and stop Google reporting
 * every mistyped URL as a soft 404 of the home page.
 */
export const notFoundRoute = {
  path: '/404',
  title: 'Page Not Found | V Thittam Design Studio',
  description: 'The page you were looking for could not be found.',
  keywords: [],
  ogImage: '/projects/residential/residential-image-1-1200.webp',
  ogImageAlt: 'Contemporary villa designed by V Thittam Design Studio in Trichy',
  noindex: true,
}

export const defaultRoute = routes['/']

/**
 * Open Graph, Twitter and JSON-LD get the studio's full wording; search tags get
 * the length-safe pair. A route without a social override falls back to its
 * search copy, so adding a page needs no extra fields.
 */
export const socialTitle = (route) => route.socialTitle ?? route.title
export const socialDescription = (route) => route.socialDescription ?? route.description

/** Pre-filled WhatsApp deep link. Resolves to the app on mobile and web on desktop. */
export const whatsappLink = (
  message = "Hello, I'd like to discuss an architecture or interior project."
) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`

/** `tel:` href for any of the studio's numbers. */
export const telLink = (n) => `tel:${n.replace(/[^\d+]/g, '')}`

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
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: business.telephone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'ta'],
      },
      {
        '@type': 'ContactPoint',
        telephone: business.telephoneAlt,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'ta'],
      },
    ],
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
    // Structured data is not subject to a snippet limit, so it carries the
    // studio's full wording rather than the trimmed search variant.
    name: socialTitle(route),
    description: socialDescription(route),
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
