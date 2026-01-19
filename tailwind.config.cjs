/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg1: "#0B0E13", // Deep dark blue/black
        bg2: "#151A23", // Slightly lighter for cards
        bg3: "#1A202C", // Borders/Inputs
        text1: "#F9FAFB", // White text
        text2: "#9CA3AF", // Muted text
        theme: "#D4AF37", // Crown Gold
        "theme-hover": "#B5952F", // Darker Gold
        primary: "#FFFFFF",
        background: "#0B0E13",
      },

      animation: {
        "spin-fast": "spin 0.4s linear infinite",
      },
    },
  },
  plugins: [],
};
