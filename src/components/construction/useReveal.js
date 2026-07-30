import { useTransform } from 'framer-motion'

/**
 * Climbs 0 -> 1 starting at `start`, finishing at `start + (end-start)*settle`,
 * then holds at 1 for the remainder of the stage window. Holds at 0 before
 * `start`. Gives each element room to "land" before the next stage begins,
 * instead of animating across the full width of its stage.
 */
export function useReveal(progress, [start, end], settle = 0.65) {
  const finish = start + (end - start) * settle
  return useTransform(progress, [start, finish], [0, 1], { clamp: true })
}

/**
 * Same as useReveal, but for staggered members of a group (columns, windows,
 * trees, slats...). index/count spread the reveal across the first `spread`
 * fraction of the stage window, each item animating over `duration` fraction.
 */
export function useStaggeredReveal(progress, [start, end], index, count, spread = 0.55, duration = 0.4) {
  const window = end - start
  const step = count > 1 ? (window * spread) / (count - 1) : 0
  const itemStart = start + index * step
  const itemEnd = itemStart + window * duration
  return useTransform(progress, [itemStart, Math.min(itemEnd, end)], [0, 1], { clamp: true })
}
