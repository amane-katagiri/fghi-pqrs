/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "#406fbf",
      "primary-hover": "#668bcc",
      secondary: "#bf4092",
      "secondary-hover": "#cc66a8",
      "primary-dark": "#203860",
      "primary-light": "#9fb7df",
      "primary-text": "#212121",
      "secondary-text": "#737373",
      "disabled-text": "#9b9b9b",
      "primary-bg": "#ecf1f8",
      error: "#bf4d40",
      success: "#48bf40",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
};
