/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          bg: '#FAF8F5',
          surface: '#F4F1ED',
        },
        ink: {
          DEFAULT: '#1F1F1F',
          muted: '#666666',
        },
        /* Full hex ramp. The 500 step and the bare `clay` alias were previously
           declared with oklch(), which older Safari drops entirely — an invalid
           colour is discarded rather than approximated. Neither was referenced
           anywhere, so both were replaced: 500 is now the true hex midpoint
           between 400 and 600, and the bare alias is gone. */
        clay: {
          50: '#F7F4F1',
          100: '#EDE7E1',
          200: '#DCD2C7',
          300: '#C6B8A8',
          400: '#B3A18C',
          500: '#9C8A76',
          600: '#8A7A67',
          700: '#6E6151',
          800: '#524940',
          900: '#38322C',
        },
        taupe: {
          400: '#B5A597',
          500: '#9C8879',
          600: '#83705F',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderColor: {
        hairline: 'rgba(0,0,0,0.08)',
      },
      maxWidth: {
        content: '1400px',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
    },
  },
  plugins: [],
}
