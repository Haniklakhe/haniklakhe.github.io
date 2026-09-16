import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F2A3D",
          soft: "#33506A",
        },
        paper: {
          DEFAULT: "#F7F5F1",
          raised: "#FFFFFF",
        },
        deep: {
          DEFAULT: "#0B1620",
          raised: "#12212E",
        },
        teal: {
          DEFAULT: "#0B6B74",
          light: "#4DC4CE",
        },
        amber: {
          DEFAULT: "#D98E3B",
          soft: "#F3D9B3",
        },
        border: {
          DEFAULT: "#E4E0D8",
          dark: "#23323E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
