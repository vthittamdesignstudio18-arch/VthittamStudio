import { useEffect, useRef, useState } from 'react'

/**
 * Counts up to `value` once, on mount.
 *
 * Deliberately not tied to scroll position — it runs when the component
 * exists and is finished long before the stat is reached. Users who prefer
 * reduced motion get the final figure immediately.
 */
export default function Counter({ value, suffix = '', className = '', duration = 1200 }) {
  const [display, setDisplay] = useState(value)
  const frame = useRef(null)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    setDisplay(0)

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutCubic — quick to begin, settles gently on the final figure
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [value, duration])

  return (
    <span className={`tabular-nums ${className}`}>
      {display}
      {suffix}
    </span>
  )
}
