import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwindcss-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
  ],
  prefix: "web-",
  presets: [sharedConfig],
};

export default config;