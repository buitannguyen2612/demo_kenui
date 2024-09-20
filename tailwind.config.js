/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  fontFamily: {
    nunito: ["nunito", "sans-serif"],
  },
  theme: {
    colors: {
      mainCorlor: "#97baf5",
      txtMainColor:"#648bcf",
      error:"#fe6358",
      boxColor: "#97baf5",
      white: "#fff",
      black: "#131313",
      skiny: "#f0f1f3"
    },
    fontSize: {
      title: "1.8rem",
      normalTxt: "1rem",
      supTxt: "0.8rem",
    },
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
