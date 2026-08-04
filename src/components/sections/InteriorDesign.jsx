import { Palette, Sofa, LampCeiling } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import ResponsiveImage, { SIZES } from '../ui/ResponsiveImage.jsx'

const focusAreas = [
  {
    icon: Palette,
    title: 'Material & Palette Direction',
    text: 'A restrained palette of natural materials chosen to age well, not just photograph well.',
  },
  {
    icon: Sofa,
    title: 'Space & Furniture Planning',
    text: 'Layouts tested against real furniture dimensions and everyday movement through the space.',
  },
  {
    icon: LampCeiling,
    title: 'Lighting Design',
    text: 'Layered lighting plans that shift from task to ambient without a single visible fixture out of place.',
  },
]

export default function InteriorDesign() {
  return (
    <section id="interior-design" aria-labelledby="interior-heading" className="py-20 sm:py-24 md:py-32 lg:py-36 bg-ink text-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <SectionHeading
              id="interior-heading"
              eyebrow="Interior Design"
              light
              title="Interiors that continue the architecture, room by room."
              description="Our interior design carries the same discipline as our architecture — space planning, materials, and furniture layouts developed together, not bolted on afterward."
            />

            <ul className="mt-10 flex flex-col gap-6 list-none">
              {focusAreas.map((area) => (
                <li key={area.title} className="flex gap-4 items-start">
                  <div className="h-11 w-11 shrink-0 rounded-full border border-white/20 flex items-center justify-center">
                    <area.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{area.title}</h3>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed max-w-md">{area.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <FadeIn direction="left" className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-80 mt-8 md:mt-10">
                <ResponsiveImage
                  base="/projects/interior/interior-image-8"
                  widths={[400, 800, 1200]}
                  ratio={1.778}
                  sizes={SIZES.featurePair}
                  alt="Residential living room interior with panelled feature wall and cove lighting"
                  fill
                  position="center"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-80">
                <ResponsiveImage
                  base="/projects/interior/interior-image-13"
                  widths={[400, 800, 1200]}
                  ratio={1.333}
                  sizes={SIZES.featurePair}
                  alt="L-shaped modular kitchen with open shelving and stone worktop"
                  fill
                  position="center"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
