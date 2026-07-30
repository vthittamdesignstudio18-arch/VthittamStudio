import * as Icons from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import { services } from '../../data/services.js'

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 bg-stone-surface">
      <Container>
        <SectionHeading
          sheet="A-02"
          eyebrow="What We Do"
          title="Twelve disciplines, one point of accountability."
          description="Every service is delivered by the same core team, so your design intent survives all the way through to the site."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = Icons[service.icon] ?? Icons.Compass
            return (
              <FadeIn key={service.code} delay={(i % 3) * 0.08} className="group">
                <div className="h-full card-hairline p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(31,31,31,0.08)] hover:border-clay-400/50">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-stone-bg border border-hairline flex items-center justify-center transition-colors duration-500 group-hover:bg-ink group-hover:border-ink">
                      <Icon size={20} strokeWidth={1.5} className="text-ink transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <span className="sheet-label !text-[10px] mt-1">{service.code}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">{service.description}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
