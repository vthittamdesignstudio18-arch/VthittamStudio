import { useEffect, useState } from 'react'
import { STAGE_FADE } from './journeyStages.js'

// ---------------------------------------------------------------------------
// Five photographs crossfaded once, on load, to show a plot becoming a
// finished residence — then held on the final frame permanently.
//
// Pure CSS opacity/transform transitions: no scroll listeners, no motion
// values, no per-frame JavaScript.
//
// Sizing is left to the browser via srcset/sizes rather than a JS media
// query. That matters for LCP: the preload scanner can start fetching the
// correctly-sized first frame before React has even parsed, whereas a
// JS-chosen src cannot begin downloading until hydration.
// ---------------------------------------------------------------------------

const PHOTOS = [
  { id: 'plot',        base: '/journey/01-plot',        alt: 'Cleared and surveyed residential plot at dusk, staked and ready for construction in Trichy' },
  { id: 'blueprint',   base: '/journey/02-blueprint',   alt: 'Architectural blueprint and setting-out markings overlaid on the building plot' },
  { id: 'wireframe',   base: '/journey/03-wireframe',   alt: 'Structural wireframe of the villa rising from the plot during the design stage' },
  { id: 'development', base: '/journey/04-development', alt: 'Villa under construction with structural frame, glazing and external materials going in' },
  { id: 'finished',    base: '/journey/05-final',       alt: 'Completed luxury villa at dusk with swimming pool, landscaping and warm interior lighting' },
]

export const PHOTO_COUNT = PHOTOS.length

/** 900w mobile crop and 1536w desktop master exist for every frame. */
const srcSetFor = (base) => `${base}-mobile.webp 900w, ${base}.webp 1536w`
const SIZES = '100vw'

export const LCP_IMAGE = {
  src: `${PHOTOS[0].base}.webp`,
  srcSet: srcSetFor(PHOTOS[0].base),
  sizes: SIZES,
}

export default function PhotoJourneyScene({ activeIndex, reduceMotion = false }) {
  const [placeholderVisible, setPlaceholderVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPlaceholderVisible(false), 700)
    return () => clearTimeout(t)
  }, [])

  // Warm the next frame so its crossfade doesn't wait on the network.
  useEffect(() => {
    const next = PHOTOS[activeIndex + 1]
    if (!next) return
    const img = new Image()
    img.sizes = SIZES
    img.srcset = srcSetFor(next.base)
    img.src = `${next.base}.webp`
  }, [activeIndex])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0E0E0C]">
      {/* 32px placeholder, inlined by the browser almost instantly, so the
          hero is never a blank black rectangle on a slow connection. */}
      <img
        src={`${PHOTOS[0].base}-tiny.webp`}
        alt=""
        aria-hidden="true"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover scale-105 pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: placeholderVisible ? 1 : 0 }}
      />

      {PHOTOS.map((photo, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        const isLast = i === PHOTO_COUNT - 1
        return (
          <div
            key={photo.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${STAGE_FADE}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            <img
              src={`${photo.base}.webp`}
              srcSet={srcSetFor(photo.base)}
              sizes={SIZES}
              // Only the resting frame carries the accessible description;
              // the four transitional frames are decorative.
              alt={isLast ? photo.alt : ''}
              aria-hidden={!isLast}
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
              style={{
                objectPosition: 'center',
                transform: reduceMotion || isActive || isPast ? 'scale(1)' : 'scale(1.05)',
                transition: reduceMotion
                  ? 'none'
                  : `transform ${STAGE_FADE + 600}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchpriority={i === 0 ? 'high' : 'auto'}
              decoding={i === 0 ? 'sync' : 'async'}
              draggable={false}
            />
          </div>
        )
      })}

      {/* Filmic grade: a fixed, non-animated gradient wash that keeps the five
          stills reading as one continuous shot. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35 mix-blend-multiply" />
    </div>
  )
}
