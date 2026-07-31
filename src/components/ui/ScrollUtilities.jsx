import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Back-to-top control.
 *
 * This is a navigation affordance, not a scroll animation: it appears once
 * the page is far enough down to make returning to the top worth offering,
 * and simply fades via CSS. The reading position itself drives nothing else
 * on the page.
 *
 * (The former scroll-progress bar has been removed along with the rest of
 * the scroll-driven effects.)
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-ink text-white flex items-center justify-center shadow-lg hover:bg-clay-600 transition-[opacity,background-color,visibility] duration-300 ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <ArrowUp size={18} />
    </button>
  )
}
