import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { processSteps } from '../../data/content.js'

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="How We Process"
          align="center"
        />

        <ol className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-14 relative list-none">
          {processSteps.map((step) => (
            <li key={step.code} className="relative">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-full bg-ink text-white flex items-center justify-center">
                  <step.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <span className="sheet-label">Step {step.code}</span>
                  <h3 className="font-display text-xl mt-0.5">{step.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-sm">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
