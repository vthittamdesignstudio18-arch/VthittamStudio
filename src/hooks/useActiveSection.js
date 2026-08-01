import { useEffect, useState } from 'react'

/**
 * Observes a list of section ids and returns the id currently most in view.
 */
export default function useActiveSection(ids = []) {
  // Starts empty rather than at the first section. Seeding it with ids[0] made
  // the navbar highlight "Studio" on load, while the visitor was still looking
  // at the hero and had navigated nowhere.
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
