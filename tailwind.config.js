/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Dark Blue
        secondary: '#3B82F6', // Medium Blue
        accent: '#F59E0B', // Amber
        neutral: {
          light: '#F3F4F6', // Light Gray
          DEFAULT: '#6B7280', // Gray
          dark: '#1F2937', // Dark Gray
        },
        background: '#FFFFFF', // White
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'input': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  plugins: [],
}
