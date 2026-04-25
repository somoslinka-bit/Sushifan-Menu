import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-slide-up": "fadeSlideUp 240ms ease-out both",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
