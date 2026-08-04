import { useEffect } from 'react'
import { useLocation } from '../lib/router.jsx'

import ConstructionHero from '../components/sections/ConstructionHero.jsx'
import About from '../components/sections/About.jsx'
import Projects from '../components/sections/Projects.jsx'
import InteriorDesign from '../components/sections/InteriorDesign.jsx'
import ConstructionPackage from '../components/sections/ConstructionPackage.jsx'
import DesignPackage from '../components/sections/DesignPackage.jsx'
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx'
import Process from '../components/sections/Process.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import FAQ from '../components/sections/FAQ.jsx'
import Contact from '../components/sections/Contact.jsx'
import QuoteBanner from '../components/sections/QuoteBanner.jsx'

export default function HomePage() {
  const { state } = useLocation()
  const pendingSection = state?.scrollTo

  /**
   * When a nav link is clicked from another route we land here first, then
   * scroll to the requested section once the sections have mounted.
   */
  useEffect(() => {
    if (!pendingSection) return

    const frame = requestAnimationFrame(() => {
      document.getElementById(pendingSection)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [pendingSection])

  return (
    <>
      <ConstructionHero />
      <About />
      <Projects />
      <InteriorDesign />
      <ConstructionPackage />
      <DesignPackage />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <QuoteBanner />
    </>
  )
}
