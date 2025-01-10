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
      screens: {
        vsm: "321px",
      },
    },
  },
  plugins: [],
};
