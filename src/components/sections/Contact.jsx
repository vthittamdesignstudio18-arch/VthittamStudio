import { Phone, Mail, MapPin, Clock, Check, ArrowRight } from 'lucide-react'
import { Link } from '../../lib/router.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import Button from '../ui/Button.jsx'

const assurances = [
  'A reply within one business day',
  'Your brief read by a principal architect, not a sales desk',
  'A written proposal before any commitment',
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          sheet="A-11"
          eyebrow="Get In Touch"
          title="Tell us about your site and your plans."
          description="Book a consultation and we'll respond within one business day with next steps."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FadeIn direction="right" className="lg:col-span-5 flex flex-col gap-6">
            <div className="card-hairline p-8 flex flex-col gap-6">
              {[
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                { icon: Mail, label: 'Email', value: 'studio@vthittam.com' },
                { icon: MapPin, label: 'Studio Address', value: 'No. 48, 1st Floor, SG Complex, Puthur Main Road, Trichy - 620017' },
                { icon: Clock, label: 'Business Hours', value: 'Mon – Sat, 10:00 AM – 7:00 PM' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-stone-surface flex items-center justify-center">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest2 text-ink-muted">{item.label}</div>
                    <div className="mt-1 text-sm text-ink">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-hairline overflow-hidden h-64">
              <iframe
                title="Studio location map"
                className="w-full h-full grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9382792348674!2d78.6803376!3d10.816035399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d5a7255b03%3A0xc216173da9b89f54!2sTHITTAM%20DESIGN%20STUDIO%20%7C%20ARCHITECTURE%20FIRM%20%7C%20INTERIOR%20DESIGNER!5e0!3m2!1sen!2sin!4v1785442589771!5m2!1sen!2sin"
              />
            </div>
          </FadeIn>

          <FadeIn
            direction="left"
            delay={0.1}
            className="lg:col-span-7 card-hairline p-8 md:p-10 flex flex-col justify-center gap-7"
          >
            <div>
              <span className="sheet-label">Project Enquiry</span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl leading-[1.15]">
                Every project begins with a conversation about your site.
              </h3>
            </div>

            <p className="text-ink-muted leading-relaxed max-w-md">
              Send us the plot, the scope and the budget you have in mind. We'll come back with an
              honest read on feasibility, an indicative cost, and the drawings your project will need.
            </p>

            <ul className="flex flex-col gap-3">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-clay-600" />
                  {item}
                </li>
              ))}
            </ul>

            <Button as={Link} to="/quote" variant="primary" className="self-start">
              Get a Free Quote
              <ArrowRight size={16} />
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
