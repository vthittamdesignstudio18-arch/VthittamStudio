import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Star } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FadeIn from '../ui/FadeIn.jsx'
import Button from '../ui/Button.jsx'
import { designPackages, comparisonRows, comparisonMeta } from '../../data/packages.js'

function CheckCell({ included }) {
  return included ? (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-clay-600/20 text-clay-800"
      aria-label="Included"
    >
      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
    </span>
  ) : (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 text-ink/60"
      aria-label="Not included"
    >
      <X size={13} strokeWidth={2} aria-hidden="true" />
    </span>
  )
}

export default function DesignPackage() {
  const [openPkg, setOpenPkg] = useState(0)

  return (
    <section id="design-package" className="py-20 sm:py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          sheet="A-06"
          eyebrow="Design Package"
          title="Choose the drawing set your project stage needs."
          description="Every tier builds on the one before it — start with a concept, or take the full working set through to material selection."
          note="Architect-led designs executed on site by experienced engineers, delivering quality construction from foundation to finish."
          align="center"
        />

        {/* Pricing cards */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {designPackages.map((pkg, i) => (
            <FadeIn key={pkg.id} delay={i * 0.08} className="relative">
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-ink text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  <Star size={11} className="fill-current" /> Most Popular
                </div>
              )}
              <div
                className={`h-full rounded-2xl p-7 flex flex-col transition-all duration-500 ${
                  pkg.popular
                    ? 'bg-ink text-white shadow-2xl scale-[1.03]'
                    : 'card-hairline hover:-translate-y-1'
                }`}
              >
                <h3 className="font-display text-xl">{pkg.name}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${pkg.popular ? 'text-white/70' : 'text-ink-muted'}`}>
                  {pkg.summary}
                </p>
                <Button
                  variant={pkg.popular ? 'outline' : 'primary'}
                  className={`mt-7 w-full ${pkg.popular ? '!border-white/25 !text-white hover:!bg-white hover:!text-ink' : ''}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop / tablet comparison table */}
        <FadeIn className="mt-16 md:mt-20 hidden md:block">
          <div className="card-hairline overflow-hidden">
            <div className="max-h-[560px] overflow-y-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr>
                    <th className="text-left font-body font-medium text-ink-muted px-6 py-5 border-b border-hairline w-[30%]">
                      Feature
                    </th>
                    {designPackages.map((pkg) => (
                      <th
                        key={pkg.id}
                        className={`px-4 py-5 border-b border-hairline text-center font-display font-medium text-base ${
                          pkg.popular ? 'bg-clay-50' : ''
                        }`}
                      >
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, ri) => (
                    <tr key={row.feature} className={ri % 2 === 1 ? 'bg-stone-surface/50' : ''}>
                      <td className="px-6 py-4 border-b border-hairline text-ink/80">{row.feature}</td>
                      {row.values.map((val, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-4 border-b border-hairline text-center ${
                            designPackages[ci].popular ? 'bg-clay-50/60' : ''
                          }`}
                        >
                          <CheckCell included={val} />
                        </td>
                      ))}
                    </tr>
                  ))}

                  {comparisonMeta.map((row) => (
                    <tr key={row.feature} className="bg-ink/[0.03] font-medium">
                      <td className="px-6 py-4 border-b border-hairline text-ink">{row.feature}</td>
                      {row.values.map((val, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-4 border-b border-hairline text-center text-ink/80 ${
                            designPackages[ci].popular ? 'bg-clay-50/60' : ''
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Mobile accordion */}
        <div className="mt-14 md:hidden flex flex-col gap-4">
          {designPackages.map((pkg, pi) => (
            <div key={pkg.id} className="card-hairline overflow-hidden">
              <button
                onClick={() => setOpenPkg(openPkg === pi ? -1 : pi)}
                className="w-full flex items-center justify-between px-5 py-4"
              >
                <span className="font-display text-lg">{pkg.name}</span>
                <motion.span animate={{ rotate: openPkg === pi ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openPkg === pi && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 flex flex-col divide-y divide-hairline">
                      {comparisonRows.map((row) => (
                        <div key={row.feature} className="flex items-center justify-between py-3">
                          <span className="text-sm text-ink/75 pr-4">{row.feature}</span>
                          <CheckCell included={row.values[pi]} />
                        </div>
                      ))}
                      {comparisonMeta.map((row) => (
                        <div key={row.feature} className="flex items-center justify-between py-3">
                          <span className="text-sm font-medium text-ink pr-4">{row.feature}</span>
                          <span className="text-sm text-ink-muted text-right">{row.values[pi]}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
