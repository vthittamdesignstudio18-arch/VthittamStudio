import * as Icons from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import Counter from '../ui/Counter.jsx'
import { whyChooseUs, stats } from '../../data/content.js'

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-28 md:py-36 bg-stone-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              sheet="A-07"
              eyebrow="Why Choose Us"
              title="Twenty years of decisions we'd make the same way twice."
              description="Every project runs through the same standards — regardless of size, budget, or how visible the work ends up being."
            />

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest2 text-ink-muted leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = Icons[item.icon] ?? Icons.Gem
              return (
                <FadeIn key={item.title} delay={(i % 2) * 0.1} className="card-hairline p-6 bg-white">
                  <Icon size={20} strokeWidth={1.5} className="text-clay-600" />
                  <h3 className="mt-4 font-display text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
