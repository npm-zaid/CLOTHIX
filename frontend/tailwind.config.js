/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('./Assets/pattern.svg')",
        'ptr': "url('./Assets/slanted-gradient.svg')",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(2,2,2,0.5)',
      },
    
    },
  },
  plugins: [],
}

