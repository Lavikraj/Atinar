/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode palette
        light: {
          primary: '#FF8343',    // Orange
          secondary: '#F1DEC6',  // Cream
          accent: '#179BAE',     // Teal
          dark: '#4158A6',       // Blue
        },
        // Dark mode palette
        dark: {
          primary: '#E9E3DF',    // Light beige
          secondary: '#FF7A30',  // Orange
          accent: '#465C88',     // Blue-gray
          background: '#000000', // Black
        }
      }
    },
  },
  plugins: [],
};
