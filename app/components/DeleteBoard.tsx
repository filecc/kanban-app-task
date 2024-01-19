"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/db";
import { useBoard } from "../providers/BordProvider";

export default function DeleteBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { board, setBoard } = useBoard();

  const deleteBoard = async () => {
    try {
        await db.boards.delete(board?.id)
        localStorage.removeItem("board");
        const tasks = await db.tasks.where("boardId").equals(board?.id).toArray()
        await db.tasks.bulkDelete(tasks.map(task => task.id))
        setIsOpen(false);
        setBoard({} as Board)
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-kred text-start">
        Delete board
      </button>
      {isOpen && (
        <>
          <div className="fixed top-0 bottom-0 left-0 z-30 bg-black/40 grid place-items-center w-full">
            <div className="bg-white dark:bg-dark-grey rounded-lg p-6 max-w-[80%] md:max-w-[450px]">
              <h3 className="text-kred text-headingL font-medium mb-4">
                Delete this board?
              </h3>
              <p className="mb-3 text-bodyL text-medium-grey">
                Are you sure you want to delete the <span className="font-bold">&ldquo;{board.name}&ldquo;</span> board?
                This action will remove all columns and tasks and cannot be
                reversed.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <button className="buttonM button-danger w-full" onClick={deleteBoard}>Delete</button>
                <button className="buttonM button-secondary w-full" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
