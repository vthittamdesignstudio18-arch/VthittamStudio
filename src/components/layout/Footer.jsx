import { Instagram, Linkedin, Facebook } from 'lucide-react'
import Container from '../ui/Container.jsx'
import { navLinks } from '../../data/nav.js'
import { services } from '../../data/services.js'
import useSectionNavigation from '../../hooks/useSectionNavigation.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const { goToSection } = useSectionNavigation()

  return (
    <footer className="bg-ink text-white pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          <div className="md:col-span-2 pr-8">
            <div className="font-display text-2xl mb-4">V Thittam Design Studio</div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              An architecture, interior, and construction studio delivering considered residential and
              commercial spaces across Trichy and Tamil Nadu.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="sheet-label text-white/40 mb-5">Quick Links</div>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => goToSection(link.id)}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="sheet-label text-white/40 mb-5">Services</div>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.code} className="text-sm text-white/70">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-xs text-white/40">
          <span>© {year} V Thittam Design Studio. All rights reserved.</span>
          <span className="uppercase tracking-widest2">Trichy, Tamil Nadu</span>
        </div>
      </Container>
    </footer>
  )
}
