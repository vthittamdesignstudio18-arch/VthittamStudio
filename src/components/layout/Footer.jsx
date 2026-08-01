import { Instagram, Facebook, MessageCircle, Phone, Mail } from 'lucide-react'
import { Link } from '../../lib/router.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'
import { navLinks } from '../../data/nav.js'
import { services } from '../../data/services.js'
import { business, telLink, whatsappLink } from '../../config/site.js'
import useSectionNavigation from '../../hooks/useSectionNavigation.js'

const socials = [
  {
    Icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/thittam_design_studio?igsh=MWFvZ3Jyd2hoeXhnNw==',
  },
  {
    Icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1DhSGaWCUN/?mibextid=wwXIfr',
  },
  { Icon: MessageCircle, label: 'WhatsApp', href: whatsappLink() },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { goToSection } = useSectionNavigation()

  return (
    <footer aria-labelledby="footer-heading" className="bg-ink text-white pt-16 md:pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 pb-12 md:pb-14 border-b border-white/10">
          <div className="sm:col-span-2 md:pr-8">
            {/* Official lockup, white ink for the dark footer */}
            <h2 id="footer-heading" className="sr-only">
              V Thittam Design Studio — contact and site links
            </h2>
            <Logo tone="light" height={48} className="mb-5" />

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              An architecture, interior, and construction studio delivering considered residential
              and commercial spaces across Trichy and Tamil Nadu.
            </p>

            <address className="mt-6 flex flex-col gap-2.5 text-sm not-italic">
              <a
                href={telLink(business.telephone)}
                className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors w-fit"
              >
                <Phone size={15} strokeWidth={1.5} aria-hidden="true" /> {business.telephone}
              </a>
              <a
                href={telLink(business.telephoneAlt)}
                className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors w-fit"
              >
                <Phone size={15} strokeWidth={1.5} aria-hidden="true" /> {business.telephoneAlt}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors w-fit break-all"
              >
                <Mail size={15} strokeWidth={1.5} aria-hidden="true" /> {business.email}
              </a>
            </address>

            <div className="flex gap-3.5 mt-6">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — opens in a new tab`}
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 id="footer-links-heading" className="sheet-label text-white/70 mb-5">Quick Links</h3>
            <nav aria-labelledby="footer-links-heading">
              <ul className="flex flex-col gap-3 list-none">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => goToSection(link.id)}
                      className="text-sm text-white/70 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 id="footer-services-heading" className="sheet-label text-white/70 mb-5">Services</h3>
            {/* These read as a link list, so they behave as one. Each jumps to
                the Services section rather than sitting there looking clickable. */}
            <nav aria-labelledby="footer-services-heading">
              <ul className="flex flex-col gap-3 list-none">
                {services.slice(0, 5).map((service) => (
                  <li key={service.code}>
                    <button
                      type="button"
                      onClick={() => goToSection('services')}
                      className="text-sm text-white/70 hover:text-white transition-colors text-left"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-xs text-white/65 text-center sm:text-left">
          <span>© {year} V Thittam Design Studio. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/25">
              Privacy Policy
            </Link>
            <span className="uppercase tracking-widest2">Trichy, Tamil Nadu</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
