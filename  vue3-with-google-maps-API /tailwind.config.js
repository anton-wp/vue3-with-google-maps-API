/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#F3F7FB",
          100: "#E7EFF6",
          200: "#C3D6EA",
          300: "#9EBEDD",
          400: "#568DC3",
          500: "#0D5CA9",
          600: "#0C5398",
          700: "#0A457F",
          800: "#083765",
          900: "#062D53",
        },
        "havelock-blue": {
          tb: "#FBFDFE",
          50: "#F5F9FE",
          100: "#EBF4FC",
          500: "#3990E4",
        },
        "pastel-green": {
          50: "#F5FCF7",
          300: "#ADEBC2",
          400: "#70DB94",
          500: "#33CC66",
        },
        "cream-can": {
          50: "#FFFCF7",
          300: "#FFEBC2",
          400: "#FFDB94",
          500: "#FFCC66",
        },
        red: {
          200: "#FFBFBF",
          300: "#FF9999",
          400: "#FF4D4D",
          500: "#FF0000",
        },
        slate: {
          900: "#000612",
        },
        cinder: {
          50: "#F2F3F3",
          100: "#E6E6E7",
          200: "#BFC1C4",
          300: "#999BA0",
          400: "#4D5159",
          500: "#000612",
          600: "#000510",
          700: "#00050E",
          800: "#00040B",
          900: "#000309",
        },
      },
      boxShadow: {
        md: "0px 4px 20px rgba(22, 24, 33, 0.08)",
        lg: "0px 12px 40px rgba(43, 59, 74, 0.08)",
        xl: "0px 4px 30px rgba(0, 4, 16, 0.05)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      maxWidth: {
        '3/5': '66%',
      }
  
    },
  },
  plugins: [],
};
