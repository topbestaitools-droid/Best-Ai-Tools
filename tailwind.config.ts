import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A12",
        panel: "#0B1224",
        border: "#1B2B52",
        text: "#E6ECFF",
        muted: "#A9B6E6",
        primary: "#7C5CFF",
        accent: "#00E5FF"
      }
    }
  },
  plugins: []
} satisfies Config;
