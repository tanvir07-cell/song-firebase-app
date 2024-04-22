/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'fountain-blue': {
        '50': '#effcfc',
        '100': '#d7f6f6',
        '200': '#b4eced',
        '300': '#80dde0',
        '400': '#45c4cb',
        '500': '#2aa8b0',
        '600': '#258895',
        '700': '#256e79',
        '800': '#265a64',
        '900': '#214750',
        '950': '#12313a',
    },
    
    },
    extend: {
      
    },
  },
  plugins: [require("daisyui")],
}