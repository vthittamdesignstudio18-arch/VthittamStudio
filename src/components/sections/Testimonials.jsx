import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { testimonials } from '../../data/content.js'

const ROTATE_MS = 6000

/**
 * Client quotes, rotating.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide) applies here: the content moves on its own,
 * runs for longer than five seconds and sits alongside the rest of the page.
 * The rotation therefore:
 *
 *   • pauses while a pointer is over the card or focus is inside it, so it
 *     cannot pull a quote away from someone who is reading it;
 *   • offers an explicit pause/play control for anyone using neither;
 *   • restarts its timer on every manual step, so choosing a quote is never
 *     overridden a moment later by a cycle that was already nearly up;
 *   • does not auto-rotate at all when the visitor has asked for reduced
 *     motion.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const autoplay = !paused && !hovering && !prefersReducedMotion
  const total = testimonials.length

  // A ref rather than an effect dependency so a manual step can restart the
  // interval without the effect body being rebuilt on every index change.
  const timerRef = useRef(null)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    clear()
    if (!autoplay) return undefined
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % total), ROTATE_MS)
    return clear
  }, [autoplay, total, clear, index])

  /** Any deliberate move resets the dwell so the visitor keeps the full window. */
  const goTo = (next) => {
    clear()
    setIndex(((next % total) + total) % total)
  }

  const current = testimonials[index]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-20 sm:py-24 md:py-32 lg:py-36 bg-ink text-white overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />
      <Container className="relative">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Client Voices"
          title="Said after the scaffolding came down."
          align="center"
          light
        />

        <div className="mt-12 md:mt-16 max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocusCapture={() => setHovering(true)}
            onBlurCapture={() => setHovering(false)}
          >
            <Quote className="mx-auto text-clay-300" size={32} aria-hidden="true" />

            {/* The rotation is announced politely so a screen reader user is
                told the quote changed instead of silently reading stale text. */}
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-white text-balance">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <footer className="mt-8">
                    {/* <cite> denotes the title of a work, not a person, so the
                        attribution is a plain element with the name in it. */}
                    <span className="font-medium block">{current.name}</span>
                    <span className="text-sm text-white/70 mt-0.5 block">{current.role}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-3 sm:gap-4"
              role="group"
              aria-label="Testimonial navigation"
            >
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>

              {/* The dot stays 6px visually, but the button around it is a full
                  24x24 box — the WCAG 2.5.8 floor. Growing the hit area with a
                  pseudo-element instead would make neighbouring targets overlap
                  at this spacing, so the tap that lands is not the one aimed at. */}
              <div className="flex items-center">
                {testimonials.map((testimonial, i) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show testimonial ${i + 1} of ${total}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="group h-6 w-6 flex items-center justify-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 group-hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Hidden when the visitor has asked for reduced motion: nothing is
                rotating, so a pause control would be a lie. */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 hover:bg-white hover:text-ink transition-colors duration-300"
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                {paused ? 'Resume rotation' : 'Pause rotation'}
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
