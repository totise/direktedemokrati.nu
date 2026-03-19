import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./screens/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)", "Nunito", "sans-serif"],
        spaceGrotesk: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "sans-serif"
        ]
      },
      colors: {
        primary: {
          DEFAULT: "#5B4FCF",
          dark: "#3D329F"
        },
        background: "#FFFAF5",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F3F4F6"
        },
        text: {
          DEFAULT: "#2C2C2C",
          muted: "#6B7280"
        },
        border: "#E5E7EB",
        vote: {
          for: "#22A06B",
          against: "#E34935"
        },
        accent: "#FF6B35"
      },
      boxShadow: {
        card: "0_4px_16px_rgba(0,0,0,0.04)"
      },
      borderRadius: {
        card: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
