// tailwind.config.js
module.exports = {
  content: ["./index.html", "./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4e54c8",
          light: "#6a6fd8",
          dark: "#3a3f9e",
        },
        secondary: {
          DEFAULT: "#8f94fb",
          light: "#a7abfc",
          dark: "#777df9",
        },
        accent: {
          DEFAULT: "#00b4d8",
          light: "#00d9ff",
          dark: "#0093b0",
        },
        dark: "#1e1e2d",
        light: "#f8f9fa",
      },
    },
  },
  plugins: [],
};
