/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#800ADF',
      secondary: '#EDE1F6',
      white: '#FFFFFF',
      black: '#222222',
      red: '#DF0A0A',
      purple: {
        100: '#F8F6F9'
      },
      zinc: {
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717'
      }
    },
    extend: {}
  },
  plugins: []
};
