/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00B5E2",
        "primary-light": {
          300: "#ABF0EB",
          600: "#339D99",
        },
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          100: "#F5F5F5",
          200: "#eee",
          300: "#D9D9D9",
          600: "#575757",
        },
        "dashboard-sidebar": "#03404F",
        "grey": "#7F7F7F",
        "red": {
          500: "#D01619",
          "500-dark": "#A40D0D",
          "500-light": "#F24C4C",
        }
      },
      fontSize: {
        base: '16px',
      },
    },
  },
  plugins: [],
};
