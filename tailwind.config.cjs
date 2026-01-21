/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // "Nebula" Theme Palette
        bg1: "#000000", // True Void Black
        bg2: "#0A0A0A", // Secondary Black (Cards)
        bg3: "#141414", // Tertiary Black (Borders/Input)
        
        surface: "#111111", // Raised Surface
        surface2: "#1C1C1C", // Input/Hover Surface

        text1: "#FFFFFF", // Primary Text (High Contrast)
        text2: "#888888", // Secondary Text (Muted)
        text3: "#444444", // Tertiary Text (Subtle)

        accent: "#3B82F6", // Electric Blue (Primary Action)
        "accent-glow": "#60A5FA", // Light Blue Glow
        
        success: "#00C853", // Vibrant Green
        danger: "#FF3D00", // Vibrant Red
        warning: "#FFD600", // Vibrant Yellow
        
        border: "rgba(255, 255, 255, 0.08)", // Glass Border
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Clean, Industrial
        mono: ['"JetBrains Mono"', 'monospace'], // For Numbers/Data
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #3B82F6 0deg, #8B5CF6 180deg, #3B82F6 360deg)',
      },
      animation: {
        "spin-fast": "spin 0.8s linear infinite",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px -5px rgba(59,130,246, 0.5)" },
          "50%": { opacity: ".5", boxShadow: "0 0 0px 0px rgba(59,130,246, 0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
