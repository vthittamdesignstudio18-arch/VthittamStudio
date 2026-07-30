import { useCallback } from 'react'
import { useLocation, useNavigate } from '../lib/router.jsx'

/**
 * Scrolls to a section on the home page. If the user is on another route
 * (e.g. /quote) it routes home first and hands the target to HomePage,
 * which performs the scroll once the sections have mounted.
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
        behavior: 'smooth',
        block: 'start',
      })
    },
    [isHome, navigate]
  )

  return { goToSection, isHome }
}
