import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { faqs } from '../../data/content.js'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              sheet="A-10"
              eyebrow="FAQ"
              title="Answers before you ask."
              description="If your question isn't here, it takes one message to get a direct answer."
            />
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-hairline border-t border-b border-hairline">
            {faqs.map((faq, i) => (
              <div key={faq.question}>
                <h3 className="m-0">
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left font-display text-lg md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
                >
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                    className="shrink-0 h-8 w-8 rounded-full border border-ink/25 flex items-center justify-center"
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                </h3>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm md:text-base text-ink-muted leading-relaxed max-w-xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
