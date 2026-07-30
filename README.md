# V Thittam Design Studio — Website

Premium, animated marketing website for V Thittam Design Studio, an architecture,
interior design, and construction studio based in Coimbatore, Tamil Nadu.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (scroll reveals, page interactions)
- GSAP + ScrollTrigger (hero parallax)
- Lenis (smooth scrolling)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Project Structure

```
src/
  components/
    layout/       Navbar, Footer
    sections/     One component per page section (Hero, About, Services, ...)
    ui/           Reusable primitives (Button, FadeIn, SectionHeading, Counter, ...)
  data/           Editable content — copy, services, projects, pricing, FAQ
  hooks/          useLenis (smooth scroll), useActiveSection (nav scroll-spy)
  lib/            Shared GSAP + ScrollTrigger setup
  App.jsx         Composes all sections in page order
  index.css       Design tokens, base styles, utility classes
```

## Editing Content

Almost all copy lives in `src/data/*.js` as plain arrays/objects — edit those files
rather than the components to update services, project entries, pricing, FAQs, or
testimonials.

## Images

Section images currently reference royalty-free Unsplash URLs as placeholders.
Replace the `src` values in `src/components/sections/*.jsx` and `src/data/projects.js`
with your own project photography before launch.

## Design Tokens

Colors, fonts, and animation keyframes are defined in `tailwind.config.js`.
The primary palette (`stone`, `ink`, `clay`, `taupe`) and type families
(`Playfair Display` for display, `Inter` for body) are set there.
