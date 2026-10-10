/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0066FF',
          blueHover: '#0052CC',
          blueLight: '#EBF3FF',
          blueBorder: '#C9DEFF',
          dark: '#0F172A',
          grayText: '#64748B',
          grayBg: '#F8FAFC',
          sidebarBg: '#FFFFFF',
          cardBorder: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
