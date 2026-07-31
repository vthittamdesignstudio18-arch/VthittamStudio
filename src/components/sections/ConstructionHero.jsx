import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import PhotoJourneyScene, { PHOTO_COUNT } from '../construction/PhotoJourneyScene.jsx'
import { STAGES, STAGE_DWELL } from '../construction/journeyStages.js'

/**
 * Opening hero.
 *
 * The five build stages play through once as the page loads and then hold on
 * the finished residence. Nothing here responds to scroll: the section is a
 * single screen tall, the headline and calls to action are present and
 * clickable from the first frame, and once the sequence finishes the hero is
 * completely static.
 *
 * Users who prefer reduced motion skip straight to the final frame.
 */
export default function ConstructionHero() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sequenceDone, setSequenceDone] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateRM = () => setReduceMotion(rm.matches)
    updateRM()
    rm.addEventListener('change', updateRM)
    return () => rm.removeEventListener('change', updateRM)
  }, [])

  // Play the sequence once, on mount.
  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(PHOTO_COUNT - 1)
      setSequenceDone(true)
      return
    }

    for (let i = 1; i < PHOTO_COUNT; i++) {
      timers.current.push(setTimeout(() => setActiveIndex(i), i * STAGE_DWELL))
    }
    timers.current.push(
      setTimeout(() => setSequenceDone(true), PHOTO_COUNT * STAGE_DWELL)
    )

    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [reduceMotion])

  const stage = STAGES[activeIndex]

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#0E0E0C]">
      <div className="absolute inset-0">
        <PhotoJourneyScene activeIndex={activeIndex} reduceMotion={reduceMotion} />
      </div>

      {/* Legibility scrim — photographs carry far more midtone detail than an
          illustration, so this is a working scrim rather than a decorative one. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

      <Container className="relative z-10 flex h-full flex-col">
        {/* Headline — present from the first frame, animates in once */}
        <div className="flex flex-1 flex-col justify-center pt-24 pb-20 md:pt-28 md:pb-24">
          <div className="hero-intro sheet-label text-white/75 mb-5" style={{ animationDelay: '80ms' }}>
            Architecture &amp; Interior Design Studio — Trichy
          </div>

          <h1 id="hero-heading" className="hero-intro max-w-3xl text-[2.5rem] leading-[1.06] sm:text-6xl md:text-[4.4rem] lg:text-[5rem] font-medium text-white text-balance" style={{ animationDelay: '160ms' }}>
            Plot To Dream Home.
          </h1>

          <p className="hero-intro mt-6 max-w-lg text-base md:text-lg text-white/75 leading-relaxed" style={{ animationDelay: '280ms' }}>
            From a staked, empty plot to a finished residence — the same discipline behind every
            home we deliver in Trichy and across Tamil Nadu.
          </p>

          <div className="hero-intro mt-9 flex flex-wrap items-center gap-3 sm:gap-4" style={{ animationDelay: '400ms' }}>
            <Button
              as="a"
              href="#projects"
              variant="primary"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Projects <ArrowRight size={16} />
            </Button>
            <Button
              as="a"
              href="#contact"
              variant="outline"
              className="!border-white/35 !text-white hover:!bg-white hover:!text-ink"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </Container>

      {/* Stage caption — a figure note while the sequence runs, then retires */}
      <div
        className="pointer-events-none absolute bottom-7 left-6 right-6 z-10 max-w-xs transition-opacity duration-700 md:left-10 md:bottom-9 lg:left-16"
        style={{ opacity: sequenceDone ? 0 : 1 }}
        aria-hidden="true"
      >
        <div className="text-[11px] font-body uppercase tracking-widest2 text-white/75 mb-2">
          {stage.code}
        </div>
        <p className="text-sm text-white/80 leading-relaxed">{stage.caption}</p>
      </div>
    </section>
  )
}
