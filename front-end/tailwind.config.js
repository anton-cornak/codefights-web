<<<<<<< HEAD
const { colors } = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
=======
>>>>>>> ad1aa7e (design)
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,css}",
    "./components/**/*.{js,jsx,ts,tsx,css}",
  ],
<<<<<<< HEAD
  daisyui: {
    themes: ["light"],
  },
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
        'color1':'#BDB6D0',
        'color2':'#97A21E',
        'bgBlack':'#000000',
     

      },
=======
  theme: {
    extend: {
      colors: {
        'color1':'#BDB6D0',
        'color2':'#97A21E',
        'bgBlack':'#000000',
      },
      
      fontFamily: {
        'bruno': ['BrunoAce', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
      
>>>>>>> ad1aa7e (design)
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("prettier-plugin-tailwindcss"),
<<<<<<< HEAD
    require('tailwindcss-animate')
=======
>>>>>>> ad1aa7e (design)
  ],
};
