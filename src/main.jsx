import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from './lib/router.jsx'
import App from './App.jsx'
import './index.css'

/**
 * `reducedMotion="user"` makes every framer-motion component honour the
 * operating system's "reduce motion" setting.
 *
 * The CSS media query in index.css only neutralises *CSS* animations and
 * transitions. Framer Motion animates by writing inline transforms from
 * JavaScript, so it was completely unaffected by that rule — the accordions,
 * the testimonial slides and the lightbox all animated regardless of the
 * user's preference. One provider fixes every motion component at once, and
 * keeps working for any component added later.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>,
)
