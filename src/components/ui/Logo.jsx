/**
 * Official V Thittam Design Studio lockup.
 *
 * The supplied artwork is a single horizontal lockup — the V mark, the Tamil
 * wordmark (திட்டம்), a rule, and "Design Studio" beneath it. It is used
 * exactly as delivered; nothing here redraws, re-letters or rearranges it.
 * Only the ink colour varies, so the same mark can sit on either background:
 *
 *   tone="dark"  — original brown ink, for light surfaces (navbar)
 *   tone="light" — the same artwork in white, for dark surfaces (footer)
 *
 * The wordmark is pixels, so an accessible name is supplied via alt text.
 */

const SOURCES = {
  dark: { src: '/brand/logo.webp', src2x: '/brand/logo@2x.webp' },
  light: { src: '/brand/logo-light.webp', src2x: '/brand/logo-light@2x.webp' },
}

/** Intrinsic ratio of the trimmed artwork (536 × 160) — pins width so the
 *  navbar never reflows while the image decodes. */
const ASPECT = 536 / 160

export default function Logo({ tone = 'dark', height = 44, className = '', priority = false }) {
  const { src, src2x } = SOURCES[tone] ?? SOURCES.dark

  return (
    <img
      src={src}
      srcSet={`${src} 1x, ${src2x} 2x`}
      alt="V Thittam Design Studio"
      width={Math.round(height * ASPECT)}
      height={height}
      style={{ height: `${height}px` }}
      className={`block w-auto select-none ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
    />
  )
}
