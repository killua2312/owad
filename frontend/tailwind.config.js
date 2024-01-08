/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#0B0B0B",
        secondaryBackground: "#1B1B1B",
        accent: "#483D8B",
        primaryText: "#FAEBD7",
        secondaryText: "#A9A9A9",
        highlight: "#3F3F3F",
      },
      boxShadow: {
        "3d": "0 4px 10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
