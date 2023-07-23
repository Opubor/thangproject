/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'themegray': '#F2F5F9',
        'darkblue': '#12448A',
        'textgray': '#6B7280',
        'textdark': '#3A3541',
        'lightblue': '#196FE0',
        'modalbackground': '#D9D9D9',
        'pending': '#EB7A12',
        'blank': '#DADADA',
        'false': '#FF4C51',
        'cancel': '#3A3541',
        'pass': '#56CA00',
        'block': '#32BAFF',
      }
    },
  },
  plugins: [],
}