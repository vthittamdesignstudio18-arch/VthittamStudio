import { Target, Eye, HeartHandshake } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import ResponsiveImage, { SIZES } from '../ui/ResponsiveImage.jsx'

const pillars = [
  {
    icon: Target,
    title: 'Mission : Design + Execution',
    text: 'Every project is designed by qualified architects and supervised by experienced site engineers, ensuring every detail is built as intended.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'To be the studio Trichy trusts for timeless design that improves everyday living, not just square footage.',
  },
  {
    icon: HeartHandshake,
    title: 'Values',
    text: 'Honest budgeting, considered material choices, and a stress-free client experience from planning through handover.',
  },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-20 sm:py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-14 lg:gap-10 items-center">
          <FadeIn direction="right" className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <ResponsiveImage
                base="/projects/residential/residential-image-3"
                widths={[400, 800]}
                ratio={0.667}
                sizes={SIZES.aboutPortrait}
                alt="Brick and render residence in Trichy completed by V Thittam Design Studio"
                fill
                position="center"
              />
            </div>
            <aside className="hidden md:flex absolute -bottom-8 -right-8 h-40 w-40 rounded-2xl bg-white card-hairline shadow-xl items-center justify-center flex-col p-6 text-center">
              <span className="font-display text-3xl">5+</span>
              <span className="text-xs uppercase tracking-widest2 text-ink-muted mt-1">
                Years in Practice
              </span>
            </aside>
          </FadeIn>

          <div className="lg:col-span-7">
            <SectionHeading
              id="about-heading"
              sheet="A-01"
              eyebrow="The Studio"
              title="Design built on planning, not guesswork."
              description="At V Thittam Design Studio, we believe every successful project begins with thoughtful planning and innovative design."
            />

            <FadeIn delay={0.15} className="mt-8 max-w-xl text-ink-muted leading-relaxed">
              Experienced architects design every project with precision, while our experienced site
              engineers ensure every drawing is executed accurately on site. This seamless collaboration
              bridges design and construction, delivering spaces exactly as envisioned.
            </FadeIn>

            <ul className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 list-none">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="card-hairline p-6">
                  <pillar.icon size={20} aria-hidden="true" className="text-clay-700" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
