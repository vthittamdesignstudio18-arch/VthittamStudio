/**
 * Layout wrapper — previously a scroll-triggered reveal.
 *
 * The studio asked for no scroll-driven motion, so this no longer animates.
 * It is kept as a component (rather than deleted and unpicked from a dozen
 * call sites) because every caller passes it a className that carries real
 * layout — grid spans, card padding, flex behaviour. It renders that markup
 * and nothing else: no framer-motion, no observers, no per-element cost.
 *
 * The `direction`, `delay`, `duration` and `scale` props are accepted and
 * ignored so existing call sites keep working untouched.
 */
export default function FadeIn({
  children,
  className = '',
  as: Tag = 'div',
  // Accepted for call-site compatibility; intentionally unused.
  direction: _direction, delay: _delay, duration: _duration, scale: _scale,
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  )
}
