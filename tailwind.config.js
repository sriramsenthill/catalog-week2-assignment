// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #c9edde, #d1e4fa)', // Define your custom gradient
      },
      colors: {
        'custom-gray': '#55525d', // Add your custom color here
      },
      fontFamily: {
        satoshi: ['Satoshi', 'Helvetica Neue', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [],
};
