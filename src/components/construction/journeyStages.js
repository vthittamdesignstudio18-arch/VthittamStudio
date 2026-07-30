export const STAGES = [
  {
    id: 'plot',
    code: '',
    label: '',
    caption: 'A cleared residential plot in Trichy. Surveyed and staked, ready for a landmark build.',
    range: [0.0, 0.2],
  },
  {
    id: 'blueprint',
    code: '',
    label: '',
    caption: 'Structural, electrical, and plumbing engineering resolved into one buildable working set.',
    range: [0.2, 0.4],
  },
  {
    id: 'wireframe',
    code: '',
    label: '',
    caption: 'The structural frame takes form — walls, rooms, and volume emerging on schedule.',
    range: [0.4, 0.6],
  },
  {
    id: 'development',
    code: '',
    label: '',
    caption: 'Materials, glazing, and texture land under audit — every finish checked before it proceeds.',
    range: [0.6, 0.8],
  },
  {
    id: 'finished',
    code: '',
    label: '',
    caption: 'Transforming Vision Into Architectural Reality.',
    range: [0.8, 1.0],
  },
]

export const T = STAGES.reduce((acc, s) => {
  acc[s.id] = s.range
  return acc
}, {})

export function activeStageIndex(v) {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (v >= STAGES[i].range[0]) return i
  }
  return 0
}