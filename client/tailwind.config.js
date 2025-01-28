/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "#525B5A",
        lightColor: "#E5E9E7",
        interestColor: "#21A89A",
        accentColor: "#7CD858",
        warningColor: "#E00F0F",
      },
      fontFamily: {
        title: ["Prompt", "sans-serif"],
        paragraph: ["Libre Franklin", "sans-serif"],
      },
      animation: {
        openMenu: "openMenu 0.4s ease-in",

        closeMenu: "closeMenu 1s ease-in",

        openModal: "openModal 1s ease-in-out",

        closeModal: "closeModal 1s ease-in-out",
      },

      keyframes: {
        openModal: {
          "0%": { bottom: "-70vh" },

          "100%": { bottom: "50vh" },
        },

        closeModal: {
          "0%": { opacity: "0" },

          "100%": { opacity: "-70vh" },
        },

        openMenu: {
          "0%": { opacity: "0" },

          "100%": { opacity: "100%" },
        },

        closeMenu: {
          "0%": { opacity: "100%" },

          "100%": { opacity: "0" },
        },
      },
      screens: {
        vsm: "321px",
        vmd: "400px",
      },
      gridTemplateRows: {
        40: "repeat(40, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
