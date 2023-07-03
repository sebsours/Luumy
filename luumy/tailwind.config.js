/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#f3f0fe',
        'background': '#080127',
        'primary-button': '#6d4ef9',
        'secondary-button': '#f8f3f2',
        'accent': '#010005',

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

