module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leapforce: {
          gray: {
            DEFAULT: '#54565b',
            light: '#a9aaad',
            dark: '#2f3033',
          },
          orange: {
            DEFAULT: '#ee7624',
            dark: '#b7530e',
            light: '#f4ac7b',
          },
          white: '#ebebeb',
        }
      },
      fontFamily: {
        helvetica: ['Helvetica Light', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
