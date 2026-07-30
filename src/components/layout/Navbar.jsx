import { useEffect, useMemo, useState } from 'react'
import { Link } from '../../lib/router.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import { navLinks } from '../../data/nav.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import useSectionNavigation from '../../hooks/useSectionNavigation.js'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { goToSection, isHome } = useSectionNavigation()

  // Section highlighting only applies to the single-page home route.
  const observedIds = useMemo(() => (isHome ? navLinks.map((l) => l.id) : []), [isHome])
  const activeId = useActiveSection(observedIds)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    goToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-6">
      {/* Static Navbar */}
      <div className="mx-6 md:mx-10 rounded-full border border-white/20 bg-[#D2C1A6]/80 backdrop-blur-sm shadow-xl">
        <Container className="px-8 md:px-10">
          <nav className="flex items-center justify-between py-3">

            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('hero')
              }}
              className="ml-4 font-display text-3xl font-bold tracking-tight text-[#2E251E]"
            >
              Thittam
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  data-active={activeId === link.id}
                  className="nav-link text-sm font-medium text-[#2E251E] hover:text-black transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
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
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#2E251E]"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
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
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl p-8 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                  }}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-display text-2xl text-white"
                >
                  {link.label}
                </motion.button>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}