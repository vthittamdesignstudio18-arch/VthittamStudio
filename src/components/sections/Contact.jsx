import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, MessageCircle, Map as MapIcon } from 'lucide-react'
import { Link } from '../../lib/router.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import Button from '../ui/Button.jsx'
import { business, telLink, whatsappLink } from '../../config/site.js'

const contactDetails = [
  { icon: Phone, label: 'Phone', value: business.telephone, href: telLink(business.telephone) },
  { icon: Phone, label: 'Phone (Alt)', value: business.telephoneAlt, href: telLink(business.telephoneAlt) },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: business.telephoneAlt,
    href: whatsappLink(),
    external: true,
  },
  { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
  {
    icon: MapPin,
    label: 'Studio Address',
    value: `${business.address.street}, Trichy - ${business.address.postalCode}`,
  },
  { icon: Clock, label: 'Business Hours', value: 'Mon – Sat, 10:00 AM – 7:00 PM' },
]

const assurances = [
  'A reply within one business day',
  'Your brief read by a principal architect, not a sales desk',
  'A written proposal before any commitment',
]

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9382792348674!2d78.6803376!3d10.816035399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d5a7255b03%3A0xc216173da9b89f54!2sTHITTAM%20DESIGN%20STUDIO%20%7C%20ARCHITECTURE%20FIRM%20%7C%20INTERIOR%20DESIGNER!5e0!3m2!1sen!2sin!4v1785442589771!5m2!1sen!2sin'

const MAP_DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=10.8160354,78.6803376'

/**
 * Click-to-load map.
 *
 * A Google Maps iframe sets Google cookies the moment it is rendered. Loading
 * it unprompted made the site drop third-party cookies on every visitor with
 * no notice and no choice. The embed now stays inert until the visitor asks
 * for it; until then they get a labelled placeholder and a plain link that
 * opens Maps in a new tab, so the address is never unreachable.
 */
function ConsentMap() {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="card-hairline overflow-hidden h-64">
        <iframe
          title="Map showing V Thittam Design Studio, Puthur Main Road, Trichy"
          className="w-full h-full grayscale-[20%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={MAP_EMBED_SRC}
        />
      </div>
    )
  }

  return (
    <div className="card-hairline overflow-hidden h-64 bg-stone-surface flex flex-col items-center justify-center gap-4 text-center px-6">
      <MapIcon size={22} strokeWidth={1.5} aria-hidden="true" className="text-clay-700" />
      <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
        The studio location map is provided by Google Maps, which sets cookies on your
        device. It loads only when you choose to.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors"
        >
          Load the map
        </button>
        <a
          href={MAP_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
        >
          Open in Google Maps — opens in a new tab
        </a>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          id="contact-heading"
          sheet="A-11"
          eyebrow="Get In Touch"
          title="Tell us about your site and your plans."
          description="Book a consultation and we'll respond within one business day with next steps."
          align="center"
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <FadeIn direction="right" className="lg:col-span-5 flex flex-col gap-6">
            <address className="card-hairline p-8 flex flex-col gap-6 not-italic">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-full bg-stone-surface flex items-center justify-center">
                    <item.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-widest2 text-ink-muted">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="mt-1 block text-sm text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors break-words"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-sm text-ink">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </address>

            <ConsentMap />
          </FadeIn>

          <FadeIn
            direction="left"
            delay={0.1}
            className="lg:col-span-7 card-hairline p-8 md:p-10 flex flex-col justify-center gap-7"
          >
            <div>
              <span className="sheet-label">Project Enquiry</span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl leading-[1.15]">
                Every project begins with a conversation about your site.
              </h3>
            </div>

            <p className="text-ink-muted leading-relaxed max-w-md">
              Send us the plot, the scope and the budget you have in mind. We'll come back with an
              honest read on feasibility, an indicative cost, and the drawings your project will need.
            </p>

            <ul className="flex flex-col gap-3">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <Check size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-clay-700" />
                  {item}
                </li>
              ))}
            </ul>

            <Button as={Link} to="/quote" variant="primary" className="self-start">
              Get a Free Quote
              <ArrowRight size={16} />
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
