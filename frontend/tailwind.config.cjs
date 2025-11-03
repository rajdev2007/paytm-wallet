/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // <-- adjust if your source is elsewhere
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};