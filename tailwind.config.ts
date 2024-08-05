import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeToRed: {
          '0%': { backgroundColor: 'white', opacity: '1' },
          '50%': { backgroundColor: '#ff6f6f', opacity: '1' }, 
          '100%': { backgroundColor: '#c62828', opacity: '0' }, 
        },
      },
      animation: {
        fadeToRed: 'fadeToRed 2s forwards',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
