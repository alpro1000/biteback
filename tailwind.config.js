import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        cherry: '#C41E3A',
        olive: '#6B8E23',
        wood: '#8B4513',
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        biteback: {
          primary: '#C41E3A',
          secondary: '#6B8E23',
          accent: '#8B4513',
          'base-100': '#FFF8E7',
        },
      },
    ],
  },
};
