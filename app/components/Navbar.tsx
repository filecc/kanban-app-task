"use client";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import logoMobile from "../assets/logo-mobile.svg";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import { classNames } from "../lib/functions";
import AddBoard from "./AddBoard";

export default function Navbar({ boards }: { boards: Board[] }) {
  const { darkMode, setDarkMode } = useTheme();
  const [board, setBoard] = useState(boards[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setBoard(boards[0]);
  }, [boards]);

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

                {isOpen 
                ? <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6"/></svg>
                : <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="#635FC7"
                    strokeWidth="2"
                    fill="none"
                    d="m1 1 4 4 4-4"
                  />
                </svg>}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={!board?.columns ? true : false}
            className="buttonS button-primary"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                className="fill-white"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          </button>
          <Image src={verticalEllipsis} alt="menu" />
        </div>

        {/* <button onClick={() => setDarkMode(!darkMode)}>
          toggle
        </button> */}
      </nav>
      {isOpen && (
        <>
          <div className="fixed top-[68px] right-0 bottom-0 w-full flex flex-col justify-start bg-black/40">
            <div className="mt-4 bg-white mx-14 rounded-lg py-4">
              <h2 className="uppercase text-[12px] font-bold text-medium-grey tracking-[2.4px] px-4">
                all boards ({boards.length})
              </h2>
              <div className="flex flex-col mt-4">
                {boards.map((boardAvailable, index) => {
                  return (
                    <button
                      onClick={() => setBoard(boardAvailable)}
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
                <span className="flex items-center gap-4 pl-4">
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
                {/* <button
                      className={classNames(
                        "mr-6 rounded-r-full py-3 text-start pl-4 text-headingM font-bold text-purple flex items-center gap-4"
                      )}
                    >
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
                        <span className="flex items-center gap-1">
                        <svg viewBox="0 0 12 12" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path className="fill-purple" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
                        Create New Board
                        </span>
                    </button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
