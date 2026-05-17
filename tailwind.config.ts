import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        bg: "#06070a",
        surface: "#0d0f14",
        surface2: "#12151c",
        surface3: "#181c26",
        surface4: "#1e2330",
        border: "#1c2235",
        border2: "#232a3d",
        accent: "#3b82f6",
        "accent-bright": "#60a5fa",
        "accent-dim": "#1d4ed8",
        "accent-glow": "rgba(59,130,246,0.15)",
        text1: "#f0f4ff",
        text2: "#8b96b0",
        text3: "#4a5570",
        success: "#10b981",
        error: "#f43f5e",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59,130,246,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(59,130,246,0.5)" },
        },
        rot: {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        rot: "rot 0.65s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
