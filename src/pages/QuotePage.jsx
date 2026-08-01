import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '../lib/router.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Clock, Mail, Phone } from 'lucide-react'
import Container from '../components/ui/Container.jsx'
import FadeIn from '../components/ui/FadeIn.jsx'
import Button from '../components/ui/Button.jsx'
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from '../components/ui/FloatingField.jsx'
import { quoteSteps, initialQuoteValues, resolvedQuoteFields } from '../data/quote.js'
import { business, telLink } from '../config/site.js'
import { isQuoteSubmissionConfigured, submitQuoteRequest } from '../lib/quoteSubmission.js'
import { validateField, validateQuote } from '../lib/quoteValidation.js'

const controls = {
  input: FloatingInput,
  select: FloatingSelect,
  textarea: FloatingTextarea,
}

const EASE = [0.16, 1, 0.3, 1]

export default function QuotePage() {
  const [values, setValues] = useState(initialQuoteValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  // Fields are only marked up as invalid once the visitor has left them or
  // tried to submit. Flagging an empty field the moment it is focused is
  // hostile; flagging it after they have moved on is helpful.
  const [touched, setTouched] = useState({})
  const successHeadingRef = useRef(null)

  const fieldOf = useCallback(
    (name) => resolvedQuoteFields.find((f) => f.name === name),
    []
  )

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))

    // Clear a message as soon as the input becomes acceptable, so the field
    // stops shouting while the visitor is still fixing it.
    setErrors((prev) => {
      if (!prev[name]) return prev
      const field = fieldOf(name)
      if (!field || validateField(field, value)) return prev
      const { [name]: _cleared, ...rest } = prev
      return rest
    })
  }

  function handleBlur(e) {
    const { name, value } = e.target
    const field = fieldOf(name)
    if (!field) return
    setTouched((t) => ({ ...t, [name]: true }))
    const message = validateField(field, value)
    setErrors((prev) => {
      if (!message) {
        const { [name]: _cleared, ...rest } = prev
        return rest
      }
      return { ...prev, [name]: message }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const found = validateQuote(resolvedQuoteFields, values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setTouched(Object.fromEntries(resolvedQuoteFields.map((f) => [f.name, true])))
      // Move the visitor to the first problem in document order rather than
      // leaving them at the submit button wondering what happened.
      const firstInvalid = resolvedQuoteFields.find((f) => found[f.name])
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid.name)
        el?.focus()
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const { ok, error } = await submitQuoteRequest(values)

    if (ok) {
      setStatus('success')
      setValues(initialQuoteValues)
      setErrors({})
      setTouched({})
    } else {
      setStatus('error')
      setErrorMessage(error)
    }
  }

  // The form is unmounted on success, which drops focus to <body> and loses a
  // keyboard user's place entirely. Move it onto the confirmation instead.
  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus()
  }, [status])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
        <div
          className="absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-clay-600/20 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="sheet-label text-white/70"
            >
              Sheet Q-01 — Request a Quote
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="mt-5 text-balance text-4xl md:text-5xl lg:text-[3.8rem] leading-[1.06] font-medium text-white"
            >
              Let's put a number to the house you keep imagining.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="mt-6 text-base md:text-lg leading-relaxed text-white/70 max-w-xl"
            >
              Designing Functional, Elegant &amp; Vastu-Friendly Spaces Across Tamil Nadu
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="mt-4 text-base md:text-lg leading-relaxed text-white/70 max-w-xl"
            >
              Share the site, the scope and the budget you have in mind. We'll come back with an
              honest assessment of what it takes to build it — no obligation, no template pricing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/60"
            >
              <span className="inline-flex items-center gap-2">
                <Clock size={16} strokeWidth={1.5} aria-hidden="true" /> Response within one business day
              </span>
              <a
                href={telLink(business.telephone)}
                className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300"
              >
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" /> {business.telephone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300 break-all"
              >
                <Mail size={16} strokeWidth={1.5} aria-hidden="true" /> {business.email}
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* What happens next */}
            <FadeIn direction="right" className="lg:col-span-4 flex flex-col gap-10">
              <div>
                <span className="sheet-label">What happens next</span>
                <h2 className="mt-3 font-display text-3xl leading-tight">
                  Three steps, then a proposal.
                </h2>
              </div>

              <ol className="flex flex-col gap-8 list-none">
                {quoteSteps.map((step, i) => (
                  <li key={step.code} className="flex gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-white border-2 border-ink flex items-center justify-center font-display text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <span className="sheet-label">{step.code}</span>
                      <h3 className="mt-1 font-display text-lg">{step.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                to="/"
                className="nav-link self-start inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> Back to the studio
              </Link>
            </FadeIn>

            {/* Form card */}
            <FadeIn
              direction="left"
              delay={0.1}
              className="lg:col-span-8 card-hairline p-8 md:p-10 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="h-full min-h-[520px] flex flex-col items-center justify-center text-center gap-4"
                  >
                    <CheckCircle2 size={44} aria-hidden="true" className="text-clay-700" strokeWidth={1.5} />
                    <h3 ref={successHeadingRef} tabIndex={-1} className="font-display text-2xl focus:outline-none">
                      Request received.
                    </h3>
                    <p className="text-ink-muted max-w-sm">
                      Thank you — a principal architect will review your brief and call you within
                      one business day.
                    </p>
                    <Button as={Link} to="/" variant="outline" className="mt-2">
                      Back to the studio
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-10"
                  >
                    <div>
                      <span className="sheet-label">Project Brief</span>
                      <h2 className="mt-2 font-display text-2xl">Tell us what you're building.</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                      {resolvedQuoteFields.map((field) => {
                        const Control = controls[field.control]
                        const { name, label, control: _control, full, ...rest } = field

                        return (
                          <div key={name} className={full ? 'sm:col-span-2' : undefined}>
                            <Control
                              name={name}
                              label={label}
                              value={values[name]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched[name] ? errors[name] ?? '' : ''}
                              {...rest}
                            />
                          </div>
                        )
                      })}
                    </div>

                    <input
                      type="checkbox"
                      name="botcheck"
                      checked={values.botcheck === 'on'}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-300 px-5 py-4 text-sm text-red-900"
                      >
                        <AlertCircle size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* A missing access key means the deploy is misconfigured, not that
                        the visitor did anything wrong. Rather than offering a submit
                        button that can only ever fail, tell them plainly and give them
                        a route that works. */}
                    {!isQuoteSubmissionConfigured && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-300 px-5 py-4 text-sm text-amber-900"
                      >
                        <AlertCircle size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>
                          This form is temporarily unavailable. Please call the studio on{' '}
                          <a href={telLink(business.telephone)} className="font-semibold underline underline-offset-2">
                            {business.telephone}
                          </a>{' '}
                          or email{' '}
                          <a href={`mailto:${business.email}`} className="font-semibold underline underline-offset-2 break-all">
                            {business.email}
                          </a>
                          .
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={status === 'submitting' || !isQuoteSubmissionConfigured}
                        aria-busy={status === 'submitting'}
                      >
                        {status === 'submitting' ? 'Sending…' : 'Request Quote'}
                        {status !== 'submitting' && <ArrowRight size={16} aria-hidden="true" />}
                      </Button>
                      <p className="text-xs text-ink-muted leading-relaxed max-w-xs">
                        Your details are used only to answer your enquiry. See our{' '}
                        <Link to="/privacy" className="underline underline-offset-2 hover:text-ink transition-colors">
                          privacy policy
                        </Link>
                        .
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
