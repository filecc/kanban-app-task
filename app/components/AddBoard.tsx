"use client";
import { db } from "../lib/db";
import { randomKey } from "../lib/functions";
import addIcon from "../assets/icon-add-task-mobile.svg";
import Image from "next/image";
import { useState } from "react";
import cross from "../assets/icon-cross.svg";
import { useBoard } from "../providers/BordProvider";

export default function AddBoard({ title, classes } : {title?: string, classes?: string}) {
  const [adding, setAdding] = useState(false);
  const [columnsName, setColumnsName] = useState(["Todo", "Doing", "Completed"]);
  const [boardName, setBoardName] = useState("");
  const { setBoard } = useBoard();
  const addBoard = async () => {
    const boardId = randomKey();
    const board = await db.boards.add({
      id: boardId,
      name: boardName.trim().length > 0 ? boardName : "New Board",
      columns: columnsName.map(column => {
        return {
          id: randomKey(),
          name: column
        }
      })
    });
    setAdding(false);
    setBoard(await getBoard(boardId) as Board)
    localStorage.setItem("board", JSON.stringify(await getBoard(boardId)));
  };

  const getBoard = async (id: string) => {
    const board = await db.boards.where("id").equals(id).first();
    return board;
  }

  const removeColumn = (index: number) => {
    const newColumns = [...columnsName];
    newColumns.splice(index, 1);
    setColumnsName(newColumns);
    
  }
  return (
    <>
      {!title && <p className="text-headingL font-bold text-medium-grey text-center">
        You have no board. Create a new board to get started.
      </p>}
      <button
        onClick={() => setAdding(true)}
        className={classes ? classes : "buttonM button-primary flex items-center gap-2"}
      >
        <Image src={addIcon} alt="add icon" aria-hidden="true" /> {title ? title : 'Add New Board'}
      </button>
      {adding && (
        <>
          <div className="fixed top-0 right-0 bottom-0 w-full bg-dark-grey/50 dark:bg-very-dark-grey/70 grid place-items-center px-6 text-start">
            <div className=" bg-white dark:bg-dark-grey w-full px-6 py-6 rounded-md">
              <h2 className="text-headingL font-bold">Add New Board</h2>
        
                <div className="mt-3">
                  <label
                    htmlFor="name"
                    className="text-medium-grey dark:text-white text-[12px] font-bold"
                  >
                    Board Name
                  </label>
                  <input
                    placeholder="e.g. Web Design"
                    className="input mt-2 w-full"
                    type="text"
                    id="name"
                    name="name"
                    value={boardName}
                    onChange={(e) => {setBoardName(e.target.value)}}
                  />
                </div>
        
              <div className="mt-3">
                <p className="text-medium-grey dark:text-white text-[12px] font-bold mb-3">
                  Board Columns
                </p>
                <div className="flex flex-col gap-4">
                  {columnsName.map((column, index) => {
                    return (
                      <div
                        key={"column-" + index}
                        className="flex items-center gap-4"
                      >
                        <input
                          placeholder="e.g. Todo"
                          className="input w-full text-bodyL leading-bodyL font-medium"
                          type="text"
                          value={column}
                          onChange={(e) => {
                            const newColumns = [...columnsName];
                            newColumns[index] = e.target.value;
                            setColumnsName(newColumns);
                          }}
                        />
                        <button
                          onClick={() => removeColumn(index)}
                          className="grid place-items-center"
                        >
                          <Image
                            src={cross}
                            alt="delete column"
                            className=" w-4 h-4"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setColumnsName([...columnsName, ""])} className="buttonM button-secondary flex items-center gap-2 w-full justify-center mt-4">
                  <svg
                  viewBox="0 0 12 12"
                    width="8" 
                    height="8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-purple"
                      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                    />
                  </svg>
                  Add New Column
                </button>
                <button disabled={boardName.trim().length === 0 ? true : false} onClick={addBoard} className="buttonM button-primary flex items-center gap-2 w-full justify-center mt-6">
                  Create New Board
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
