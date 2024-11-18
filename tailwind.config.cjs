/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/js/*.js", "./*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontWeight: {
        'extra-light': 200,
        'medium': 500,
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
