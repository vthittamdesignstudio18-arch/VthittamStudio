import { useEffect, useMemo, useState } from 'react'
import { Link } from '../../lib/router.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import { navLinks } from '../../data/nav.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import useSectionNavigation from '../../hooks/useSectionNavigation.js'
import useScrollLock from '../../hooks/useScrollLock.js'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { goToSection, isHome } = useSectionNavigation()

  // Section highlighting only applies to the single-page home route.
  const observedIds = useMemo(() => (isHome ? navLinks.map((l) => l.id) : []), [isHome])
  const activeId = useActiveSection(observedIds)

  useScrollLock(menuOpen)

  // Close the mobile menu if the viewport grows past the breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    goToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4 md:py-6">
      <div className="mx-4 sm:mx-6 md:mx-10 rounded-full border border-white/20 bg-[#D2C1A6]/85 backdrop-blur-md shadow-xl">
        <Container className="!px-4 sm:!px-6 md:!px-8">
          <nav aria-label="Primary" className="flex items-center justify-between gap-4 py-2.5 md:py-3">
            {/* Official lockup — V mark, திட்டம், and Design Studio */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('hero')
              }}
              aria-label="V Thittam Design Studio — home"
              className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E251E]/50"
            >
              <Logo tone="dark" height={34} className="sm:hidden" priority />
              <Logo tone="dark" height={42} className="hidden sm:block" priority />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  data-active={activeId === link.id}
                  className="nav-link text-sm font-medium text-[#2E251E] hover:text-black transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block shrink-0">
              <Button
                as={Link}
                to="/quote"
                variant="primary"
                className="!py-3 !px-6 text-xs !bg-[#242424] !text-white rounded-full hover:!bg-black"
              >
                Book Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden shrink-0 -mr-1 p-2 text-[#2E251E] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E251E]/50"
            >
              {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </nav>
        </Container>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5.5rem] z-40 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-3xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-xl p-7 sm:p-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display text-2xl text-white hover:text-clay-200 transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <Button
                as={Link}
                to="/quote"
                variant="primary"
                onClick={() => setMenuOpen(false)}
                className="mt-2 w-full"
              >
                Book Consultation
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
