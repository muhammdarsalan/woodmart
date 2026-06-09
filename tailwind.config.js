/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#1C0A00',
          mid: '#2E1200',
          light: '#6B4C2A',
        },
        gold: {
          DEFAULT: '#C49A2A',
          light: '#E8B84B',
          pale: '#F5D98A',
        },
        beige: {
          DEFAULT: '#F5ECD7',
          dark: '#E8D8B8',
          muted: '#C4A882',
        },
        cream: '#FDFAF4',
        darktext: '#1C0A00',
        lighttext: '#F5ECD7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
