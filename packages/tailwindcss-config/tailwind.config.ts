import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      }
    }
  },
  plugins: []
}

export default config;