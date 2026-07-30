import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export default function Counter({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  const displayRef = useRef(null)

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </motion.span>
  )
}
