import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { testimonials } from '../../data/content.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  function go(delta) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />
      <Container className="relative">
        <SectionHeading
          sheet="A-09"
          eyebrow="Client Voices"
          title="Said after the scaffolding came down."
          align="center"
          light
        />

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-12 md:px-16 md:py-16">
            <Quote className="mx-auto text-clay-400/70" size={32} />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-white/90 text-balance">
                  “{current.quote}”
                </p>
                <div className="mt-8">
                  <div className="font-medium">{current.name}</div>
                  <div className="text-sm text-white/50 mt-0.5">{current.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
