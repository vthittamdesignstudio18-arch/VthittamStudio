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

/** Caption set matching the frames actually rendered at this viewport. */
export const stagesFor = (compact) => (compact ? [STAGES[0], STAGES[STAGES.length - 1]] : STAGES)

/**
 * How long each stage holds before the next crossfade begins (ms).
 *
 * WCAG 2.2.2 requires a pause/stop/hide mechanism for motion that starts on
 * its own and runs for more than five seconds. At the previous 1150ms the
 * sequence totalled ~6.45s (5 x 1150 + a 700ms caption fade) and had no such
 * control. 850ms brings the whole thing to ~4.95s, which keeps the intro
 * intact and takes it out of scope — a cleaner outcome than bolting a skip
 * button onto a five-second animation.
 */
export const STAGE_DWELL = 850

/** Crossfade length between two stages (ms). Also used by the CSS transition. */
export const STAGE_FADE = 900
