/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './code.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Arial', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      colors: {
        cream: { 50: '#FFFDF8', 100: '#F7F1E5', 200: '#EFE3D0', 300: '#DDC9A9' },
        charcoal: { 900: '#17252B', 800: '#243840', 700: '#38515A', 600: '#5D6D70', 500: '#899395' },
        kedi: { red: '#C94B3C', green: '#0F766E', yellow: '#D9A441', yellowDark: '#A87520', blue: '#175A72' }
      },
      boxShadow: {
        soft: '0 20px 40px -15px rgba(26, 24, 23, 0.07)',
        float: '0 25px 50px -12px rgba(220, 38, 38, 0.25)'
      }
    }
  },
  plugins: []
};
