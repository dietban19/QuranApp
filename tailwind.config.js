/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins font family
      },
      colors: {
        sepia: {
          50: "#fff7ea", // light
          100: "#fef5e2",
          200: "#f8ebd5", // main
          300: "#efe2cd", // medium
          400: "#e5d7b9",
          500: "#d8c297",
          600: "#bfa776",
          700: "#a58d5a",
          800: "#8c7447",
          900: "#72603f", // dark
          950: "#4a4026",
        },
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        textMain: "var(--color-button-bg)",
        text: "var(--color-text)",
        btn: "var(--color-button-bg)",
        btnText: "var(--color-button-text)",
      },
    },
  },
  plugins: [],
};
