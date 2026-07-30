import { useEffect } from 'react'
import { useLocation } from '../../lib/router.jsx'

/**
 * Resets scroll position on route change. Skipped when the incoming route
 * carries a `scrollTo` target, so cross-page section links are not fought.
 */
export default function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (state?.scrollTo) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, state])

  return null
}
