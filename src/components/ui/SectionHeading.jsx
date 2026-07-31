/**
 * Every section is labelled like a drawing sheet from an architectural set
 * (e.g. "SHEET A-03 — SERVICES"). This is the page's signature device: it
 * borrows real vocabulary from architectural documentation instead of a
 * decorative 01/02/03 counter.
 *
 * Renders statically — headings are present immediately rather than waiting
 * on a scroll position.
 *
 * `as` exists so a section can drop to h3 where it is nested inside another
 * headed region; the default h2 is correct directly under the page h1.
 * `id` lets the parent <section> point aria-labelledby at this heading.
 */
export default function SectionHeading({
  sheet,
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  as: Heading = 'h2',
  id,
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl gap-4 md:gap-5`}>
      <p className={`sheet-label ${light ? 'text-white/70' : ''}`}>
        {sheet ? `Sheet ${sheet} — ` : ''}
        {eyebrow}
      </p>

      <Heading
        id={id}
        className={`text-balance text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] lg:leading-[1.08] font-medium ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            light ? 'text-white/80' : 'text-ink-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
