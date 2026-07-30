import { motion } from 'framer-motion'

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
}

/**
 * Generic scroll-triggered reveal. Used throughout the site instead of
 * scattering ad-hoc motion props, so every section reveals consistently.
 */
export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  scale = false,
}) {
  const offset = directions[direction] ?? directions.up
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      initial={{ opacity: 0, ...offset, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
