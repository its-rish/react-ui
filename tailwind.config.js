import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        success:colors.green,
        error:colors.red,
        disable:colors.slate,
        
      },
    },
  },
  plugins: [],
};