/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3D4838',
        secondary: '#D3806C',
        light: '#BCC3AC',
      },
    },
  },
  plugins: [],
}
