/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#1A1A1A',
        secondary: '#666666',
        'border-light': '#E5E5E5',
        'bg-light': '#F5F5F5',
        'accent-red': '#E53935'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(26, 26, 26, 0.08)'
      }
    }
  },
  plugins: []
};
