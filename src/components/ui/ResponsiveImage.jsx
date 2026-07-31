/**
 * Responsive image.
 *
 * Every project photograph exists on disk at several widths
 * (name-400.webp … name-1800.webp). This picks the right one per viewport
 * via srcset/sizes instead of shipping a desktop-sized file to a phone.
 *
 * Layout stability: `ratio` is the image's true aspect ratio, so width and
 * height attributes are always in proportion to the real file and the
 * browser can reserve the exact box before the bytes arrive. Nothing shifts
 * (CLS), and nothing stretches — cropping is done by object-fit, never by
 * distorting the picture.
 *
 * Two modes:
 *   fill  — absolutely fills a parent that defines the box (gallery tiles,
 *           cover banners). Uses object-cover + a configurable focal point.
 *   flow  — sits in normal flow at its own aspect ratio (drawings, portraits
 *           that must be seen whole). Uses object-contain by default.
 */

const DEFAULT_WIDTHS = [400, 800, 1200, 1800]

export default function ResponsiveImage({
  base,                    // '/projects/interior/interior-image-5' (no width, no extension)
  widths = DEFAULT_WIDTHS,
  ratio = 16 / 9,
  alt,
  sizes = '100vw',
  fill = false,
  fit = fill ? 'cover' : 'contain',
  position = 'center',
  priority = false,
  className = '',
  wrapperClassName = '',
}) {
  const available = widths.length ? widths : DEFAULT_WIDTHS
  const srcSet = available.map((w) => `${base}-${w}.webp ${w}w`).join(', ')

  // Fallback for browsers that ignore srcset — a middle width, not the largest.
  const fallbackWidth = available[Math.min(1, available.length - 1)]
  const nominal = available[available.length - 1]

  const img = (
    <img
      src={`${base}-${fallbackWidth}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={nominal}
      height={Math.round(nominal / ratio)}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
      className={
        fill
          ? `absolute inset-0 h-full w-full ${className}`
          : `h-auto w-full ${className}`
      }
      style={{ objectFit: fit, objectPosition: position }}
    />
  )

  if (fill) return img

  // Reserve the box in normal flow so late-loading images never push content.
  return (
    <span
      className={`block overflow-hidden ${wrapperClassName}`}
      style={{ aspectRatio: String(ratio) }}
    >
      {img}
    </span>
  )
}

/**
 * `sizes` values, kept here so the numbers stay honest against the layouts
 * that actually use them rather than being guessed at each call site.
 */
export const SIZES = {
  // Gallery grid: 2 columns under md, 3 columns above, inside a 1400px container.
  galleryTile: '(min-width: 1400px) 440px, (min-width: 768px) 31vw, 47vw',
  // Category cover banner: full container width.
  cover: '(min-width: 1400px) 1400px, 100vw',
  // Lightbox: nearly the full viewport, capped by the container.
  lightbox: '(min-width: 1024px) 80vw, 92vw',
  // Two-up feature images in the interior section.
  featurePair: '(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 47vw',
  // Single portrait feature in the About section.
  aboutPortrait: '(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw',
  // Planning drawing, roughly five of twelve columns.
  drawing: '(min-width: 640px) 40vw, 90vw',
}
