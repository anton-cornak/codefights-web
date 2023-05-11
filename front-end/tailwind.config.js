const { colors } = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px'
      }
    },
    extend: {
      fontFamily: {
        'bruno': ['"Bruno Ace SC"', 'sans-serif'],
      },
      colors: {
        ...colors,
        'light-red': '#D50641',
        'dark-red': '#EB0F32',
        'green': '#97A21E',
        'dark-green': '#4c5211',
        "light-green": '#CFDE38',
     

      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("prettier-plugin-tailwindcss"),
    require('tailwindcss-animate')
  ],
};
