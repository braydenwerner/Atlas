import baseConfig from "@atlas/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
} satisfies Config;
