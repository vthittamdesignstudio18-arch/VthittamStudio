import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { whatsappLink } from '../../config/site.js'
import { scrollBehavior } from '../../lib/motionPreference.js'

/**
 * The two floating controls, stacked in the bottom-right corner.
 *
 * They share one size, radius, shadow, hover lift and transition so the pair
 * reads as a single control cluster rather than two unrelated buttons. The
 * WhatsApp button is always available; back-to-top only appears once there is
 * something to go back to, and the WhatsApp button sits below it so it never
 * moves when that happens.
 */

const FLOATING_BUTTON =
  'h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ' +
  'shadow-lg hover:-translate-y-0.5 hover:shadow-xl ' +
  'transition-[transform,opacity,background-color,box-shadow,visibility] duration-300 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink'

/** Official WhatsApp glyph — lucide has no brand marks. */
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`${FLOATING_BUTTON} bg-ink text-white hover:bg-clay-700 ${
          showTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>

      {/* wa.me resolves itself: the native app on a phone, WhatsApp Web on a
          desktop. No user-agent sniffing required.

          Colour is WhatsApp's teal green (#128C7E) rather than their brighter
          #25D366. The bright green gives a white glyph only 1.98:1 and sits at
          1.87:1 against the stone page background — both under the 3:1 floor
          for non-text contrast. The teal is from the same brand palette and
          measures 4.14:1 and 3.90:1. */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with V Thittam Design Studio on WhatsApp — opens in a new tab"
        className={`${FLOATING_BUTTON} bg-[#128C7E] text-white hover:bg-[#0F7A6D] focus-visible:!ring-[#128C7E]`}
      >
        <WhatsAppIcon size={22} />
      </a>
    </div>
  )
}
