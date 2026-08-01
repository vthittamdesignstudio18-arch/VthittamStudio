import * as Icons from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { services } from '../../data/services.js'

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-surface">
      <Container>
        <SectionHeading
          id="services-heading"
          sheet="A-02"
          eyebrow="What We Do"
          title="Twelve disciplines, one point of accountability."
          description="Every service is delivered by the same core team, so your design intent survives all the way through to the site."
          align="center"
        />

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 list-none">
          {services.map((service) => {
            const Icon = Icons[service.icon] ?? Icons.Compass
            return (
              <li key={service.code} className="group">
                <article className="h-full card-hairline p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(31,31,31,0.08)] hover:border-clay-400/50">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-stone-bg border border-hairline flex items-center justify-center transition-colors duration-500 group-hover:bg-ink group-hover:border-ink">
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="text-ink transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <span className="sheet-label mt-1">{service.code}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">{service.description}</p>
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
