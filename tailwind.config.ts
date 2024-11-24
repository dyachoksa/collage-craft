import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
