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
        "kred": "#EA5555",
        "kredHover": "#FF9898",
        "overlay": "#979797"
      },
      fontSize: {
        headingXL: "24px",
        headingL: "18px",
        headingM: "15px",
        headingS: "12px",
        bodyL: "13px",
        bodyM: "12px"
      },
      lineHeight: {
        headingXL: "30px",
        headingL: "23px",
        headingM: "19px",
        headingS: "12px",
        bodyL: "23px",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
