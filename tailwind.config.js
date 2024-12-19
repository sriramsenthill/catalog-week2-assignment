// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'Helvetica Neue', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [],
};
