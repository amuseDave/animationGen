/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        "text-color": "var(--text-color)",
        "text-color-active": "var(--text-color-active)",
      },
    },
  },
  plugins: [],
};
