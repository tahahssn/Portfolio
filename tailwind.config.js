/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["honer-those", "system-ui", "sans-serif"]
      },
    },
  },
  plugins: [],
}