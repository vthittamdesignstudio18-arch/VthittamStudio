import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import { processSteps } from '../../data/content.js'

export default function Process() {
  return (
    <section id="process" className="py-28 md:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          sheet="A-08"
          eyebrow="How We Work"
          title="Six stages, from first conversation to keys in hand."
          align="center"
        />

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 relative">
          {processSteps.map((step, i) => (
            <FadeIn key={step.code} delay={0.08 * i} className="relative">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-full bg-ink text-white flex items-center justify-center">
                  <step.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="sheet-label">Step {step.code}</span>
                  <h3 className="font-display text-xl mt-0.5">{step.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-sm">{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
