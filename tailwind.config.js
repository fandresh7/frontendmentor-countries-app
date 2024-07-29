/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'system-ui']
      },
      colors: {
        "theme-black": "#111517",
        "theme-grey": "#848484",
        "theme-dark": "#2B3844",
        "theme-bg-white": "#F2F2F2",
        "theme-bg-dark": "#202C36",
      },
      boxShadow: {
        "custom": "0 4px 8px rgba(0, 0, 0, 0.1)"
      }
    },
  },
  plugins: [],
}
