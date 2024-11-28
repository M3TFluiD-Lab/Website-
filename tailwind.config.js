/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ensure your HTML file is included
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS and JSX files in the src directory
  ],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      fontWeight: {
        'extra-light': 200,
        'medium': 500,
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Include the Flowbite plugin
  ],
}