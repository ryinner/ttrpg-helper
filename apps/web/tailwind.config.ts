import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwindcss-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  prefix: "web-",
  presets: [sharedConfig],
};

export default config;