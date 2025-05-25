/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Important for dark mode to work
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
