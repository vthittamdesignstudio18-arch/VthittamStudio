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
        clay: {
          DEFAULT: 'oklch(71.4% 0.014 41.2)',
          50: '#F7F4F1',
          100: '#EDE7E1',
          200: '#DCD2C7',
          300: '#C6B8A8',
          400: '#B3A18C',
          500: 'oklch(71.4% 0.014 41.2)',
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
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
