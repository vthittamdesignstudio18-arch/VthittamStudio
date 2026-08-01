import { ArrowLeft } from 'lucide-react'
import { Link } from '../lib/router.jsx'
import Container from '../components/ui/Container.jsx'
import { business, telLink } from '../config/site.js'

/**
 * Privacy notice.
 *
 * The quote form collects a name, two contact routes, a project location, a
 * budget band and free text, and relays all of it to Web3Forms — a third-party
 * processor the visitor was previously never told about. This page states what
 * is collected, who processes it, how long it is kept and how to have it
 * removed, which is what India's DPDP Act 2023 and the GDPR both expect of a
 * site that takes enquiries.
 *
 * Content is data-driven so a lawyer's revisions are a single-file edit.
 */

const LAST_UPDATED = '1 August 2026'

const sections = [
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'When you submit the quote form we collect the details you type into it: your name, phone number, email address, project type, project location, estimated built-up area, budget range, project timeline, and anything you write in the message field.',
      'We do not collect any of this automatically. If you never submit the form, we never receive your details.',
    ],
    list: null,
  },
  {
    id: 'why-we-use-it',
    heading: 'Why we use it',
    body: [
      'Your details are used for one purpose: to understand your project and respond to your enquiry. A principal architect reads the brief, calls you back, and — where the project is a fit — issues a written proposal.',
      'We do not use your details for marketing, we do not add you to a mailing list, and we do not sell or rent them to anyone.',
    ],
    list: null,
  },
  {
    id: 'who-processes-it',
    heading: 'Who processes it',
    body: [
      'The website has no server of its own. Quote submissions are delivered to the studio inbox by Web3Forms, a hosted form-to-email service acting as our data processor. Your submission passes through their systems on the way to us.',
      'Two other third parties are involved in serving this site:',
    ],
    list: [
      'Vercel — hosts the website and processes standard server request logs.',
      'Google Fonts — serves the two typefaces used across the site.',
      'Google Maps — powers the studio location map in the Contact section. This map is not loaded until you choose to load it, so no Google cookies are set on your device unless you ask for it.',
    ],
  },
  {
    id: 'how-long',
    heading: 'How long we keep it',
    body: [
      'Enquiries are retained in the studio inbox for as long as the project conversation is active, and for up to 24 months afterwards so we can pick up a thread you may return to. Where an enquiry becomes a commissioned project, the details are retained for the life of the project record as required for professional and statutory purposes.',
    ],
    list: null,
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: ['You can ask us at any time to:'],
    list: [
      'Tell you what details of yours we hold.',
      'Correct anything that is wrong.',
      'Delete your enquiry and every copy of it.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: [
      'This site sets no cookies of its own — there is no analytics, no advertising and no tracking script.',
      'The only third-party cookies that can reach your device come from the Google Maps embed in the Contact section, and that embed only loads after you click to load it.',
    ],
    list: null,
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      `If this policy changes we will update it here and revise the date at the top of the page. This version was last updated on ${LAST_UPDATED}.`,
    ],
    list: null,
  },
]

export default function PrivacyPolicy() {
  return (
    <section className="bg-stone-bg" aria-labelledby="privacy-heading">
      <Container className="py-28 md:py-36 lg:py-40">
        <div className="max-w-2xl">
          <p className="sheet-label">Sheet L-01 — Privacy</p>

          <h1
            id="privacy-heading"
            className="mt-5 font-display text-4xl md:text-5xl leading-[1.08] font-medium text-balance"
          >
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-ink-muted">Last updated {LAST_UPDATED}</p>

          <p className="mt-8 text-base md:text-lg leading-relaxed text-ink-muted">
            {business.name} is an architecture and interior design studio in Tiruchirappalli,
            Tamil Nadu. This page explains what happens to the personal details you share with
            us through this website.
          </p>

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((section) => (
              <div key={section.id}>
                <h2 className="font-display text-2xl md:text-3xl leading-snug">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2.5 pl-5 list-disc marker:text-clay-600">
                    {section.list.map((item) => (
                      <li key={item} className="text-base leading-relaxed text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="card-hairline p-7 md:p-8">
              <h2 className="font-display text-2xl leading-snug">Contact us</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                To exercise any of the rights above, or to ask anything about this policy,
                contact the studio and we will respond within one business day.
              </p>
              <address className="mt-5 flex flex-col gap-2 text-sm not-italic">
                <a
                  href={`mailto:${business.email}`}
                  className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors break-words w-fit"
                >
                  {business.email}
                </a>
                <a
                  href={telLink(business.telephone)}
                  className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors w-fit"
                >
                  {business.telephone}
                </a>
                <span className="text-ink-muted mt-1">
                  {business.address.street}, {business.address.locality}, {business.address.region}{' '}
                  {business.address.postalCode}
                </span>
              </address>
            </div>
          </div>

          <Link
            to="/"
            className="nav-link mt-14 inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> Back to the studio
          </Link>
        </div>
      </Container>
    </section>
  )
}
