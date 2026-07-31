// Project gallery data, grouped by category.
//
// Each entry names a *base* path. The matching files on disk are
// `<base>-400.webp`, `-800.webp`, `-1200.webp` and (where the source was
// large enough) `-1800.webp`, so <ResponsiveImage> can serve a phone a
// phone-sized file. `widths` lists only the sizes that actually exist —
// nothing is upscaled past its source.
//
// `ratio` is the true aspect ratio of the photograph, used to reserve layout
// space before the image loads.
//
// `alt` describes the photograph for screen readers and search engines.
// `title` is the short caption shown in the interface. They are deliberately
// separate: alt should describe, a caption should label.

export const projectCategories = [
  {
    id: 'residential',
    label: 'Residential',
    heading: 'Residential Architecture',
    description: 'Villas, bungalows and independent homes across Trichy and Tamil Nadu.',
    cover: { base: '/projects/residential/residential-image-1', widths: [400, 800, 1200], ratio: 1.777 },
    images: [
      {
        base: '/projects/residential/residential-image-1',
        widths: [400, 800, 1200], ratio: 1.777,
        title: 'Contemporary Villa — Street Elevation',
        alt: 'Contemporary two-storey villa in Trichy with carport, stone-clad facade and landscaped entry',
      },
      {
        base: '/projects/residential/residential-image-3',
        widths: [400, 800], ratio: 0.667,
        title: 'Brick & Render Residence',
        alt: 'Modern residence with exposed brick and white render facade, timber entrance door and planted balcony',
      },
      {
        base: '/projects/residential/residential-image-4',
        widths: [400, 800, 1200], ratio: 1.5,
        title: 'Split-Level Residence at Dusk',
        alt: 'Split-level luxury home design lit at dusk with covered car porch and cantilevered upper floor',
      },
      {
        base: '/projects/residential/residential-image-5',
        widths: [400, 800, 1200], ratio: 1.432,
        title: 'Duplex Residence — Evening Elevation',
        alt: 'Duplex house elevation in grey and timber finish photographed in the evening',
      },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    heading: 'Commercial Architecture',
    description: 'Auditoriums, offices and public-facing spaces built for daily use.',
    cover: { base: '/projects/commercial/commercial-image-2', widths: [400, 800, 1200, 1800], ratio: 1.778 },
    images: [
      {
        base: '/projects/commercial/commercial-image-2',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Auditorium — Seating & Acoustic Ceiling',
        alt: 'Commercial auditorium interior with tiered seating and linear acoustic ceiling lighting',
      },
      {
        base: '/projects/commercial/commercial-image-1',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Auditorium — Stage & Screen',
        alt: 'Auditorium stage with projection screen, approach steps and timber wall detailing',
      },
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    heading: 'Interior Design',
    description: 'Bedrooms, living spaces and modular kitchens finished end to end.',
    cover: { base: '/projects/interior/interior-image-5', widths: [400, 800, 1200, 1800], ratio: 1.778 },
    images: [
      {
        base: '/projects/interior/interior-image-5',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Master Bedroom — Seating Corner',
        alt: 'Master bedroom interior with walnut wall panelling, upholstered headboard and a seating corner',
      },
      {
        base: '/projects/interior/interior-image-1',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Master Bedroom — Wood Panelled Wall',
        alt: 'Bedroom with wood panelled accent wall, recessed cove lighting and sculptural ceiling light',
      },
      {
        base: '/projects/interior/interior-image-4',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Bedroom — Upholstered Headboard',
        alt: 'Residential bedroom interior with fluted wardrobe, upholstered headboard and matching bedside tables',
      },
      {
        base: '/projects/interior/interior-image-7',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Bedroom — Teal Feature Wall',
        alt: 'Bedroom with teal feature wall, round mirror and sputnik chandelier',
      },
      {
        base: '/projects/interior/interior-image-12',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Bedroom — Arched Wall Panelling',
        alt: 'Bedroom interior with arched wall panelling, teal accent wall and indoor planting',
      },
      {
        base: '/projects/interior/interior-image-11',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Bedroom — Full-Height Wardrobe',
        alt: 'Bedroom with full-height wardrobe, chandelier and patterned floor rug',
      },
      {
        base: '/projects/interior/interior-image-6',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Bedroom — Media Wall & Study',
        alt: 'Bedroom media wall with wall-mounted television, built-in study desk and accent chair',
      },
      {
        base: '/projects/interior/interior-image-10',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Bedroom — Wardrobe & Dresser Wall',
        alt: 'Bedroom wardrobe wall with marble-backed television panel and dresser mirror',
      },
      {
        base: '/projects/interior/interior-image-2',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Bedroom — Bedside Detail',
        alt: 'Bedroom detail showing neutral linen bedding and a floral arrangement on a bedside table',
      },
      {
        base: '/projects/interior/interior-image-3',
        widths: [400, 800, 1200, 1800], ratio: 1.778,
        title: 'Living Room — Herringbone Flooring',
        alt: 'Residential living room with herringbone timber flooring, dark rug and green sofa',
      },
      {
        base: '/projects/interior/interior-image-8',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Living Room — Panelled Feature Wall',
        alt: 'Living room interior with panelled feature wall, green sofa and cove lighting',
      },
      {
        base: '/projects/interior/interior-image-14',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Living Room — Sage & Olive Palette',
        alt: 'Living room in a sage and olive palette with slatted window blinds and low seating',
      },
      {
        base: '/projects/interior/interior-image-9',
        widths: [400, 800, 1200], ratio: 1.778,
        title: 'Modular Kitchen — Walnut Finish',
        alt: 'Modular kitchen in walnut finish with tall units and integrated appliances',
      },
      {
        base: '/projects/interior/interior-image-13',
        widths: [400, 800, 1200], ratio: 1.333,
        title: 'Modular Kitchen — L-Shaped Layout',
        alt: 'L-shaped modular kitchen with open shelving, stone worktop and under-cabinet lighting',
      },
    ],
  },
]

/**
 * Drawing work, kept deliberately separate from the photographed projects.
 * A plan sheet is design output, not a completed build, so it sits outside
 * the project counts rather than padding them.
 */
export const planningDrawings = [
  {
    base: '/projects/residential/residential-image-2',
    widths: [400, 800], ratio: 1.111,
    title: 'Floor Plan & Space Planning Study',
    alt: 'Ground floor and first floor plan drawings with open kitchen space planning and appliance layout analysis',
    caption:
      'Ground and first floor layouts worked through alongside an appliance and circulation study — the stage where a plan is tested before anything is built.',
  },
]

/** Total photographs on show, used in the section intro copy. */
export const totalProjectPhotos = projectCategories.reduce((n, c) => n + c.images.length, 0)
