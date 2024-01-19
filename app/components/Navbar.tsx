"use client";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import logoMobile from "../assets/logo-mobile.svg";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import { classNames } from "../lib/functions";
import AddBoard from "./AddBoard";
import { useBoard } from "../providers/BordProvider";
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import AddTask from "./AddTask";
import Dropdown from "./Dropdown";
import { db } from "../lib/db";

export default function Navbar({ boards }: { boards: Board[] }) {
  const { darkMode, setDarkMode } = useTheme();
  const { board, setBoard } = useBoard()
  const [isOpen, setIsOpen] = useState(false);

  const selectBoard = async (selectedBoard: Board) => {
   
    const tasks = await db.tasks.where("boardId").equals(selectedBoard.id).toArray()  
    const newBoard = {
      name: selectedBoard.name,
      id: selectedBoard.id,
      columns: selectedBoard.columns?.map(column => {
          return {
              ...column,
              tasks: tasks.filter(task => task.columnId === column.id)
          }
      })
  }
  setBoard(newBoard)
    setIsOpen(false);
    localStorage.setItem("board", JSON.stringify(newBoard));
  }

  return (
    <header className="bg-white dark:bg-dark-grey">
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoMobile} alt="logo mobile" />
          <div className="flex items-center gap-2">
            {board && (
              <button
                className="flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className=" text-headingL font-bold">{board.name} </p>

                {isOpen ? (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="M9 6 5 2 1 6"
                    />
                  </svg>
                ) : (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <AddTask />
          <Dropdown />
        </div>
      </nav>
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed top-[68px] right-0 bottom-0 w-full flex flex-col justify-start bg-black/40">
            <div onClick={e => e.stopPropagation()} className="mt-4 bg-white dark:bg-dark-grey mx-14 rounded-lg py-4">
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
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
            </div>
          </div>
        </>
      )}
    </header>
  );
}
