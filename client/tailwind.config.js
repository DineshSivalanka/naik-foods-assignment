/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea580c',
          hover: '#c2410c'
        },
        surface: '#ffffff',
        background: '#f8f9fa',
        text: {
          dark: '#1f2937',
          light: '#6b7280'
        },
        border: '#e5e7eb'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
