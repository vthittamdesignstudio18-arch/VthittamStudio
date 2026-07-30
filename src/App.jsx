import { Routes, Route } from './lib/router.jsx'
import useLenis from './hooks/useLenis.js'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import { ScrollProgress, BackToTop } from './components/ui/ScrollUtilities.jsx'

import HomePage from './pages/HomePage.jsx'
import QuotePage from './pages/QuotePage.jsx'

export default function App() {
  useLenis()

  return (
    <div className="relative">
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          {/* Any unrecognized path falls back to the home page rather than
              rendering a blank <main>. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
