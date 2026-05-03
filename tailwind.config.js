/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gynaguard official brand palette — see docs/brand.md
        gg: {
          pink:         '#e9608a',
          'pink-dark':  '#de2e64',
          'pink-mid':   '#d995ad',
          blush:        '#cfb9bb',
          'pale-blush': '#f1ecee',
          teal:         '#43b8b4',
          'teal-light': '#9bc3c1',
          grey:         '#7d7d7d',
        },
      },
      fontFamily: {
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
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
