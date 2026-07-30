import { motion } from 'framer-motion'

/**
 * Every section is labelled like a drawing sheet from an architectural set
 * (e.g. "SHEET A-03 — SERVICES"). This is the page's signature device: it
 * borrows real vocabulary from architectural documentation instead of a
 * decorative 01/02/03 counter.
 */
export default function SectionHeading({
  sheet,
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl gap-5`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sheet-label ${light ? 'text-white/50' : ''}`}
      >
        {sheet ? `Sheet ${sheet} — ` : ''}
        {eyebrow}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`text-balance text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.08] font-medium ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`text-base md:text-lg leading-relaxed ${light ? 'text-white/70' : 'text-ink-muted'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
