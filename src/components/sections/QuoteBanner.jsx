import { ArrowRight } from 'lucide-react'
import { Link } from '../../lib/router.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import Button from '../ui/Button.jsx'

/**
 * Closing call to action. Sits between the contact details and the footer so
 * the path to /quote is there at the end of the scroll, not only in the navbar.
 */
export default function QuoteBanner() {
  return (
    <section aria-labelledby="quote-banner-heading" className="py-16 sm:py-20 md:py-24 bg-stone-surface border-t border-hairline">
      <Container>
        <SectionHeading
          id="quote-banner-heading"
          sheet="A-12"
          eyebrow="Start Here"
          title="Tell us what you want to build. We'll tell you what it takes."
          description="Share your site and the idea you have in mind — we'll handle the rest, from the first sketch to the final coat."
          align="center"
        />

        <FadeIn delay={0.15} className="mt-10 flex justify-center">
          <Button as={Link} to="/quote" variant="primary">
            Get a Free Quote
            <ArrowRight size={16} />
          </Button>
        </FadeIn>
      </Container>
    </section>
  )
}
