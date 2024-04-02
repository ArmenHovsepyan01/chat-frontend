/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        1500: '1500px'
      },
      width: {
        1000: '1000px'
      }
    }
  },
  plugins: []
};
