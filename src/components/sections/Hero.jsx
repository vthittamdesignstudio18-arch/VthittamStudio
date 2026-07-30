import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/construction/01-plot.jpg"
          alt="Plot To Dream Home"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
      </div>
      

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 pb-28">

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white font-serif leading-[0.95] text-6xl md:text-8xl lg:text-[8rem] max-w-5xl"
          >
            Plot To
            <br />
            Dream Home.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-white/80 text-lg max-w-xl"
          >
            From empty land to a completed luxury residence.
            Scroll to experience every stage of the journey.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mt-16 flex items-center gap-3 text-white/70"
          >
            <span className="uppercase tracking-[4px] text-xs">
              Scroll To Explore
            </span>

            <ArrowDown size={18} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

