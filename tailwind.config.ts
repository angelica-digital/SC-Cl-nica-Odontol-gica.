import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F5F1",
        paper: "#FFFFFF",
        sage: {
          DEFAULT: "#6F8178",
          light: "#8B9C92",
          dark: "#5A6B62",
        },
        deep: {
          DEFAULT: "#334A42",
          light: "#3F5B51",
          dark: "#263933",
        },
        graphite: {
          DEFAULT: "#222725",
          light: "#3A403D",
        },
        beige: "#DDD5C9",
        nude: "#E4CFC6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        soft: "0 2px 24px rgba(34, 39, 37, 0.06)",
        softer: "0 4px 40px rgba(34, 39, 37, 0.08)",
        card: "0 1px 3px rgba(34, 39, 37, 0.05), 0 8px 24px rgba(34, 39, 37, 0.05)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
      letterSpacing: {
        widest2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
