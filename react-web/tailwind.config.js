/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#174247",
        },
        secondary: {
          DEFAULT: "#326f78",
        },
      },
      animation: {
        "spinner-gray": "spinner-gray 1s linear infinite",
        "spinner-teal": "spinner-teal 1s linear infinite",
      },
      keyframes: {
        "spinner-gray": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spinner-teal": {
          "0%": { transform: "rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "rotate(180deg)", opacity: "0.2" },
          "100%": { transform: "rotate(360deg)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
