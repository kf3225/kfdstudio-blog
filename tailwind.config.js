/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        colors: {
          "primary-text": "var(--color-primary-text)",
        },
      },
    },
    keyframes: {
      "content-show": {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      "content-hide": {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
    },
  },
  plugins: [],
};
