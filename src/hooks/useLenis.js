import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initializes Lenis smooth scrolling for the whole app.
 * Respects users who have requested reduced motion.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    let rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
