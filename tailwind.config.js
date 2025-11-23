/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // sans: ["tt-commons-pro", "sans-serif"],  // override default
        // commons: ["tt-commons-pro", "sans-serif"], // custom name
        sans: ['var(--font-sans)'],
      },
    },
  },
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
};