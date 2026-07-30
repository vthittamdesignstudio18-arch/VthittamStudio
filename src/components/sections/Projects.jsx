import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { projectCategories } from '../../data/projects.js'

const EASE = [0.16, 1, 0.3, 1]

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { categoryId, index } | null

  const toggleCategory = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const activeCategory = lightbox
    ? projectCategories.find((c) => c.id === lightbox.categoryId)
    : null

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const showNext = useCallback(() => {
    setLightbox((current) => {
      if (!current) return current
      const cat = projectCategories.find((c) => c.id === current.categoryId)
      if (!cat) return current
      return { ...current, index: (current.index + 1) % cat.images.length }
    })
  }, [])

  const showPrev = useCallback(() => {
    setLightbox((current) => {
      if (!current) return current
      const cat = projectCategories.find((c) => c.id === current.categoryId)
      if (!cat) return current
      return { ...current, index: (current.index - 1 + cat.images.length) % cat.images.length }
    })
  }, [])

  // Keyboard navigation for the lightbox: Escape closes, arrows move between images.
  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, closeLightbox, showNext, showPrev])

  return (
    <section id="projects" className="py-28 md:py-36 bg-stone-bg">
      <Container>
        <SectionHeading
          sheet="A-03"
          eyebrow="Featured Work"
          title="Residential, commercial, and interior projects."
          description="A selection of recently completed and in-progress work across Trichy and Tamil Nadu."
        />

        <div className="mt-14 flex flex-col gap-5">
          {projectCategories.map((category) => (
            <AccordionCategory
              key={category.id}
              category={category}
              isOpen={openId === category.id}
              onToggle={() => toggleCategory(category.id)}
              onImageClick={(index) => setLightbox({ categoryId: category.id, index })}
            />
          ))}
        </div>
      </Container>

      <Lightbox
        category={activeCategory}
        lightbox={lightbox}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />
    </section>
  )
}

function AccordionCategory({ category, isOpen, onToggle, onImageClick }) {
  return (
    <motion.div
      layout
      className="rounded-3xl overflow-hidden border border-ink/10 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      transition={{ layout: { duration: 0.5, ease: EASE } }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group relative w-full text-left"
      >
        <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
          <img
            src={category.cover}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          <div className="relative h-full flex items-center justify-between gap-6 px-6 md:px-10">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-white">{category.label}</h3>
              <p className="mt-1.5 hidden sm:block text-sm text-white/70 max-w-md leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest2 text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <Images size={12} />
                {category.images.length} {category.images.length === 1 ? 'project' : 'projects'}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
              >
                <ChevronDown size={18} />
              </motion.span>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35, ease: EASE } }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-7 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {category.images.map((image, index) => (
                  <motion.button
                    key={image.src}
                    type="button"
                    onClick={() => onImageClick(index)}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
                    className="group relative rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span
                      className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {image.alt}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Lightbox({ category, lightbox, onClose, onNext, onPrev }) {
  // Basic mobile swipe support: track the touch start X, compare to touch end X.
  const [touchStartX, setTouchStartX] = useState(null)

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX
    const SWIPE_THRESHOLD = 50
    if (deltaX > SWIPE_THRESHOLD) onPrev()
    else if (deltaX < -SWIPE_THRESHOLD) onNext()
    setTouchStartX(null)
  }

  if (!category || !lightbox) return null

  const image = category.images[lightbox.index]

  return (
    <AnimatePresence>
      {lightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm"
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
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors duration-300"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors duration-300"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors duration-300"
          >
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-w-[92vw] max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl mx-auto"
            />
            <div className="mt-4 text-center text-white/80 text-sm">
              <span className="font-medium text-white">{image.alt}</span>
              <span className="mx-2 text-white/40">·</span>
              <span>
                {lightbox.index + 1} / {category.images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
