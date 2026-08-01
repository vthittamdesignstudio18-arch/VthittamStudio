import * as Icons from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Counter from '../ui/Counter.jsx'
import { whyChooseUs, stats } from '../../data/content.js'

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="why-heading"
              sheet="A-07"
              eyebrow="Why Choose Us"
              title="Five years of decisions we'd make the same way twice."
              description="Every project runs through the same standards — regardless of size, budget, or how visible the work ends up being."
            />

            <div className="mt-10 md:mt-12 grid grid-cols-2 gap-6 sm:gap-8 max-w-xs">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest2 text-ink-muted leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 list-none">
            {whyChooseUs.map((item) => {
              const Icon = Icons[item.icon] ?? Icons.Gem
              return (
                <li key={item.title} className="card-hairline p-6 bg-white">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="text-clay-700" />
                  <h3 className="mt-4 font-display text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
