/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-claro': '#00FFAB',
        'verde-oscuro': '#14C38E',
        'azul-claro': '#2192FF',
        'azul-oscuro': '#13005A'
        // 'azul-oscuro': '#002B5B'
      }

    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

