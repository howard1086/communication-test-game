/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telecom: {
          blue: '#005bac',
          gray: '#f4f4f4',
          dark: '#333333',
        }
      }
    },
  },
  plugins: [],
}
