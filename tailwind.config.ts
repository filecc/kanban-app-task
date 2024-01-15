import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#000112",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        "purple": "#635FC7",
        "purple-hover": "#A8A4FF",
        "red": "#EA5555",
        "red-hover": "#FF989",
      },
      fontSize: {
        headingXL: "24px",
        headeingL: "18px",
        headingM: "15px",
        headingS: "12px",
      },
      lineHeight: {
        headingXL: "30px",
        headeingL: "23px",
        headingM: "19px",
        headingS: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
