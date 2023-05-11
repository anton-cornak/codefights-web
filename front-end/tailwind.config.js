module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,css}",
    "./components/**/*.{js,jsx,ts,tsx,css}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        'color1':'#BDB6D0',
        'color2':'#97A21E',
        'bgBlack':'#000000',
      }
      
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("prettier-plugin-tailwindcss"),
  ],
};
