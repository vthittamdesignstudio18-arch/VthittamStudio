import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    // esbuild minification is the Vite default and is significantly faster
    // than terser for a marginal size difference at this bundle size.
    minify: 'esbuild',
    cssMinify: true,
    // Inlining below 4kB avoids extra round trips for the tiny hero
    // placeholder without bloating the JS bundle with real photographs.
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        /**
         * React and framer-motion change far less often than the studio's own
         * code. Splitting them into their own chunks means a copy edit
         * invalidates a few kB of app code rather than the whole bundle, so
         * returning visitors keep their cached vendor chunks.
         */
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
