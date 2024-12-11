/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: 'left' },
          '100%': { backgroundPosition: 'right' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'gradient': 'gradient 4s linear infinite alternate',
      },
      backgroundSize: {
        'gradient-size': '200% 100%',
      }
    },
  },
  plugins: [],
} 