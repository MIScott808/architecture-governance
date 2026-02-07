import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mana: {
          navy: '#0A1628',
          'navy-90': '#0D1E38',
          'blue-deep': '#1A365D',
          blue: '#1E5BA8',
          'blue-bright': '#2B7BD4',
          'blue-light': '#4A9FE8',
          'blue-sky': '#6BB8F2',
          'blue-pale': '#A8D4F7',
          'blue-wash': '#E8F4FD',
          coral: '#F05545',
          red: '#C41E3A',
          'red-bright': '#E63950',
          gold: '#D69E2E',
          'gold-light': '#ECC94B',
          'gold-wash': '#FFFCEB',
          teal: '#0D9488',
          'teal-light': '#14B8A6',
          'teal-wash': '#E6FFFA',
        },
      },
    },
  },
  plugins: [],
};
export default config;
