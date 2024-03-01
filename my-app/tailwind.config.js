/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'eng': ['Figtree', 'sans-serif'],
        'kor': ['Pretendard', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

