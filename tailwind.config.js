/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        received: { light: '#dcfce7', DEFAULT: '#22c55e', dark: '#166534' },
        sorting: { light: '#fef9c3', DEFAULT: '#eab308', dark: '#854d0e' },
        stored: { light: '#dbeafe', DEFAULT: '#3b82f6', dark: '#1e40af' },
        ready: { light: '#ffedd5', DEFAULT: '#f97316', dark: '#9a3412' },
        shipped: { light: '#ede9fe', DEFAULT: '#8b5cf6', dark: '#5b21b6' },
      },
    },
  },
  plugins: [],
}
