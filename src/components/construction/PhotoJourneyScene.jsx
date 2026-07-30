import { useRef, useState, useEffect } from 'react'
import { motion, useTransform } from 'framer-motion'
import { T } from './journeyStages.js'

// ---------------------------------------------------------------------------
// Five real photographs, crossfaded and gently drifted (Ken Burns) across the
// pinned scroll range. GPU-only cost: transform (scale, translate) + opacity.
// No blur, no filters, no canvas, no WebGL — this is what keeps 60fps on
// low-end mobile while still reading as "cinematic."
//
// Overlap strategy: each layer's fade window is widened past its own stage
// boundary (FADE_OVERLAP on either side), so two photographs are always
// partially visible together mid-transition. That overlap — not a hard cut —
// is what makes the transformation read as continuous rather than as a slide
// change. Ranges are clamped to [0,1] so the first/last images don't try to
// fade in/out past the ends of the sequence.
// ---------------------------------------------------------------------------

const FADE_OVERLAP = 0.09

const PHOTOS = [
  {
    id: 'plot',
    stage: T.plot,
    src: '/journey/01-plot.webp',
    mobileSrc: '/journey/01-plot-mobile.webp',
    tiny: '/journey/01-plot-tiny.webp',
    alt: 'Empty surveyed plot at dusk, ready for construction',
    // Ken Burns: direction of drift while this layer is the visible one.
    fromScale: 1.0,
    toScale: 1.06,
    fromX: 0,
    toX: -10,
    fromY: 0,
    toY: -4,
  },
  {
    id: 'blueprint',
    stage: T.blueprint,
    src: '/journey/02-blueprint.webp',
    mobileSrc: '/journey/02-blueprint-mobile.webp',
    tiny: '/journey/02-blueprint-tiny.webp',
    alt: 'Architectural blueprint and construction markings overlaid on the plot',
    fromScale: 1.03,
    toScale: 1.1,
    fromX: -6,
    toX: 8,
    fromY: -2,
    toY: -8,
  },
  {
    id: 'wireframe',
    stage: T.wireframe,
    src: '/journey/03-wireframe.webp',
    mobileSrc: '/journey/03-wireframe-mobile.webp',
    tiny: '/journey/03-wireframe-tiny.webp',
    alt: 'Glowing 3D wireframe of the villa structure rising from the plot',
    fromScale: 1.02,
    toScale: 1.09,
    fromX: 6,
    toX: -8,
    fromY: -4,
    toY: -10,
  },
  {
    id: 'development',
    stage: T.development,
    src: '/journey/04-development.webp',
    mobileSrc: '/journey/04-development-mobile.webp',
    tiny: '/journey/04-development-tiny.webp',
    alt: 'Villa under construction with materials, windows, and structure taking shape',
    fromScale: 1.0,
    toScale: 1.07,
    fromX: -4,
    toX: 6,
    fromY: -2,
    toY: -8,
  },
  {
    id: 'finished',
    stage: T.finished,
    src: '/journey/05-final.webp',
    mobileSrc: '/journey/05-final-mobile.webp',
    tiny: '/journey/05-final-tiny.webp',
    alt: 'Completed luxury villa at dusk with pool, landscaping, and interior lighting',
    fromScale: 1.0,
    toScale: 1.045,
    fromX: 0,
    toX: 0,
    fromY: 0,
    toY: -6,
  },
]

const clamp01 = (v) => Math.min(1, Math.max(0, v))

function Layer({ photo, progress, isMobile, index, isFirst, reduceMotion }) {
  const [start, end] = photo.stage
  const fadeInStart = clamp01(start - FADE_OVERLAP)
  const fadeOutEnd = clamp01(end + FADE_OVERLAP)

  // Opacity: rises through the overlap zone before `start`, holds fully
  // visible through the stage's own range, then falls through the overlap
  // zone after `end`. First layer starts fully visible (nothing precedes it);
  // last layer stays fully visible once reached (nothing follows it).
  const opacityStops = isFirst
    ? [start, end, fadeOutEnd]
    : end >= 1
      ? [fadeInStart, start, end]
      : [fadeInStart, start, end, fadeOutEnd]
  const opacityRange = isFirst
    ? [1, 1, 0]
    : end >= 1
      ? [0, 1, 1]
      : [0, 1, 1, 0]

  const opacity = useTransform(progress, opacityStops, opacityRange, { clamp: true })

  // Ken Burns drift is scoped to this layer's own active window (with a touch
  // of pre/post roll so the motion doesn't start/stop abruptly right as the
  // crossfade begins) rather than the whole scroll range, so each photo has
  // its own distinct, gentle push rather than one drift shared by all five.
  // When reduceMotion is set, the drift targets collapse to their start
  // values — hooks still run in the same order every render, but nothing
  // visibly moves. The crossfade above is untouched: that's the actual
  // content transition, not decorative motion, so it never gets suppressed.
  const driftRange = [fadeInStart, fadeOutEnd]
  const scale = useTransform(progress, driftRange, reduceMotion ? [photo.fromScale, photo.fromScale] : [photo.fromScale, photo.toScale], { clamp: true })
  const x = useTransform(progress, driftRange, reduceMotion ? [photo.fromX, photo.fromX] : [photo.fromX, photo.toX], { clamp: true })
  const y = useTransform(progress, driftRange, reduceMotion ? [photo.fromY, photo.fromY] : [photo.fromY, photo.toY], { clamp: true })

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, willChange: 'opacity' }}
      aria-hidden={index !== 0}
    >
      <motion.img
        src={isMobile ? photo.mobileSrc : photo.src}
        alt={photo.alt}
        className="h-full w-full object-cover"
        style={{ scale, x, y, willChange: 'transform' }}
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchpriority={index === 0 ? 'high' : 'auto'}
        decoding={index === 0 ? 'sync' : 'async'}
        draggable={false}
      />
    </motion.div>
  )
}

export default function PhotoJourneyScene({ progress, isMobile, reduceMotion = false }) {
  // Blurred micro-placeholder for the very first paint, before the real
  // image finishes decoding — avoids a flash of empty/white background on
  // slow connections. Fades out permanently once mounted; cheap (one image,
  // one class, no motion value).
  const [placeholderVisible, setPlaceholderVisible] = useState(true)
  const hideTimer = useRef(null)

  useEffect(() => {
    hideTimer.current = setTimeout(() => setPlaceholderVisible(false), 600)
    return () => clearTimeout(hideTimer.current)
  }, [])

  // A very slight shared vertical parallax across the whole sequence — the
  // "camera" drifting up over the full scroll — layered underneath each
  // photo's own Ken Burns drift for a sense of compound depth. Kept small;
  // this is a hero image, not a 3D scene. Collapses to 0 under reduceMotion.
  const sceneY = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : isMobile ? -10 : -22])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0E0E0C]">
      <img
        src={PHOTOS[0].tiny}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-105 pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: placeholderVisible ? 1 : 0 }}
      />
      <motion.div className="absolute inset-0" style={{ y: sceneY }}>
        {PHOTOS.map((photo, i) => (
          <Layer key={photo.id} photo={photo} progress={progress} isMobile={isMobile} index={i} isFirst={i === 0} reduceMotion={reduceMotion} />
        ))}
      </motion.div>
      {/* Filmic grade: a fixed, non-animated gradient wash. This is a static
          CSS background, not a per-frame filter — zero animation cost — but
          it's what keeps the five stills reading as one continuous "shot"
          rather than a slideshow of independently-lit photos. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35 mix-blend-multiply" />
    </div>
  )
}
