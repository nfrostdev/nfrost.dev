module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'nf-blue': '#003da6'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
