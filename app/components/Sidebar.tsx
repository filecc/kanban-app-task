"use client";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import logoMobile from "../assets/logo-mobile.svg";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import { classNames } from "../lib/functions";
import AddBoard from "./AddBoard";
import { useBoard } from "../providers/BordProvider";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import AddTask from "./AddTask";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import Dropdown from "./Dropdown";

export default function Sidebar({ boards, isOpen, setIsOpen }: { boards: Board[], isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { darkMode, setDarkMode } = useTheme();
  const { board, setBoard } = useBoard();
  const selectBoard = (selectedBoard: Board) => {
    setBoard(selectedBoard);
    localStorage.setItem("board", JSON.stringify(selectedBoard));
  };

  return (
    <>
   
    <header className="bg-white dark:bg-dark-grey fixed w-full">
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center w-full">
          <div className={classNames("flex items-center gap-3 w-[240px]")}>
            <Image src={logoDark} alt="logo mobile" className="dark:hidden" />
            <Image
              src={logoLight}
              alt="logo mobile"
              className="hidden dark:inline-block"
            />
          </div>
          <div className="flex items-center justify-between gap-2 flex-grow pl-2">
          <p className=" text-headingL font-bold">{board.name} </p>
    
            <div className="flex items-center gap-4">
              <AddTask title="Add New Task" />
              <Dropdown />
            </div>
        </div>
        </div>
        {isOpen && <div className="fixed top-[68px] left-0 bottom-0 w-[260px] flex flex-col justify-start">
          <div className=" bg-white dark:bg-dark-grey pb-4 pt-10 h-full flex flex-col justify-between w-[260px]">
            <div>
            <h2 className="uppercase text-[12px] font-bold text-medium-grey tracking-[2.4px] px-4">
              all boards ({boards.length})
            </h2>
            <div className="flex flex-col mt-4">
              {boards.map((boardAvailable, index) => {
                return (
                  <button
                    onClick={() => {
                      selectBoard(boardAvailable);
                    }}
                    className={classNames(
                      "mr-6 rounded-r-full py-3 text-start pl-4 text-headingM font-bold  flex items-center gap-4",
                      board.name === boardAvailable.name
                        ? "bg-purple text-white"
                        : "text-medium-grey"
                    )}
                    key={"navbar-board-" + index}
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                        className={classNames(
                          board.name === boardAvailable.name
                            ? "fill-white"
                            : "fill-medium-grey"
                        )}
                      />
                    </svg>
                    {boardAvailable.name}
                  </button>
                );
              })}
              <span className="flex items-center gap-4 pl-4 mt-4">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    className="fill-purple"
                  />
                </svg>
                <AddBoard
                  title="Create New Board"
                  classes="mr-6 rounded-r-full py-3 text-start text-headingM font-bold text-purple flex items-center gap-1 fill-purple"
                />
              </span>
            </div>
            </div>
            <div>
           
            <div className="mt-6 mx-4 grid place-items-center py-4 bg-light-grey dark:bg-very-dark-grey rounded-md">
              <div className="flex items-center gap-6">
                <SunIcon className="w-7 h-7 text-medium-grey" />
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className={classNames(
                    "bg-purple",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      darkMode ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
                <MoonIcon className="w-7 h-7 text-medium-grey" />
              </div>
            </div>
            <button className="button w-full mt-2 text-start ml-6 text-headingM font-bold text-medium-grey flex items-center gap-2 mt-6" onClick={() => setIsOpen(false)}><svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" fill="#828FA3"/></svg>Hide Sidebar</button>
            </div>
           
          </div>
        </div>}
      </nav>
    </header>
    {!isOpen && <button onClick={() => setIsOpen(true)} className="fixed bottom-0 mb-4 py-3 bg-purple px-3 rounded-r-full">
    <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" fill="#FFF"/></svg>
    </button>}
    </>
  );
}
