import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0B1220",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
