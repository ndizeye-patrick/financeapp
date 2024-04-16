module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: { 50: "#f9f9f9", 900: "#121139", "50_fb": "#fbfbfbfb", "50_01": "#fbfbfb" },
        black: { 900: "#0b0000", "900_d1": "#000000d1", "900_01": "#000000" },
        white: { A700_02: "#fbfbfb", A700_01: "#fefefe", A700: "#fefdfd" },
        indigo: { 900: "#27257e" },
        blue_gray: { 200: "#abb5be", 500: "#6f7d97", 800: "#344055", "200_01": "#b6b8c3", "100_01": "#ced4da" },
        teal: { A400: "#26d0bb" },
        cyan: { 400: "#2dcfc1", "400_01": "#2dcfc2" },
        linear : {100: "#812de2" , 200: "#3a48f8", 300: "#186ff2"}
      },
      boxShadow: {},
      fontFamily: { poppins: "Poppins", inter: "Inter" },
      textShadow: { ts: "0px 4px  4px #0000003f" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
