import { motion, useTransform } from 'framer-motion'
import { T } from './stages.js'
import { useReveal, useStaggeredReveal } from './useReveal.js'

// ---------------------------------------------------------------------------
// Small repeated members get their own component so each can call hooks
// normally (one instance = one stable hook order), rather than calling
// hooks inside an inline .map() callback.
// ---------------------------------------------------------------------------

function Column({ progress, x, index, count }) {
  const reveal = useStaggeredReveal(progress, T.columns, index, count, 0.6, 0.45)
  return (
    <motion.rect
      x={x - 8}
      y={260}
      width={16}
      height={260}
      fill="#B8AE9E"
      style={{ scaleY: reveal, transformOrigin: `${x}px 520px` }}
    />
  )
}

function WindowPane({ progress, x, y, w, h, index, count, glow }) {
  const reveal = useStaggeredReveal(progress, T.windows, index, count, 0.6, 0.5)
  const scale = useTransform(reveal, [0, 1], [0.72, 1])
  const opacity = reveal
  const glass = useTransform(
    progress,
    [T.finished[0], T.finished[0] + 0.05],
    ['#B9D3DE', '#FFD59A']
  )
  return (
    <motion.g style={{ opacity, scale, transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}>
      <rect x={x} y={y} width={w} height={h} fill="#2B2F33" />
      <motion.rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} style={{ fill: glow ? glass : '#B9D3DE' }} />
      <line x1={x + w / 2} y1={y + 2} x2={x + w / 2} y2={y + h - 2} stroke="#2B2F33" strokeWidth="1.5" />
      <line x1={x + 2} y1={y + h / 2} x2={x + w - 2} y2={y + h / 2} stroke="#2B2F33" strokeWidth="1.5" />
      <line x1={x + w - 6} y1={y + 4} x2={x + 6} y2={y + h - 4} stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
    </motion.g>
  )
}

function Slat({ progress, x, index, count }) {
  const reveal = useStaggeredReveal(progress, T.materials, index, count, 0.5, 0.4)
  const tone = index % 2 === 0 ? '#6E5439' : '#8A6B4B'
  return (
    <motion.rect
      x={x}
      y={380}
      width={7}
      height={140}
      fill={tone}
      style={{ scaleY: reveal, transformOrigin: `${x + 3.5}px 520px` }}
    />
  )
}

function Tree({ progress, x, cy, scale, index, reduceMotion }) {
  const reveal = useStaggeredReveal(progress, T.landscape, index, 4, 0.5, 0.5)
  const sway = useTransform(progress, [T.landscape[1], 1], [0, reduceMotion ? 0 : index % 2 === 0 ? 2 : -2])
  return (
    <motion.g style={{ scale: reveal, transformOrigin: `${x}px 520px`, opacity: reveal }}>
      <rect x={x - 4} y={480} width={8} height={40} fill="#6E6151" />
      <motion.g style={{ x: sway, transformOrigin: `${x}px ${cy}px` }}>
        <circle cx={x} cy={cy} r={30 * scale} fill="#8A9770" />
        <circle cx={x - 14 * scale} cy={cy + 10 * scale} r={20 * scale} fill="#93A374" />
        <circle cx={x + 15 * scale} cy={cy + 8 * scale} r={22 * scale} fill="#7C8B5C" />
      </motion.g>
    </motion.g>
  )
}

function Bollard({ progress, x, index }) {
  const reveal = useStaggeredReveal(progress, T.landscape, index, 4, 0.7, 0.3)
  const glow = useTransform(progress, [T.finished[0], 1], [0.15, 0.9])
  return (
    <motion.g style={{ opacity: reveal }}>
      <rect x={x - 3} y={498} width={6} height={22} fill="#524940" />
      <motion.circle cx={x} cy={496} r={5} fill="#FFD9A0" style={{ opacity: glow }} />
    </motion.g>
  )
}

// ---------------------------------------------------------------------------

export default function VillaScene({ progress, isMobile, reduceMotion = false }) {
  const noExtras = isMobile || reduceMotion
  // Sky — dips into a dark "blueprint mode" navy for the blueprint stage,
  // then resolves through neutral daylight to a golden dusk at handover.
  const skyTop = useTransform(
    progress,
    [0, T.blueprint[0], (T.blueprint[0] + T.blueprint[1]) / 2, T.blueprint[1], T.materials[1], T.landscape[1], 1],
    ['#EFE9DE', '#EFE9DE', '#0E2439', '#EFE9DE', '#E3ECEE', '#D8ECEF', '#F4C98A']
  )
  const skyBottom = useTransform(
    progress,
    [0, T.blueprint[0], (T.blueprint[0] + T.blueprint[1]) / 2, T.blueprint[1], T.materials[1], T.landscape[1], 1],
    ['#FBF9F4', '#FBF9F4', '#16324A', '#FBF9F4', '#F8F5EF', '#F1F8EF', '#FCE7C2']
  )

  const groundColor = useTransform(
    progress,
    [0, T.foundation[0], T.materials[0], T.landscape[0], T.landscape[1]],
    ['#C9AD82', '#B7AFA0', '#C7BFAE', '#A9BB86', '#8FAE72']
  )

  const wallColor = useTransform(
    progress,
    [T.walls[0], T.materials[0], T.materials[1]],
    ['#D6D0C4', '#D6D0C4', '#9C9184']
  )
  const upperWallColor = useTransform(
    progress,
    [T.walls[0], T.materials[0], T.materials[1]],
    ['#CAC4B8', '#CAC4B8', '#888073']
  )

  const sunCx = useTransform(progress, [0, T.materials[1], 1], [980, 640, 260])
  const sunCy = useTransform(progress, [0, T.roof[1], T.landscape[1], 1], [190, 90, 140, 250])
  const sunColor = useTransform(progress, [0, T.materials[1], T.landscape[1], 1], ['#FFF6E0', '#FFF6E0', '#FFE3B0', '#FFB35C'])
  const sunR = useTransform(progress, [0, T.landscape[1], 1], [34, 30, 46])

  // Blueprint overlay
  const bpMid = (T.blueprint[0] + T.blueprint[1]) / 2
  const bpGridOpacity = useTransform(progress, [T.blueprint[0], bpMid, T.blueprint[1]], [0, 0.5, 0])
  const bpOutline = useReveal(progress, [T.blueprint[0], bpMid], 1)
  const bpFade = useTransform(progress, [bpMid, T.blueprint[1]], [1, 0])

  // Stakes visible only for the empty-plot stage
  const stakesOpacity = useTransform(progress, [T.plot[1] - 0.015, T.plot[1]], [1, 0], { clamp: true })

  // Foundation
  const foundationReveal = useReveal(progress, T.foundation)

  // Walls
  const wallReveal = useReveal(progress, T.walls, 0.7)
  const wingReveal = useReveal(progress, [T.walls[0] + 0.02, T.walls[1]], 0.7)

  // Roof
  const roofY = useTransform(progress, [T.roof[0], T.roof[0] + (T.roof[1] - T.roof[0]) * 0.7], [60, 225], { clamp: true })
  const roofOpacity = useTransform(progress, [T.roof[0], T.roof[0] + 0.02], [0, 1], { clamp: true })
  const roofShadow = useReveal(progress, T.roof, 0.9)

  // Materials accents
  const stoneReveal = useReveal(progress, T.materials, 0.55)
  const textureReveal = useReveal(progress, [T.materials[0] + 0.05, T.materials[1]], 0.7)

  // Landscaping
  const driveReveal = useReveal(progress, T.landscape, 0.5)
  const poolReveal = useReveal(progress, [T.landscape[0] + 0.1, T.landscape[1]], 0.6)
  const hedgeReveal = useReveal(progress, [T.landscape[0], T.landscape[1]], 0.35)

  // Finished
  const groundShadow = useReveal(progress, T.finished, 0.6)
  const finishedGlow = useTransform(progress, [T.finished[0], 1], [0, 1])

  // Whole-scene parallax drift for a subtle sense of depth while pinned
  const sceneY = useTransform(progress, [0, 1], [0, -18])

  const columnCount = isMobile ? 4 : 5
  const columnXs = isMobile ? [380, 470, 560, 650] : [370, 470, 570, 670, 750]

  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0%" style={{ stopColor: skyTop }} />
          <motion.stop offset="100%" style={{ stopColor: skyBottom }} />
        </linearGradient>
        <linearGradient id="pool-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE0EA" />
          <stop offset="100%" stopColor="#7FAFC4" />
        </linearGradient>
        <pattern id="stone-pattern" width="30" height="18" patternUnits="userSpaceOnUse">
          <rect width="30" height="18" fill="#B3A18C" />
          <rect x="1" y="1" width="13" height="7" fill="#C6B8A8" />
          <rect x="16" y="1" width="13" height="7" fill="#A8967F" />
          <rect x="1" y="10" width="13" height="7" fill="#A8967F" />
          <rect x="16" y="10" width="13" height="7" fill="#C6B8A8" />
        </pattern>
        <pattern id="concrete-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#524940" strokeWidth="1" strokeOpacity="0.18" />
        </pattern>
        {!noExtras && (
          <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <motion.g style={{ y: sceneY }}>
        {/* Sky */}
        <rect x="0" y="0" width="1200" height="700" fill="url(#sky-grad)" />

        {/* Sun */}
        <motion.circle cx={sunCx} cy={sunCy} r={sunR} style={{ fill: sunColor }} filter={!noExtras ? 'url(#soft-glow)' : undefined} opacity={0.9} />

        {/* Distant skyline, very quiet */}
        <g opacity="0.12">
          <rect x="60" y="430" width="40" height="90" fill="#1F1F1F" />
          <rect x="120" y="400" width="30" height="120" fill="#1F1F1F" />
          <rect x="1050" y="410" width="34" height="110" fill="#1F1F1F" />
          <rect x="1110" y="440" width="26" height="80" fill="#1F1F1F" />
        </g>

        {/* Ground plane */}
        <motion.rect x="0" y="520" width="1200" height="180" style={{ fill: groundColor }} />

        {/* Plot boundary stakes — only relevant before the blueprint appears */}
        <motion.g style={{ opacity: stakesOpacity }}>
          <line x1="150" y1="520" x2="150" y2="495" stroke="#524940" strokeWidth="3" />
          <line x1="1050" y1="520" x2="1050" y2="495" stroke="#524940" strokeWidth="3" />
          <line x1="150" y1="505" x2="1050" y2="505" stroke="#524940" strokeWidth="1.5" strokeDasharray="10 8" />
          <text x="150" y="485" fontSize="13" fill="#524940" fontFamily="Inter, sans-serif">A</text>
          <text x="1042" y="485" fontSize="13" fill="#524940" fontFamily="Inter, sans-serif">B</text>
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
            x="350" y="260" width="400" height="260"
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
          <text x="350" y="245" fontSize="13" fill="#CFE8FA" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
            FOOTPRINT — 400 x 260
          </text>
        </motion.g>

        {/* Foundation slab */}
        <motion.rect
          x="330" y="512" width="440" height="16" fill="#8A8578"
          style={{ scaleX: foundationReveal, transformOrigin: '550px 520px' }}
        />

        {/* Side wing (depth cue) */}
        <motion.polygon
          points="750,520 900,520 928,300 780,300"
          fill="#A79E8E"
          style={{ scaleY: wingReveal, transformOrigin: '780px 520px' }}
        />

        {/* Columns */}
        {columnXs.map((x, i) => (
          <Column key={x} progress={progress} x={x} index={i} count={columnCount} />
        ))}

        {/* Main wall block */}
        <motion.rect x="350" y="380" width="400" height="140" style={{ fill: wallColor, scaleY: wallReveal, transformOrigin: '550px 520px' }} />
        <motion.rect x="350" y="260" width="400" height="120" style={{ fill: upperWallColor, scaleY: wallReveal, transformOrigin: '550px 520px' }} />

        {/* Material accents */}
        <motion.rect x="350" y="380" width="90" height="140" fill="url(#stone-pattern)" style={{ opacity: stoneReveal }} />
        <motion.rect x="350" y="260" width="400" height="120" fill="url(#concrete-hatch)" style={{ opacity: textureReveal }} />
        {Array.from({ length: 12 }).map((_, i) => (
          <Slat key={i} progress={progress} x={560 + i * 8.2} index={i} count={12} />
        ))}

        {/* Feature double-height glazing */}
        <WindowPane progress={progress} x={660} y={272} w={78} h={246} index={0} count={4} glow />
        {/* Ground + first floor punched windows */}
        <WindowPane progress={progress} x={385} y={425} w={54} h={68} index={1} count={4} glow />
        <WindowPane progress={progress} x={385} y={292} w={54} h={58} index={2} count={4} glow />
        <WindowPane progress={progress} x={480} y={292} w={54} h={58} index={3} count={4} glow />

        {/* Roof */}
        <motion.g style={{ opacity: roofOpacity }}>
          <motion.rect x="310" y={roofY} width="480" height="34" fill="#3A362F" />
          <motion.line x1="310" y1={roofY} x2="790" y2={roofY} stroke="#1F1F1F" strokeWidth="2" />
          <motion.ellipse cx="550" cy="530" rx="230" ry="14" fill="#1F1F1F" style={{ opacity: useTransform(roofShadow, [0, 1], [0, 0.14]) }} />
        </motion.g>

        {/* Landscaping */}
        <motion.rect x="150" y="505" width="900" height="9" fill="#6E7F52" style={{ scaleX: hedgeReveal, transformOrigin: '600px 510px' }} />
        <motion.polygon points="560,700 660,700 610,520 570,520" fill="#D8CFBE" style={{ scaleY: driveReveal, transformOrigin: '600px 700px' }} />
        <motion.g style={{ opacity: poolReveal }}>
          <rect x="800" y="555" width="180" height="52" fill="url(#pool-grad)" rx="3" />
          <line x1="810" y1="575" x2="970" y2="575" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="810" y1="588" x2="970" y2="588" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
        </motion.g>
        <Tree progress={progress} x={225} cy={455} scale={1} index={0} reduceMotion={reduceMotion} />
        <Tree progress={progress} x={285} cy={470} scale={0.8} index={1} reduceMotion={reduceMotion} />
        {!isMobile && <Tree progress={progress} x={955} cy={460} scale={0.9} index={2} reduceMotion={reduceMotion} />}
        {!isMobile && <Tree progress={progress} x={1010} cy={478} scale={0.7} index={3} reduceMotion={reduceMotion} />}
        <Bollard progress={progress} x={575} index={0} />
        <Bollard progress={progress} x={600} index={1} />
        <Bollard progress={progress} x={625} index={2} />
        <Bollard progress={progress} x={650} index={3} />

        {/* Finished — ground shadow + ambient glow wash */}
        <motion.ellipse cx="550" cy="522" rx="230" ry="16" fill="#1F1F1F" style={{ opacity: useTransform(groundShadow, [0, 1], [0, 0.16]) }} />
        <motion.rect x="0" y="0" width="1200" height="700" fill="#FFC98A" style={{ opacity: useTransform(finishedGlow, [0, 1], [0, 0.06]) }} pointerEvents="none" />
      </motion.g>
    </svg>
  )
}
