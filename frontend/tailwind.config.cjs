/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#222831",
        secondaryBlack: "#393E46",
        primaryTeal: "#00ADB5",
        primarySlate: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
