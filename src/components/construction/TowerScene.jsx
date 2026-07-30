import { motion, useTransform } from 'framer-motion'
import { T, FLOOR_COUNT } from './stages.js'
import { useReveal, useStaggeredReveal } from './useReveal.js'

// ---------------------------------------------------------------------------
// Geometry — a 16-storey commercial tower: a double-height ground floor
// (lobby / retail) plus FLOOR_COUNT stacked upper floors, a mechanical
// crown, and a spire beacon. Each repeated member gets its own component so
// hooks run in a stable order rather than inside a .map() callback.
// ---------------------------------------------------------------------------

const CENTER_X = 600
const TOWER_W = 300
const TOWER_X0 = CENTER_X - TOWER_W / 2 // 450
const GROUND_Y = 560
const GROUND_FLOOR_TOP = 480 // double-height ground floor: 560 -> 480
const FLOOR_H = 26
const TOWER_TOP = GROUND_FLOOR_TOP - FLOOR_COUNT * FLOOR_H // roofline, y = 90

function Column({ progress, x, index, count }) {
  const reveal = useStaggeredReveal(progress, T.columns, index, count, 0.6, 0.45)
  return (
    <motion.rect
      x={x - 7}
      y={498}
      width={14}
      height={62}
      fill="#A9A093"
      style={{ scaleY: reveal, transformOrigin: `${x}px 560px` }}
    />
  )
}

// Bare structural floor slab — the "skeleton" that appears during the
// Multiple Floors stage, one level at a time.
function FloorSlab({ progress, index, count, y }) {
  const reveal = useStaggeredReveal(progress, T.floors, index, count, 0.82, 0.32)
  return (
    <motion.g style={{ scaleY: reveal, transformOrigin: `${CENTER_X}px ${y + FLOOR_H}px`, opacity: reveal }}>
      <rect x={TOWER_X0} y={y} width={TOWER_W} height={FLOOR_H} fill="#C7C1B5" opacity={0.55} />
      <rect x={TOWER_X0} y={y + FLOOR_H - 3} width={TOWER_W} height={3} fill="#8D8574" />
      {/* exposed column stubs, one per bay */}
      {[0, 1, 2, 3, 4].map((c) => (
        <rect key={c} x={TOWER_X0 + 20 + c * 65 - 4} y={y} width={8} height={FLOOR_H} fill="#B8B0A0" opacity={0.7} />
      ))}
    </motion.g>
  )
}

// Solid wall panel — slides up into place over each slab once the frame
// is enclosed (Exterior Walls stage).
function WallPanel({ progress, index, count, y }) {
  const reveal = useStaggeredReveal(progress, T.walls, index, count, 0.75, 0.4)
  const translateY = useTransform(reveal, [0, 1], [16, 0])
  const tone = index % 5 === 0 ? '#8E8779' : '#9A9384'
  return (
    <motion.g style={{ opacity: reveal, y: translateY }}>
      <rect x={TOWER_X0} y={y} width={TOWER_W} height={FLOOR_H} fill={tone} />
      <rect x={TOWER_X0} y={y} width={TOWER_W} height={FLOOR_H} fill="url(#tw-concrete-hatch)" opacity="0.5" />
    </motion.g>
  )
}

// A single window-lit cell used to build the crossfaded night-glow layer.
function GlowCell({ x, y, w, h, flicker, delay }) {
  const opacity = useTransform(flicker, (v) => {
    const on = Math.sin((v + delay) * 21) > -0.15
    return on ? 0.9 : 0.12
  })
  return <motion.rect x={x} y={y} width={w} height={h} fill="#FFD79B" style={{ opacity }} />
}

export default function TowerScene({ progress, isMobile, reduceMotion = false }) {
  const noExtras = isMobile || reduceMotion

  // ---- Sky: daylight -> blueprint navy -> daylight -> dusk -> night --------
  const skyTop = useTransform(
    progress,
    [0, T.blueprint[0], (T.blueprint[0] + T.blueprint[1]) / 2, T.blueprint[1], T.lighting[0], T.lighting[1], 1],
    ['#EAF0F3', '#EAF0F3', '#0E2439', '#EAF0F3', '#E7EEF2', '#2B3A55', '#0A1526']
  )
  const skyBottom = useTransform(
    progress,
    [0, T.blueprint[0], (T.blueprint[0] + T.blueprint[1]) / 2, T.blueprint[1], T.lighting[0], T.lighting[1], 1],
    ['#F9F7F2', '#F9F7F2', '#16324A', '#F9F7F2', '#F6E9DD', '#C97A5C', '#4A2E3C']
  )

  const groundColor = useTransform(
    progress,
    [0, T.foundation[0], T.lighting[0], 1],
    ['#C6BFAE', '#B4ACA0', '#8D8879', '#57544C']
  )

  const sunCx = useTransform(progress, [0, T.lighting[0], 1], [1010, 760, 300])
  const sunCy = useTransform(progress, [0, T.floors[1], T.lighting[1], 1], [150, 70, 430, 470])
  const sunColor = useTransform(progress, [0, T.lighting[0], T.lighting[1], 1], ['#FFF6E0', '#FFF6E0', '#FFC488', '#F2F4EA'])
  const sunR = useTransform(progress, [0, T.lighting[0], T.lighting[1], 1], [32, 30, 22, 16])
  const sunOpacity = useTransform(progress, [0, T.lighting[1] - 0.01, T.lighting[1] + 0.01], [0.95, 0.95, 0.85])

  // ---- Blueprint overlay ----------------------------------------------------
  const bpMid = (T.blueprint[0] + T.blueprint[1]) / 2
  const bpGridOpacity = useTransform(progress, [T.blueprint[0], bpMid, T.blueprint[1]], [0, 0.5, 0])
  const bpOutline = useReveal(progress, [T.blueprint[0], bpMid], 1)
  const bpFade = useTransform(progress, [bpMid, T.blueprint[1]], [1, 0])

  // Boundary stakes, only relevant before the blueprint appears
  const stakesOpacity = useTransform(progress, [T.plot[1] - 0.01, T.plot[1]], [1, 0], { clamp: true })

  // ---- Foundation -------------------------------------------------------
  const foundationReveal = useReveal(progress, T.foundation)

  // ---- Ground / first floor ---------------------------------------------
  const groundFloorReveal = useReveal(progress, T.firstFloor, 0.75)
  const lobbyGlassOpacity = useTransform(progress, [T.firstFloor[0] + 0.02, T.firstFloor[1]], [0, 1], { clamp: true })

  // ---- Facade & lighting overlays ----------------------------------------
  const facadeReveal = useReveal(progress, T.facade, 0.8)
  const facadeScaleX = useTransform(facadeReveal, [0, 1], [0.85, 1])
  const lightingReveal = useReveal(progress, T.lighting, 0.85)
  const bloomOpacity = useTransform(lightingReveal, [0, 1], [0, 0.5])
  const flicker = progress // reused as a pseudo-random driver for window glow

  // Rooftop beacon blink, active from Lighting stage onward
  const beaconBase = useTransform(progress, [T.lighting[0], T.lighting[0] + 0.02], [0, 1], { clamp: true })
  const beaconBlink = useTransform(progress, (v) => (Math.sin(v * 140) > 0.2 ? 1 : 0.25))
  const beaconOpacity = useTransform([beaconBase, beaconBlink], ([b, blink]) => b * blink)

  // ---- Construction crane, present until the walls close up -------------
  const craneOpacity = useTransform(progress, [T.floors[1] - 0.02, T.walls[0] + 0.02], [1, 0], { clamp: true })
  const craneJibSwing = useTransform(progress, [0, T.walls[0]], [0, noExtras ? 0 : -10])

  // Finished — ambient settle
  const finishedGlow = useTransform(progress, [T.finished[0], 1], [0, 0.05])
  const groundShadowOpacity = useReveal(progress, T.finished, 0.6)

  // ---- Cinematic camera: a slow push-in + gentle upward pan as the tower
  // climbs, so the building keeps growing more dominant in frame right up
  // to the final reveal.
  const camScale = useTransform(progress, [0, T.floors[1], T.facade[1], 1], [0.92, 1.0, 1.07, 1.14])
  const camY = useTransform(progress, [0, 1], [0, noExtras ? -14 : -34])

  const columnCount = isMobile ? 4 : 5
  const columnXs = isMobile ? [480, 555, 645, 720] : [470, 535, 600, 665, 730]

  const floorYs = Array.from({ length: FLOOR_COUNT }, (_, i) => GROUND_FLOOR_TOP - (i + 1) * FLOOR_H)

  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tw-sky-grad" x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0%" style={{ stopColor: skyTop }} />
          <motion.stop offset="100%" style={{ stopColor: skyBottom }} />
        </linearGradient>
        <linearGradient id="tw-glass-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BFDCEA" />
          <stop offset="55%" stopColor="#9FC2D6" />
          <stop offset="100%" stopColor="#7FA6BE" />
        </linearGradient>
        <pattern id="tw-mullions" width="30" height={FLOOR_H} patternUnits="userSpaceOnUse">
          <rect width="30" height={FLOOR_H} fill="url(#tw-glass-grad)" />
          <rect x="0" y="0" width="30" height={FLOOR_H} fill="none" stroke="#4C5A63" strokeWidth="1.4" />
        </pattern>
        <pattern id="tw-concrete-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#524940" strokeWidth="1" strokeOpacity="0.16" />
        </pattern>
        {!noExtras && (
          <filter id="tw-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        <clipPath id="tw-tower-clip">
          <rect x={TOWER_X0} y={TOWER_TOP} width={TOWER_W} height={GROUND_Y - TOWER_TOP} />
        </clipPath>
      </defs>

      <motion.g style={{ scale: camScale, y: camY, transformOrigin: `${CENTER_X}px ${GROUND_Y}px` }}>
        {/* Sky */}
        <rect x="0" y="0" width="1200" height="700" fill="url(#tw-sky-grad)" />

        {/* Sun / dusk glow */}
        <motion.circle
          cx={sunCx}
          cy={sunCy}
          r={sunR}
          style={{ fill: sunColor, opacity: sunOpacity }}
          filter={!noExtras ? 'url(#tw-soft-glow)' : undefined}
        />

        {/* Distant skyline for scale contrast — quiet, small, human-scaled */}
        <g opacity="0.14">
          <rect x="50" y="470" width="34" height="90" fill="#1F1F1F" />
          <rect x="96" y="500" width="26" height="60" fill="#1F1F1F" />
          <rect x="1060" y="480" width="30" height="80" fill="#1F1F1F" />
          <rect x="1104" y="510" width="24" height="50" fill="#1F1F1F" />
        </g>

        {/* Ground plane */}
        <motion.rect x="0" y={GROUND_Y} width="1200" height={700 - GROUND_Y} style={{ fill: groundColor }} />
        <rect x="0" y={GROUND_Y} width="1200" height="4" fill="#00000010" />

        {/* Plot boundary stakes — empty-plot stage only */}
        <motion.g style={{ opacity: stakesOpacity }}>
          <line x1="120" y1={GROUND_Y} x2="120" y2={GROUND_Y - 24} stroke="#524940" strokeWidth="3" />
          <line x1="1080" y1={GROUND_Y} x2="1080" y2={GROUND_Y - 24} stroke="#524940" strokeWidth="3" />
          <line x1="120" y1={GROUND_Y - 10} x2="1080" y2={GROUND_Y - 10} stroke="#524940" strokeWidth="1.5" strokeDasharray="10 8" />
          <text x="120" y={GROUND_Y - 32} fontSize="13" fill="#524940" fontFamily="Inter, sans-serif">A</text>
          <text x="1072" y={GROUND_Y - 32} fontSize="13" fill="#524940" fontFamily="Inter, sans-serif">B</text>
        </motion.g>

        {/* Blueprint overlay */}
        <motion.g style={{ opacity: bpGridOpacity }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 68} y1="0" x2={i * 68} y2="700" stroke="#CFE8FA" strokeWidth="1" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 68} x2="1200" y2={i * 68} stroke="#CFE8FA" strokeWidth="1" />
          ))}
        </motion.g>
        <motion.g style={{ opacity: bpFade }}>
          <motion.rect
            x={TOWER_X0} y={TOWER_TOP} width={TOWER_W} height={GROUND_Y - TOWER_TOP}
            fill="none" stroke="#8FD1FF" strokeWidth="2.5" strokeDasharray="8 6"
            style={{ pathLength: bpOutline }}
          />
          <g opacity="0.8">
            <circle cx="1080" cy="90" r="26" fill="none" stroke="#8FD1FF" strokeWidth="1.5" />
            <line x1="1080" y1="70" x2="1080" y2="110" stroke="#8FD1FF" strokeWidth="1.5" />
            <line x1="1080" y1="64" x2="1074" y2="76" stroke="#8FD1FF" strokeWidth="1.5" />
            <line x1="1080" y1="64" x2="1086" y2="76" stroke="#8FD1FF" strokeWidth="1.5" />
            <text x="1080" y="132" fontSize="12" fill="#8FD1FF" textAnchor="middle" fontFamily="Inter, sans-serif">N</text>
          </g>
          <text x={TOWER_X0} y={TOWER_TOP - 14} fontSize="13" fill="#CFE8FA" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
            TOWER FOOTPRINT — G+16
          </text>
        </motion.g>

        {/* Foundation slab */}
        <motion.rect
          x={TOWER_X0 - 20} y="544" width={TOWER_W + 40} height="18" fill="#8A8578"
          style={{ scaleX: foundationReveal, transformOrigin: `${CENTER_X}px 560px` }}
        />

        {/* Columns rising from foundation to underside of ground floor */}
        {columnXs.map((x, i) => (
          <Column key={x} progress={progress} x={x} index={i} count={columnCount} />
        ))}

        {/* Construction crane — a working-site cue during the raw build stages */}
        <motion.g style={{ opacity: craneOpacity }}>
          <rect x="1000" y="140" width="10" height="420" fill="#B34A3A" />
          <motion.g style={{ x: craneJibSwing }}>
            <rect x="860" y="132" width="220" height="8" fill="#B34A3A" />
            <line x1="1005" y1="140" x2="900" y2="132" stroke="#7A2E22" strokeWidth="3" />
            <line x1="1005" y1="140" x2="1060" y2="132" stroke="#7A2E22" strokeWidth="3" />
            <line x1="900" y1="140" x2="900" y2="175" stroke="#7A2E22" strokeWidth="2" />
            <circle cx="900" cy="180" r="4" fill="#2B2B2B" />
          </motion.g>
        </motion.g>

        {/* Double-height ground floor — lobby & retail frontage */}
        <motion.g style={{ scaleY: groundFloorReveal, transformOrigin: `${CENTER_X}px ${GROUND_Y}px` }}>
          <rect x={TOWER_X0} y={GROUND_FLOOR_TOP} width={TOWER_W} height={GROUND_Y - GROUND_FLOOR_TOP} fill="#B7AF9F" />
          <motion.rect
            x={TOWER_X0 + 14} y={GROUND_FLOOR_TOP + 10} width={TOWER_W - 28} height={GROUND_Y - GROUND_FLOOR_TOP - 20}
            fill="url(#tw-glass-grad)" style={{ opacity: lobbyGlassOpacity }}
          />
          {[1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={TOWER_X0 + (TOWER_W / 5) * i} y1={GROUND_FLOOR_TOP + 10}
              x2={TOWER_X0 + (TOWER_W / 5) * i} y2={GROUND_Y - 10}
              stroke="#4C5A63" strokeWidth="2"
            />
          ))}
          <rect x={TOWER_X0} y={GROUND_FLOOR_TOP - 4} width={TOWER_W} height="4" fill="#8D8574" />
        </motion.g>

        {/* Upper floors — bare structural slabs, revealed one by one */}
        {floorYs.map((y, i) => (
          <FloorSlab key={`slab-${i}`} progress={progress} index={i} count={FLOOR_COUNT} y={y} />
        ))}

        {/* Exterior walls — solid panels slide up over the bare frame */}
        <g clipPath="url(#tw-tower-clip)">
          {floorYs.map((y, i) => (
            <WallPanel key={`wall-${i}`} progress={progress} index={i} count={FLOOR_COUNT} y={y} />
          ))}
        </g>

        {/* Glass curtain-wall facade — wraps the frame in one coherent skin */}
        <motion.g
          clipPath="url(#tw-tower-clip)"
          style={{ opacity: facadeReveal, scaleX: facadeScaleX, transformOrigin: `${CENTER_X}px ${GROUND_Y}px` }}
        >
          <rect x={TOWER_X0} y={TOWER_TOP} width={TOWER_W} height={GROUND_Y - TOWER_TOP} fill="url(#tw-mullions)" />
          <rect x={TOWER_X0} y={TOWER_TOP} width={10} height={GROUND_Y - TOWER_TOP} fill="#FFFFFF" opacity="0.18" />
        </motion.g>

        {/* Interior lighting glow — floors flicker on as dusk falls */}
        <motion.g clipPath="url(#tw-tower-clip)" style={{ opacity: lightingReveal }}>
          {floorYs.map((y, i) => (
            <GlowCell key={`glow-${i}`} x={TOWER_X0 + 6} y={y + 4} w={TOWER_W - 12} h={FLOOR_H - 8} flicker={flicker} delay={i * 1.7} />
          ))}
          <GlowCell x={TOWER_X0 + 14} y={GROUND_FLOOR_TOP + 10} w={TOWER_W - 28} h={GROUND_Y - GROUND_FLOOR_TOP - 20} flicker={flicker} delay={2.3} />
        </motion.g>

        {/* Bloom around the tower silhouette once lit */}
        {!noExtras && (
          <motion.rect
            x={TOWER_X0 - 16} y={TOWER_TOP - 16} width={TOWER_W + 32} height={GROUND_Y - TOWER_TOP + 32}
            fill="none" stroke="#FFD79B" strokeWidth="10"
            style={{ opacity: bloomOpacity }}
            filter="url(#tw-soft-glow)"
          />
        )}

        {/* Mechanical crown + spire beacon */}
        <rect x={CENTER_X - 60} y={TOWER_TOP - 34} width="120" height="34" fill="#6E675A" />
        <rect x={CENTER_X - 6} y={TOWER_TOP - 78} width="12" height="44" fill="#3A362F" />
        <motion.circle cx={CENTER_X} cy={TOWER_TOP - 82} r="6" fill="#FF5C4D" style={{ opacity: beaconOpacity }} filter={!noExtras ? 'url(#tw-soft-glow)' : undefined} />

        {/* Finished — ground shadow + ambient warm wash */}
        <motion.ellipse
          cx={CENTER_X} cy={GROUND_Y + 4} rx="220" ry="18" fill="#1F1F1F"
          style={{ opacity: useTransform(groundShadowOpacity, [0, 1], [0, 0.18]) }}
        />
        <motion.rect x="0" y="0" width="1200" height="700" fill="#FFC98A" style={{ opacity: finishedGlow }} pointerEvents="none" />
      </motion.g>
    </svg>
  )
}
