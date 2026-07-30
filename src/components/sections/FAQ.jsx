import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import { faqs } from '../../data/content.js'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-28 md:py-36 bg-stone-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              sheet="A-10"
              eyebrow="FAQ"
              title="Answers before you ask."
              description="If your question isn't here, it takes one message to get a direct answer."
            />
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-hairline border-t border-b border-hairline">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.question} delay={0.05 * i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg md:text-xl">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 h-8 w-8 rounded-full border border-ink/15 flex items-center justify-center"
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
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
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
