/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode palette
        light: {
          primary: '#FF4655',    // Valorant Red
          secondary: '#0F1419',  // Dark Navy
          accent: '#00D4FF',     // Electric Blue
          dark: '#1E2328',       // Charcoal
        },
        // Dark mode palette
        dark: {
          primary: '#FFFBF5',    // Off White
          secondary: '#FF4655',  // Valorant Red
          accent: '#0F1419',     // Dark Navy
          background: '#000000', // Pure Black
        }
      }
    },
  },
  plugins: [],
};
