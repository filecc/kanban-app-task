import { useState } from "react";
import { useBoard } from "../providers/BordProvider";
import Image from "next/image";
import cross from "../assets/icon-cross.svg";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import { classNames, randomKey } from "../lib/functions";

export default function AddTask({ title }: { title?: string }) {
  const { board, setBoard } = useBoard();
  const [isOpen, setIsOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(["", ""]);
  const placeholders = ["e.g. Drink coffee & smile", "e.g. Make coffee."];
  const [[taskTitle, taskDescription], setTask] = useState(["", ""]);
  const [columnID, setColumnID] = useState("");

  const removeSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleAddTask = async () => {
   
    const addedTask = await db.tasks.add({
      id: randomKey(),
      title: taskTitle,
      boardId: board.id,
      columnId: columnID,
      description: taskDescription,
      subtasks: subtasks
        .filter((subtask) => subtask.trim().length > 0)
        .map((subtask) => {
          return {
            id: randomKey(),
            title: subtask,
            isCompleted: false,
          };
        }),
    })

    const tasks = await db.tasks.where("boardId").equals(board.id).toArray()  
    const newBoard = {
     ...board,
      columns: board.columns?.map(column => {
          return {
              ...column,
              tasks: tasks.filter(task => task.columnId === column.id)
          }
      })
  }
  setBoard(newBoard)
    
    localStorage.setItem("board", JSON.stringify(newBoard));
    setIsOpen(false);
    setSubtasks(["", ""]);
    setTask(["", ""]);
  };
  return (
    <div>
      <button
        disabled={(!board?.columns || board.columns.length === 0) ? true : false}
        className={classNames(
          "buttonS button-primary",
          title ? "flex items-center gap-2" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-white"
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
          />
        </svg>
        {title}
      </button>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed top-0 bottom-0 w-full right-0 bg-black/40 grid place-items-center px-6 overflow-y-scroll py-6 z-30">
          <div onClick={e => e.stopPropagation()} className="bg-white dark:bg-dark-grey w-full p-4 rounded-lg md:max-w-[450px]">
            <h2 className="text-headingL font-bold">Add New Task</h2>
            <div className="mt-4">
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input w-full mt-2"
                placeholder="e.g. Take coffee break"
                value={taskTitle}
                onChange={(e) => {
                  setTask([e.target.value, taskDescription]);
                }}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="title"
                name="title"
                rows={4}
                className="input w-full mt-2"
                placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
                value={taskDescription}
                onChange={(e) => {
                  setTask([taskTitle, e.target.value]);
                }}
              />
            </div>
            <div className="mt-4">
              <p className="label">Subtasks</p>
              <div className="flex flex-col gap-4 mt-2">
                {subtasks.map((subtask, index) => {
                  return (
                    <div
                      key={"column-" + index}
                      className="flex items-center gap-4"
                    >
                      <input
                        placeholder={placeholders[index] ?? "Fresh new subtask"}
                        className="input w-full text-bodyL leading-bodyL font-medium"
                        type="text"
                        value={subtask}
                        onChange={(e) => {
                          const newSubtasks = [...subtasks];
                          newSubtasks[index] = e.target.value;
                          setSubtasks(newSubtasks);
                        }}
                      />
                      <button
                        onClick={() => removeSubtask(index)}
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
              <button
                onClick={() => setSubtasks([...subtasks, ""])}
                className="buttonS button-secondary flex items-center gap-2 w-full justify-center mt-4"
              >
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
                Add New Subtask
              </button>
            </div>
            <div className="mt-3">
              <label htmlFor="board" className="label">
                Status
              </label>
              <select
                name="board"
                id="board"
                className="mt-2 block w-full rounded-md border-0 py-3 pl-3 ring-1 dark:bg-dark-grey ring-inset ring-gray-300 focus:ring-2 focus:ring-purple text-headingS font-medium"
                onChange={(e) => {
                  setColumnID(e.target.value);
                }}
              >
                <option value="">Select a column</option>
                {board.columns?.map((column) => {
                  return (
                    <option key={column.id} value={column.id}>
                      {column.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              disabled={columnID === ""}
              onClick={handleAddTask}
              className="mt-5 buttonM button-primary w-full"
            >
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
