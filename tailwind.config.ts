import type { Config } from "tailwindcss";

// Colour tokens are CSS variables (see globals.css) so light/dark is one switch.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Scene Index tokens (DESIGN.md §3)
        ground: token("ground"),
        panel: token("panel"),
        console: {
          DEFAULT: token("console"),
          ink: "rgb(230 235 227 / <alpha-value>)",
          water: "rgb(76 195 211 / <alpha-value>)",
          swir: "rgb(232 176 74 / <alpha-value>)",
        },
        ink: { DEFAULT: token("ink"), soft: token("ink-soft") },
        rule: token("rule"),
        water: token("water"),
        nir: { DEFAULT: token("nir"), graphic: token("nir-graphic") },
        swir: token("swir"),
        // Legacy tokens, used by sections not yet redesigned. Retired as each section lands.
        paper: { DEFAULT: "#F7F5F1", raised: "#FFFFFF" },
        deep: { DEFAULT: "#0B1620", raised: "#12212E" },
        teal: { DEFAULT: "#0B6B74", light: "#4DC4CE" },
        amber: { DEFAULT: "#D98E3B", soft: "#F3D9B3" },
        border: { DEFAULT: "#E4E0D8", dark: "#23323E" },
      },
      fontFamily: {
        display: ['"Instrument Sans Variable"', "Arial Narrow", "sans-serif"],
        body: ['"Source Serif 4 Variable"', "Georgia", "serif"],
        sans: ['"Source Serif 4 Variable"', "Georgia", "serif"],
      },
      maxWidth: {
        content: "72rem",
        page: "90rem",
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0.22, 1, 0.36, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        state: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
