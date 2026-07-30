import { Palette, Sofa, LampCeiling } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'

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
    <section id="interior-design" className="py-28 md:py-36 bg-ink text-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <SectionHeading
              sheet="A-04"
              eyebrow="Interior Design"
              light
              title="Interiors that continue the architecture, room by room."
              description="Our interior design carries the same discipline as our architecture — space planning, materials, and furniture layouts developed together, not bolted on afterward."
            />

            <div className="mt-10 flex flex-col gap-6">
              {focusAreas.map((area, i) => (
                <FadeIn key={area.title} delay={0.1 * i} className="flex gap-4 items-start">
                  <div className="h-11 w-11 shrink-0 rounded-full border border-white/20 flex items-center justify-center">
                    <area.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{area.title}</h3>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed max-w-md">{area.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn direction="left" className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop"
                alt="Warm minimal living room interior"
                className="rounded-2xl object-cover w-full h-64 md:h-80 mt-10"
              />
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900&auto=format&fit=crop"
                alt="Minimal dining space interior with natural materials"
                className="rounded-2xl object-cover w-full h-64 md:h-80"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
