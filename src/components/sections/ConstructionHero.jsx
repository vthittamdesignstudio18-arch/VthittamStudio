import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import PhotoJourneyScene from '../construction/PhotoJourneyScene.jsx'
import { STAGES, T, activeStageIndex } from '../construction/journeyStages.js'

const EASE = [0.16, 1, 0.3, 1]
const headlineWords = ['Plot', 'To', 'Dream', 'Home.']

export default function ConstructionHero() {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setIsMobile(mq.matches)
    const updateRM = () => setReduceMotion(rm.matches)
    update()
    updateRM()
    mq.addEventListener('change', update)
    rm.addEventListener('change', updateRM)
    return () => {
      mq.removeEventListener('change', update)
      rm.removeEventListener('change', updateRM)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 85,
    damping: reduceMotion ? 200 : 22,
    mass: 0.3,
  })

  useMotionValueEvent(progress, 'change', (v) => {
    const idx = activeStageIndex(v)
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  })

  // Opening headline: present over the empty plot, retreats as the blueprint appears.
  const openOpacity = useTransform(progress, [0, T.blueprint[0]], [1, 0])
  const openY = useTransform(progress, [0, T.blueprint[0]], [0, -36])
  const openScale = useTransform(progress, [0, T.blueprint[0]], [1, 0.95])
  const cueOpacity = useTransform(progress, [0, 0.03], [1, 0])

  // Closing statement: returns once the tower is complete and lit.
  const closeReveal = useTransform(progress, [T.finished[0], T.finished[0] + 0.05], [0, 1], { clamp: true })
  const closeOpacity = closeReveal
  const closeY = useTransform(closeReveal, [0, 1], [26, 0])

  // Persistent rail progress dot
  const railTopPercent = useTransform(progress, [0, 1], [0, 100])
  const railTop = useTransform(railTopPercent, (v) => `${v}%`)

  const stage = STAGES[activeIndex]
  const scrollHeight = isMobile ? '480vh' : '560vh'

  return (
    <section ref={sectionRef} id="hero" className="relative w-full" style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0E0E0C]">
        <div className="absolute inset-0">
          <PhotoJourneyScene progress={progress} isMobile={isMobile} reduceMotion={reduceMotion} />
        </div>

        {/* Legibility scrim — real photographs carry far more midtone detail
            than the old illustration did, so this needs to read as a working
            scrim (stronger top+bottom, clear center) rather than a decorative
            touch, or overlay text will lose contrast against the photos. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

        <Container className="relative z-10 flex h-full flex-col">
          {/* Persistent sheet label + live stage readout */}
          <div className="flex items-start justify-between pt-8 md:pt-10">
            <div className="flex items-center gap-3 rounded-full border border-hairline bg-white/70 px-4 py-2 backdrop-blur-md">
              
              <span className="h-3 w-px bg-ink/15" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-[11px] font-body uppercase tracking-widest2 text-ink"
                >
                  {stage.code} · {stage.label}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="hidden rounded-full border border-hairline bg-white/70 px-4 py-2 backdrop-blur-md md:block">
              <span className="text-[11px] font-body tracking-widest2 text-ink/60">
                {String(activeIndex + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Opening statement, over the empty plot */}
          <motion.div
            style={{ opacity: openOpacity, y: openY, scale: openScale }}
            className="flex flex-1 flex-col justify-center"
          >
            <div className="sheet-label text-white/60 mb-6">V Thittam Design Studio — Trichy</div>
            <h1 className="max-w-3xl text-[2.4rem] leading-[1.08] sm:text-6xl md:text-[4.4rem] lg:text-[5rem] font-medium text-white text-balance">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE }}
                  className="inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              className="mt-6 max-w-md text-base md:text-lg text-white/70 leading-relaxed"
            >
              A staked, empty plot becomes a finished luxury residence. Scroll to watch every stage of the build.
            </motion.p>
          </motion.div>

          {/* Closing statement, once the tower is complete */}
          <motion.div
            style={{ opacity: closeOpacity, y: closeY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start px-6 pb-16 md:px-10 md:pb-20 lg:px-16"
          >
            <div className="sheet-label text-white/60 mb-4">C-05 — Final Delivery</div>
            <h2 className="max-w-2xl text-3xl sm:text-5xl md:text-[3.4rem] font-medium leading-[1.1] text-white text-balance">
              Transforming Vision Into Architectural Reality.
            </h2>
            <p className="mt-5 max-w-md text-base text-white/70 leading-relaxed">
              This is the studio process, start to finish — from staked plot to finished residence, the same discipline behind every home we deliver in Trichy.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
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
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book Consultation
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Stage rail — desktop only, a real index of the sequence, not decoration */}
        <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end">
          <div className="relative flex flex-col items-end gap-[15px]">
            <div className="absolute right-[3px] top-0 bottom-0 w-px bg-white/15" />
            <motion.div
              className="absolute -right-[2.5px] h-2 w-2 rounded-full bg-white"
              style={{ top: railTop, marginTop: '-4px' }}
            />
            {STAGES.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 pr-3">
                <span
                  className={`font-body text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
                    i === activeIndex ? 'text-white' : 'text-white/35'
                  }`}
                >
                  {s.label}
                </span>
                <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${i === activeIndex ? 'bg-white' : 'bg-white/30'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Caption panel — figure note for the current stage */}
        <div className="pointer-events-none absolute bottom-8 left-6 z-10 max-w-xs md:left-10 md:bottom-10 lg:left-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: activeIndex === STAGES.length - 1 ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="text-[11px] font-body uppercase tracking-widest2 text-white/55 mb-2">
                {stage.code}
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{stage.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-widest2">Scroll to explore</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={16} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
