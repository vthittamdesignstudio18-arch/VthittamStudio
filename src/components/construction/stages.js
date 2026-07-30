// Stage map for the scroll-driven "plot to villa" sequence.
// `range` values are fractions [0..1] of the total scroll progress of the
// pinned hero section. Every animated element in VillaScene.jsx reads its
// timing from these ranges, so this file is the single source of truth
// for pacing the whole build sequence.

export const FLOOR_COUNT = 15 // upper floors, stacked above the double-height ground floor

export const STAGES = [
  {
    id: 'plot',
    code: 'S-00',
    label: 'Empty Plot',
    caption: 'A 0.6-acre commercial plot in Trichy. Surveyed, staked, and cleared for a landmark build.',
    range: [0.0, 0.06],
  },
  {
    id: 'blueprint',
    code: 'S-01',
    label: 'Blueprint',
    caption: 'Massing, setbacks, and a 16-storey footprint are resolved before ground is broken.',
    range: [0.06, 0.14],
  },
  {
    id: 'foundation',
    code: 'S-02',
    label: 'Foundation',
    caption: 'A deep raft foundation and pile caps are poured to carry a tower of this scale.',
    range: [0.14, 0.21],
  },
  {
    id: 'columns',
    code: 'S-03',
    label: 'Columns',
    caption: 'A reinforced concrete column grid rises, ready to carry every floor above it.',
    range: [0.21, 0.29],
  },
  {
    id: 'firstFloor',
    code: 'S-04',
    label: 'First Floor',
    caption: 'A double-height ground floor lands first — lobby, retail frontage, and the building\u2019s address.',
    range: [0.29, 0.36],
  },
  {
    id: 'floors',
    code: 'S-05',
    label: 'Multiple Floors',
    caption: 'Floor by floor, the tower climbs — fifteen levels of commercial space stacking skyward.',
    range: [0.36, 0.6],
  },
  {
    id: 'walls',
    code: 'S-06',
    label: 'Exterior Walls',
    caption: 'The structural frame is enclosed, giving the tower its first solid, finished silhouette.',
    range: [0.6, 0.69],
  },
  {
    id: 'facade',
    code: 'S-07',
    label: 'Glass Facade',
    caption: 'A unitized curtain wall wraps the frame in floor-to-ceiling glass, level by level.',
    range: [0.69, 0.8],
  },
  {
    id: 'lighting',
    code: 'S-08',
    label: 'Lighting',
    caption: 'As dusk falls, the facade lights from within and a beacon marks the skyline.',
    range: [0.8, 0.9],
  },
  {
    id: 'finished',
    code: 'S-09',
    label: 'Completed Building',
    caption: 'Transforming Vision Into Architectural Reality.',
    range: [0.9, 1.0],
  },
]

// Convenience lookup: T.walls -> [0.35, 0.46]
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
