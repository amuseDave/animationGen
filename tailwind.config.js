/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "var(--bg-main)",
        "main-t": "var(--text-color)",
        "main-t-active": "var(--text-color-active)",

        "main-t-gray": "var(--text-gray)",
        "main-t-gray-active": "var(--text-gray-active)",

        "alert-bg-error": "var(--alert-bg-error)",
        "alert-t-error": "var(--alert-text-error)",
        "alert-bg-success": "var(--alert-bg-success)",
        "alert-t-success": "var(--alert-text-success)",

        "controller-bg": "var(--bg-controller)",
        "saved-bg": "var(--bg-saved)",
      },
    },
  },
  plugins: [],
};
