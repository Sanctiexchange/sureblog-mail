/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E3A5F",   // deep navy — SureBlog's editorial tone
          light: "#3B5B82",
          accent: "#C9A227",    // muted gold accent
        },
      },
    },
  },
  plugins: [],
}