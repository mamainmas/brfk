/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/*.html",
    "./src/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        darkbg: "#00376b",
        darkbg1: "#004487",
        darkbg2: "#004f9c",
        darkbg3: "#762875",
        darkbg4: "#0062c2",
      },
      fontFamily: {
        "Montserrat": ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
};
