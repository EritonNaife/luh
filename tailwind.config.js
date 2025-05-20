/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'soft-beige': '#ECE6D4',
        'deep-burgundy': '#470303',
        'charcoal-gray': '#787878',
        'warm-peach': '#EEC78B',
        'light-gray': '#DDDDDD',
      },
      fontFamily: {
        'europa': ['Europa', 'sans-serif'],
        'didot': ['linotype-didot', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 