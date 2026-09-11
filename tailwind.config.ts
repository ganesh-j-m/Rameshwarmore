import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF6EA",
        paperDim: "#F3ECDA",
        ink: "#241C15",
        inkSoft: "#4A3F33",
        maroon: {
          DEFAULT: "#7A2530",
          light: "#9A3A46",
          dark: "#571A22",
        },
        teal: {
          DEFAULT: "#1E4A44",
          light: "#2C6960",
        },
        gold: {
          DEFAULT: "#B9862F",
          light: "#D6A758",
          dark: "#8F6620",
        },
        line: "#E2D6BE",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      borderRadius: {
        sm: "3px",
        md: "5px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(36,28,21,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
