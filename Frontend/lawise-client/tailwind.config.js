/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corporate: '#80B3FF',    // Dark blue for Corporate Law
        family: '#80B3FF',       // Lighter blue for Family Law
        criminal: '#80B3FF',     // Blue for Criminal Defense
        civil: '#80B3FF',        // Blue for Civil Litigation
        background:'#181C14',    // Background color
      },
    },
  },
  plugins: [],
}

