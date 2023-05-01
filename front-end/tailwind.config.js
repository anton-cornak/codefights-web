module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        custom_green: "#97A21E",
        custom_light_grey: "#BDB6D0",
      },
      boxShadow: {
        custom: "0 50px 25px -24px rgb(0 0 0 / 0.3)",
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
  ],
};
