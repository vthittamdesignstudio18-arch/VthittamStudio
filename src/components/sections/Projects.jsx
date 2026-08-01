import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, X, ChevronLeft, ChevronRight, Images, Ruler } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ResponsiveImage, { SIZES } from '../ui/ResponsiveImage.jsx'
import { projectCategories, planningDrawings } from '../../data/projects.js'
import useScrollLock from '../../hooks/useScrollLock.js'

const EASE = [0.16, 1, 0.3, 1]

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { images, index, label } | null
  const lastTrigger = useRef(null)

  const toggleCategory = (id) => setOpenId((current) => (current === id ? null : id))

  const openLightbox = useCallback((payload, trigger) => {
    lastTrigger.current = trigger ?? null
    setLightbox(payload)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    // Return focus to whatever opened the dialog, per WAI-ARIA dialog practice.
    lastTrigger.current?.focus?.()
  }, [])

  const step = useCallback((delta) => {
    setLightbox((current) => {
      if (!current) return current
      const n = current.images.length
      return { ...current, index: (current.index + delta + n) % n }
    })
  }, [])

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-24 md:py-32 lg:py-36 bg-stone-bg"
    >
      <Container>
        <SectionHeading
          id="projects-heading"
          sheet="A-03"
          eyebrow="Featured Work"
          title="Residential, commercial, and interior projects."
          description="A selection of recently completed and in-progress work across Trichy and Tamil Nadu — villa architecture, commercial spaces, and turnkey interiors."
        />

        <div className="mt-12 md:mt-14 flex flex-col gap-4 sm:gap-5">
          {projectCategories.map((category) => (
            <AccordionCategory
              key={category.id}
              category={category}
              isOpen={openId === category.id}
              onToggle={() => toggleCategory(category.id)}
              onImageClick={(index, trigger) =>
                openLightbox({ images: category.images, index, label: category.heading }, trigger)
              }
            />
          ))}
        </div>

        <PlanningAside
          onImageClick={(index, trigger) =>
            openLightbox({ images: planningDrawings, index, label: 'Planning & Design' }, trigger)
          }
        />
      </Container>

      <Lightbox lightbox={lightbox} onClose={closeLightbox} onStep={step} />
    </section>
  )
}

/* ── Category accordion ─────────────────────────────────────────────── */

function AccordionCategory({ category, isOpen, onToggle, onImageClick }) {
  const count = category.images.length
  const panelId = `projects-panel-${category.id}`
  const buttonId = `projects-tab-${category.id}`

  return (
    <article className="rounded-3xl overflow-hidden border border-ink/10 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${category.heading} — ${count} ${count === 1 ? 'photo' : 'photos'}`}
          className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
        >
          <span className="relative block h-44 sm:h-48 md:h-56 overflow-hidden">
            <ResponsiveImage
              base={category.cover.base}
              widths={category.cover.widths}
              ratio={category.cover.ratio}
              sizes={SIZES.cover}
              alt=""
              fill
              position="center"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

            <span className="relative h-full flex items-center justify-between gap-4 sm:gap-6 px-5 sm:px-6 md:px-10">
              <span className="min-w-0 block">
                <span className="block font-display text-2xl md:text-3xl text-white">
                  {category.heading}
                </span>
                <span className="mt-1.5 hidden sm:block text-sm text-white/80 max-w-md leading-relaxed">
                  {category.description}
                </span>
              </span>

              <span className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* Counts photographs, not projects — several views can belong
                    to one build, so calling these "projects" would inflate it. */}
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest2 text-white bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 whitespace-nowrap">
                  <Images size={12} aria-hidden="true" />
                  {count} {count === 1 ? 'Photo' : 'Photos'}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown size={18} />
                </span>
              </span>
            </span>
          </span>
        </button>
      </h3>

      {/* Always mounted so aria-controls resolves even when collapsed. */}
      <div id={panelId}>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.4, ease: EASE }, opacity: { duration: 0.25 } }}
            className="overflow-hidden"
          >
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 p-4 sm:p-6 md:p-8 list-none">
              {category.images.map((image, index) => (
                <li key={image.base}>
                  <GalleryTile
                    image={image}
                    onClick={(e) => onImageClick(index, e.currentTarget)}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </article>
  )
}

function GalleryTile({ image, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="no-drag group relative block w-full rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-stone-surface">
        <ResponsiveImage
          base={image.base}
          widths={image.widths}
          ratio={image.ratio}
          sizes={SIZES.galleryTile}
          alt={image.alt}
          fill
          position="center"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 text-[11px] sm:text-sm text-white font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 text-left line-clamp-2 leading-snug">
        {image.title}
      </span>
      <span className="sr-only">View larger: {image.title}</span>
    </button>
  )
}

/* ── Planning & design ──────────────────────────────────────────────── */

/**
 * Drawing work shown on its own terms. A plan sheet is design output, not a
 * finished building, so it sits outside the project counts rather than
 * padding them. Marked up as <aside> — related to the projects, not one of them.
 */
function PlanningAside({ onImageClick }) {
  if (!planningDrawings.length) return null
  const drawing = planningDrawings[0]

  return (
    <aside
      aria-labelledby="planning-heading"
      className="mt-12 md:mt-16 rounded-3xl border border-hairline bg-white/60 p-5 sm:p-7 md:p-9"
    >
      <p className="flex items-center gap-2.5">
        <Ruler size={15} strokeWidth={1.5} className="text-clay-700" aria-hidden="true" />
        <span className="sheet-label">Planning &amp; Design</span>
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
        <button
          type="button"
          onClick={(e) => onImageClick(0, e.currentTarget)}
          className="sm:col-span-5 group relative block rounded-2xl overflow-hidden border border-hairline bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <ResponsiveImage
            base={drawing.base}
            widths={drawing.widths}
            ratio={drawing.ratio}
            sizes={SIZES.drawing}
            alt={drawing.alt}
            fit="contain"
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="sr-only">View larger: {drawing.title}</span>
        </button>

        <div className="sm:col-span-7">
          <h3 id="planning-heading" className="font-display text-xl md:text-2xl leading-snug">
            {drawing.title}
          </h3>
          <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed max-w-md">
            {drawing.caption}
          </p>
        </div>
      </div>
    </aside>
  )
}

/* ── Lightbox ───────────────────────────────────────────────────────── */

function Lightbox({ lightbox, onClose, onStep }) {
  const [touchStartX, setTouchStartX] = useState(null)
  const dialogRef = useRef(null)

  useScrollLock(Boolean(lightbox))

  const image = lightbox ? lightbox.images[lightbox.index] : null
  const multiple = lightbox ? lightbox.images.length > 1 : false
  const largestWidth = image ? image.widths[image.widths.length - 1] : 0

  // Escape closes, arrows step, Tab is trapped inside the dialog.
  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && multiple) {
        onStep(1)
      } else if (e.key === 'ArrowLeft' && multiple) {
        onStep(-1)
      } else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, multiple, onClose, onStep])

  // Move focus into the dialog once it has painted.
  useEffect(() => {
    if (!lightbox) return undefined
    const t = setTimeout(() => dialogRef.current?.querySelector('button')?.focus(), 30)
    return () => clearTimeout(t)
  }, [lightbox])

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX
    if (multiple && Math.abs(deltaX) > 50) onStep(deltaX > 0 ? -1 : 1)
    setTouchStartX(null)
  }

  return (
    <AnimatePresence>
      {lightbox && image && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.label} — image viewer`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {multiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStep(-1)
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-8 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStep(1)
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-8 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}

          <figure
            className="max-w-[92vw] max-h-[86vh] px-4 sm:px-16 m-0"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={image.base}
              src={`${image.base}-${largestWidth}.webp`}
              srcSet={image.widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(', ')}
              sizes={SIZES.lightbox}
              alt={image.alt}
              width={largestWidth}
              height={Math.round(largestWidth / image.ratio)}
              className="max-w-full max-h-[74vh] w-auto h-auto object-contain rounded-xl mx-auto"
              decoding="async"
            />
            <figcaption className="mt-4 text-center text-white/85 text-sm" aria-live="polite">
              <span className="font-medium text-white">{image.title}</span>
              {multiple && (
                <>
                  <span className="mx-2 text-white/60" aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    Image {lightbox.index + 1} of {lightbox.images.length}
                  </span>
                </>
              )}
            </figcaption>
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
