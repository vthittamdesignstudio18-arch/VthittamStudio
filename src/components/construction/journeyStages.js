/**
 * The five stages of the studio's build sequence, shown once as the opening
 * animation on the home page.
 *
 * Previously each stage owned a slice of a scroll range. The sequence now
 * plays on a timer at load and then stops, so a stage carries a dwell time
 * instead of a scroll window.
 */
export const STAGES = [
  {
    id: 'plot',
    code: 'C-01',
    label: 'Plot',
    caption: 'A cleared residential plot in Trichy. Surveyed and staked, ready for a landmark build.',
  },
  {
    id: 'blueprint',
    code: 'C-02',
    label: 'Blueprint',
    caption: 'Structural, electrical, and plumbing engineering resolved into one buildable working set.',
  },
  {
    id: 'wireframe',
    code: 'C-03',
    label: 'Structure',
    caption: 'The structural frame takes form — walls, rooms, and volume emerging on schedule.',
  },
  {
    id: 'development',
    code: 'C-04',
    label: 'Finishing',
    caption: 'Materials, glazing, and texture land under audit — every finish checked before it proceeds.',
  },
  {
    id: 'finished',
    code: 'C-05',
    label: 'Handover',
    caption: 'Transforming vision into architectural reality.',
  },
]

/** How long each stage holds before the next crossfade begins (ms). */
export const STAGE_DWELL = 1150

/** Crossfade length between two stages (ms). Also used by the CSS transition. */
export const STAGE_FADE = 900
