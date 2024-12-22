module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/garden-themed-form/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #c9edde, #d1e4fa)',
      },
      colors: {
        'custom-gray': '#55525d',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
