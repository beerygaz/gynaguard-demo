/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gynaguard warm autumn palette
        rust: {
          50:  '#fdf4ef',
          100: '#fbe4d4',
          200: '#f6c7a8',
          300: '#efa070',
          400: '#e87040',
          500: '#c95228',
          600: '#a8401e',
          700: '#883219',
          800: '#6e2818',
          900: '#5a2218',
        },
        amber: {
          50:  '#fff8ed',
          100: '#ffefd3',
          200: '#ffdba7',
          300: '#ffc06e',
          400: '#ff9c33',
          500: '#f87c0c',
          600: '#e06207',
          700: '#ba4808',
          800: '#94390d',
          900: '#78310e',
        },
        sienna: {
          50:  '#faf5f0',
          100: '#f3e8dc',
          200: '#e6cfb8',
          300: '#d6ae8b',
          400: '#c38760',
          500: '#b67245',
          600: '#9f5e3a',
          700: '#834a31',
          800: '#6b3e2d',
          900: '#593628',
        },
        sage: {
          50:  '#f4f6f2',
          100: '#e4eade',
          200: '#cad4c1',
          300: '#a6b79c',
          400: '#81967a',
          500: '#637c5e',
          600: '#4e634a',
          700: '#3f503c',
          800: '#344132',
          900: '#2c362b',
        },
        cream: {
          50:  '#fdfaf6',
          100: '#faf4ec',
          200: '#f5e8d5',
          300: '#eed5b3',
          400: '#e4bc8a',
          500: '#d9a265',
        },
        warm: {
          bg:   '#1a1410',
          card: '#231d18',
          border: '#3d3028',
          muted: '#7a6a5a',
          text:  '#f0e8de',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
