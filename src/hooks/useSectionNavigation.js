import { useCallback } from 'react'
import { useLocation, useNavigate } from '../lib/router.jsx'
import { scrollBehavior } from '../lib/motionPreference.js'

/**
 * Scrolls to a section on the home page. If the user is on another route
 * (e.g. /quote) it routes home first and hands the target to HomePage,
 * which performs the scroll once the sections have mounted.
 *
 * The landing position is handled by `scroll-padding-top` on <html> (see
 * index.css), so the section's sheet label clears the fixed navbar instead of
 * disappearing behind it. Every in-page jump goes through this hook so that
 * offset can never drift between call sites.
 */
export default function useSectionNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const goToSection = useCallback(
    (id) => {
      if (!isHome) {
        navigate('/', { state: { scrollTo: id } })
        return
      }

      document.getElementById(id)?.scrollIntoView({
        behavior: scrollBehavior(),
        block: 'start',
      })
    },
    [isHome, navigate]
  )

  return { goToSection, isHome }
}
