/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)'} //move element: 100% to the right hand side and full width of an element
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      }
    },
  },
  plugins: [],
}

