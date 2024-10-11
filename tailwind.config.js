/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'white-smoke': '#f5f5f5',
        'smoke': '#e9dadb',
        'primary': '#6a6a6a',
        'active': '#c8aaae',
        'hover':'#dcc3c6',
      },
    },
  },
  plugins: [],
};

