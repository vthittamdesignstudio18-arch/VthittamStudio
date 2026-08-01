import { useEffect } from 'react'

/**
 * Locks page scrolling while an overlay is open.
 *
 * Two things this centralises that the inline versions got wrong:
 *
 *  1. Reference counting. The mobile menu and the image lightbox each set and
 *     cleared `body.style.overflow` directly. Closing either one released the
 *     lock even if the other was still open, letting the page scroll behind a
 *     dialog that was still on screen.
 *  2. Restoring what was there. Writing `''` on cleanup assumed the property
 *     started empty; this puts back whatever the value actually was.
 *
 * The sideways jump that used to accompany the lock is handled in CSS —
 * `scrollbar-gutter: stable` on <html> keeps the scrollbar track reserved, so
 * removing the scrollbar no longer reflows the page ~15px on Windows and Linux.
 */

let lockCount = 0
let previousOverflow = ''

export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount === 0) document.body.style.overflow = previousOverflow
    }
  }, [active])
}
