import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { constructionStages } from '../../data/construction.js'

/** Stages per row on lg — drives both the stagger and the timeline connectors. */
const COLUMNS = 3

export default function ConstructionPackage() {
  return (
    <section id="construction-package" aria-labelledby="construction-heading" className="py-20 sm:py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-surface">
      <Container>
        <SectionHeading
          id="construction-heading"
          sheet="A-05"
          eyebrow="Construction Package"
          title="One team, accountable from foundation to final coat."
          description="Turnkey construction management structured into nine stages, each signed off before the next begins."
          align="center"
        />

        <div className="mt-12 md:mt-20 relative">
          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-x-6 lg:gap-y-16 list-none">
            {constructionStages.map((stage, i) => {
              const isRowEnd = (i + 1) % COLUMNS === 0

              return (
                <li key={stage.code} className="relative flex lg:flex-col gap-5 lg:gap-0">
                  {/* Timeline spine — links each stage to the next across the row */}
                  {!isRowEnd && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute top-6 left-12 -right-6 h-px bg-ink/10"
                    />
                  )}

                  <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-white border-2 border-ink flex items-center justify-center font-display text-sm z-10 relative">
                      {i + 1}
                    </div>
                  </div>
                  <div className="lg:mt-7">
                    <span className="sheet-label">{stage.code}</span>
                    <h3 className="mt-2 font-display text-xl">{stage.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-[280px]">
                      {stage.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
