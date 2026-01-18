/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cricket X theme - Cricket Green
        cricket: {
          primary: '#16a34a',
          secondary: '#15803d',
          accent: '#fbbf24',
          dark: '#052e16',
          darker: '#022c22',
          pitch: '#166534',
          boundary: '#dc2626',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cricket': 'cricket 2s ease-in-out infinite',
        'ball': 'ball 1.5s ease-in-out infinite',
      },
      keyframes: {
        cricket: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
        ball: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(180deg)' },
        }
      }
    },
  },
  plugins: [],
}
