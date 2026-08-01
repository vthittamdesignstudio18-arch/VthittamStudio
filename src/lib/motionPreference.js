/**
 * One place that answers "has this visitor asked for less motion?".
 *
 * The CSS media query in index.css only neutralises CSS animations and
 * transitions. Anything driven from JavaScript — framer-motion, and every
 * scroll call that passes `behavior: 'smooth'` — overrides it and keeps
 * animating, because an explicit JS option beats a stylesheet declaration.
 * These helpers close that gap for the scroll calls; <MotionConfig
 * reducedMotion="user"> in main.jsx closes it for framer-motion.
 */

const QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}

/** `smooth`, unless the visitor asked for less motion. */
export function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

/** Subscribe to changes; returns an unsubscribe function. */
export function onMotionPreferenceChange(handler) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia(QUERY)
  const listener = () => handler(mq.matches)
  mq.addEventListener('change', listener)
  return () => mq.removeEventListener('change', listener)
}
