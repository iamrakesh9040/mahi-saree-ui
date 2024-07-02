/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D83D43",
          50: "#F7D6D7",
          100: "#F3C5C7",
          200: "#ECA3A6",
          300: "#E68185",
          400: "#DF5F64",
          500: "#D83D43",
          600: "#B8252B",
          700: "#891C20",
          800: "#5B1215",
          900: "#2C090A",
          950: "#140405",
        },
        secondary: {
          DEFAULT: '#1E1E1E',
  50: '#7A7A7A',
  100: '#707070',
  200: '#5B5B5B',
  300: '#474747',
  400: '#323232',
  500: '#1E1E1E',
  600: '#020202',
  700: '#000000',
  800: '#000000',
  900: '#000000',
  950: '#000000'
        },
        tertiary: "#FFFFFF",
        facebook: "#4267B2",
        instagram: "#bc2a8d",
        twitter: "#1da1f2",
        linkedin: "#0077b5",
        pinterest: "#E60023",
        whatsapp: "#25d366",
        youtube: "#cd201f",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
