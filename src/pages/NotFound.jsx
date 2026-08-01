import { ArrowRight, Compass } from 'lucide-react'
import { Link } from '../lib/router.jsx'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import { business, telLink } from '../config/site.js'

/**
 * 404 view.
 *
 * Previously any unmatched path rendered the home page at HTTP 200, which read
 * to a visitor as "the link worked" and to Google as a soft 404 across an
 * unbounded set of URLs. This gives both an honest answer: a real message for
 * the person, and `noindex` (set by useDocumentMeta from notFoundRoute) for
 * the crawler.
 */
export default function NotFound() {
  return (
    <section className="relative bg-stone-bg" aria-labelledby="notfound-heading">
      <Container className="flex min-h-[70svh] flex-col justify-center py-28 md:py-36">
        <div className="max-w-xl">
          <p className="sheet-label flex items-center gap-2.5">
            <Compass size={15} strokeWidth={1.5} aria-hidden="true" className="text-clay-700" />
            Sheet 404 — Page Not Found
          </p>

          <h1
            id="notfound-heading"
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.08] font-medium text-balance"
          >
            This drawing isn&rsquo;t in the set.
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-muted">
            The page you asked for doesn&rsquo;t exist — it may have been moved, or the link
            may have been mistyped. Everything the studio publishes is one step away.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button as={Link} to="/" variant="primary">
              Back to the studio
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button as={Link} to="/quote" variant="outline">
              Request a quote
            </Button>
          </div>

          <p className="mt-10 text-sm text-ink-muted">
            Looking for something specific? Call the studio on{' '}
            <a
              href={telLink(business.telephone)}
              className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink transition-colors"
            >
              {business.telephone}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
