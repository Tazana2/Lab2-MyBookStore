/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        display: ['Rubik', 'Inter', 'system-ui', 'ui-sans-serif', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          50: '#fff0f7',
          100: '#ffd6ea',
          200: '#ffadd4',
          300: '#ff7abb',
          400: '#ff47a2',
          500: '#ff1a8d',
          600: '#db0e77',
          700: '#b30962',
          800: '#8b074d',
          900: '#67053b',
        },
      },
      boxShadow: {
        card: '0 10px 25px -10px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
