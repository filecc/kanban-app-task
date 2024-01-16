"use client";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import chevronUp from "../assets/icon-chevron-up.svg";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import addIcon from "../assets/icon-add-task-mobile.svg";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <header className="bg-white dark:bg-dark-grey">
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoMobile} alt="logo mobile" />
          <div className="flex items-center gap-2">
            <p className=" text-headingL font-bold">Platform Launch</p>
            <Image src={chevronDown} alt="chevron" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="buttonS button-primary"
            
          >
            <Image src={addIcon} alt="add task" />
          </button>
          <Image src={verticalEllipsis} alt="menu" />
        </div>

        {/* <button onClick={() => setDarkMode(!darkMode)}>
          toggle
        </button> */}
      </nav>
    </header>
  );
}
