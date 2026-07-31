import { Routes, Route } from './lib/router.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import { FloatingActions } from './components/ui/ScrollUtilities.jsx'
import useDocumentMeta from './hooks/useDocumentMeta.js'

import HomePage from './pages/HomePage.jsx'
import QuotePage from './pages/QuotePage.jsx'

/**
 * No smooth-scroll hijacking and no scroll-progress indicator: the page uses
 * the browser's own scrolling, which keeps the experience static and
 * predictable after the opening animation.
 */
export default function App() {
  useDocumentMeta()

  return (
    <div className="relative">
      {/* First stop for keyboard and screen-reader users: the fixed navbar
          otherwise sits between them and the content on every page. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          {/* Any unrecognized path falls back to the home page rather than
              rendering a blank <main>. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
