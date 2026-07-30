// Project gallery data, grouped by category.
// Each category has a cover image (used on the collapsed accordion card)
// plus a list of gallery images shown when that category is expanded.
// All image paths point at files already in public/projects/.

export const projectCategories = [
  {
    id: 'residential',
    label: 'Residential',
    description: 'Villas, bungalows and residential blocks across Trichy.',
    cover: '/projects/residential/residential-image-1.png',
    images: [
      { src: '/projects/residential/residential-image-2.jpg', alt: 'Kovai Hills Residence' },
      { src: '/projects/residential/residential-image-3.png', alt: 'Peelamedu Residences' },
      { src: '/projects/residential/residential-image-4.png', alt: 'Ganapathy Garden Bungalow' },
      { src: '/projects/residential/residential-image-5.png', alt: 'Vadavalli Family Home' },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Offices, campuses and workplace design.',
    cover: '/projects/commercial/commercial-image-1.jpg',
    images: [
      { src: '/projects/commercial/commercial-image-1.jpg', alt: 'Rathinam Corporate Office' },
      { src: '/projects/commercial/commercial-image-2.jpg', alt: 'Sitra Innovation Campus' },
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    description: 'Interior fit-outs, penthouses and boutique retail.',
    cover: '/projects/interior/interior-image-1.jpg',
    images: [
      { src: '/projects/interior/interior-image-1.jpg', alt: 'Race Course Penthouse Interior' },
      { src: '/projects/interior/interior-image-2.jpg', alt: 'RS Puram Boutique Interior' },
      { src: '/projects/interior/interior-image-3.jpg', alt: 'Avinashi Road Flagship Store' },
      { src: '/projects/interior/interior-image-4.jpg', alt: 'RS Puram Living Room' },
      { src: '/projects/interior/interior-image-5.jpg', alt: 'Race Course Dining Space' },
    ],
  },
]
