export const designPackages = [
  {
    id: 'basic',
    name: 'Basic',
    summary: 'Concept Design',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    summary: 'Concept Design + Working Drawings',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    summary: 'Concept Design + Working Drawings + Interior',
    popular: true,
  },
  {
    id: 'ultra',
    name: 'Ultra Premium',
    summary: 'Concept + Working Drawings + Interior + Material Selection',
    popular: false,
  },
]

// value: true | false | string (for office visits / delivery time rows)
export const comparisonRows = [
  { feature: 'Scheme Drawing — All Floors (2D)', values: [true, true, true, true] },
  { feature: 'Furniture Layout — All Floors (2D)', values: [false, true, true, true] },
  { feature: 'Elevation Design (3D)', values: [false, true, true, true] },
  { feature: 'Electrical Drawings — All Floors (2D)', values: [false, true, true, true] },
  { feature: 'Plumbing Drawing — All Floors (2D)', values: [false, true, true, true] },
  { feature: 'Working Drawing — All Floors (2D)', values: [false, false, true, true] },
  { feature: 'Structural Drawings', values: [false, false, true, true] },
  { feature: 'Site Assessment & Site Plan', values: [false, false, true, true] },
  { feature: 'Elevation Detail Drawing (2D)', values: [false, false, true, true] },
  { feature: 'Hall Layout — All Floors (3D)', values: [false, false, true, true] },
  { feature: 'Interior Views — All Rooms (3D)', values: [false, false, true, true] },
  { feature: 'Interior Detailing — All Rooms (2D)', values: [false, false, true, true] },
  { feature: 'Soil Testing Report', values: [false, false, false, true] },
  { feature: 'Material & Brand Selection', values: [false, false, false, true] },
  { feature: 'Landscape Architecture Design', values: [false, false, false, true] },
  { feature: 'Topographical Survey', values: [false, false, false, true] },
  { feature: 'Approval Drawing', values: [false, false, false, true] },
]

export const comparisonMeta = [
  { feature: 'Office Visits', values: ['—', '—', 'Max 4', 'Max 8'] },
  {
    feature: 'Delivery Time',
    values: ['6 Working Days', '20 Working Days', '30 Working Days', '45 Working Days'],
  },
]
