import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        screen: { raw: "screen" },
      },
      gridTemplateRows: {
        web: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};

export default config;
