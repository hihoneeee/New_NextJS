import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        homeBackground: "#F5F5F5",
        divBackground: "#1266dd",
        btnBackground: "#F73859",
        inputColor: "#e8f0fe",
        divColor: "#181818",
        textColorLight: "#b4b3b3",
        textColorDark: "#4d4d4d",
        borderDarkColor: "rgba(243, 245, 247, 0.15)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundColor: {
        "overlay-4": "rgba(0,0,0,0.04)",
        "overlay-10": "rgba(0,0,0,0.1)",
        "overlay-20": "rgba(0,0,0,0.2)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-50": "rgba(0,0,0,0.5)",
        "overlay-70": "rgba(0,0,0,0.7)",
        "overlay-main-40": "rgba(255, 255, 255, 0.04)",
      },
      width: {
        main: "1319px",
      },
      fontSize: {
        xxs: ".5rem",
      },
      screens: {
        mobile: "640px", // Kích thước mobile
        tablet: "768px", // Kích thước tablet
        laptop: "1366px", // Kích thước laptop
        desktop: "1920px", // Kích thước màn hình 23.8 inch
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
