import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "var(--background)",
      surface: "var(--surface)",
      primary: "var(--primary)",
      text: {
        DEFAULT: "var(--text)",
        variant: "var(--text-variant)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
};
export default config;
