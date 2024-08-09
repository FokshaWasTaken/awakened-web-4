const { nextui } = require("@nextui-org/theme/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      base: ['var(--font-inter)', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      display: ["Roobert", "Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      mono: ["monospace"]
    },
    extend: {
      colors: {
        modrinth: {
          brand: "#00af5c",
          "raised-bg-dark": "#26292f",
          "raised-bg-light": "#fff",
        },
        curseforge: {
          brand: "#FF0000",
          "raised-bg-dark": "#26292f",
          "raised-bg-light": "#fff",
        }
      },
      screens: {
        'lmd': '920px',
        'mmd': '840px',
        'xsm': '430px',
      },
      transitionProperty: {
        'fade': 'background, color, opacity',
      },
      fontSize: {
        base: '1rem',
        '1': '5.4rem',
        '2': '3.6rem',
        '3': '2.4rem',
        '4': '1.8rem',
        '5': '1.4rem',
        '6': '1.3rem',
        '7': '1.2rem',
        '8': '1rem',
        '9': '0.8rem',
        '10': '0.6rem',
        '11': '0.4rem',
        'size-inherit': 'inherit',
      }
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {},
      },
    }),
  ],
}

