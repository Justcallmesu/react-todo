import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        raleway:["Raleway", "sans-serif"],
      },
      colors:{
        primary:"#28B498"
      }
    },
  },
  plugins: [],
} satisfies Config

