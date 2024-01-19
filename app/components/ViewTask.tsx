"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useState } from "react";
import { classNames } from "../lib/functions";
import { useBoard } from "../providers/BordProvider";
import { db } from "../lib/db";
import DropdownTask from "./DropdownTask";

export default function ViewTask({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks ?? []);
  const { board, setBoard } = useBoard();

  const updateColumn = async (e: ChangeEvent<HTMLSelectElement>) => {
    await db.tasks.update(task, {
      columnId: e.target.value,
    });
    const tasks = await db.tasks.where("boardId").equals(board.id).toArray();
    const newBoard = {
      name: board.name,
      id: board.id,
      columns: board.columns?.map((column) => {
        return {
          ...column,
          tasks: tasks.filter((task) => task.columnId === column.id),
        };
      }),
    };
    localStorage.setItem("board", JSON.stringify(newBoard));
  };

  const updateBoard = async () => {
    await db.tasks.update(task, {
      subtasks: subtasks,
    });
    const tasks = await db.tasks.where("boardId").equals(board.id).toArray();
    const newBoard = {
      name: board.name,
      id: board.id,
      columns: board.columns?.map((column) => {
        return {
          ...column,
          tasks: tasks.filter((task) => task.columnId === column.id),
        };
      }),
    };
    localStorage.setItem("board", JSON.stringify(newBoard));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-dark-grey rounded-lg shadow-md dark:shadow-dark-grey dark:shadow px-4 py-6 w-full text-start"
      >
        <h3 className="text-headingM font-bold">{task.title}</h3>
        <p className="text-bodyM text-medium-grey mt-1">
          {task.subtasks && task.subtasks.length > 0
            ? `${task.subtasks.filter((subtask) => subtask.isCompleted).length} of ${
                task.subtasks.length
              } subtasks`
            : "No subtasks"}
        </p>
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 bottom-0 w-full right-0 bg-black/40 grid place-items-center px-6 overflow-y-scroll py-6 z-30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-grey w-full p-4 rounded-lg md:max-w-[450px]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-headingL font-bold">{task.title}</h2>
             <DropdownTask task={task} />
            </div>
            <div className="mt-3">
              <p className="text-bodyL text-medium-grey">{task.description}</p>
              <p className="text-bodyM text-medium-grey mt-4 text-bold">
                Subtasks
                {task.subtasks && task.subtasks.length > 0
                  ? `${
                    task.subtasks.filter((subtask) => subtask.isCompleted).length
                    } of ${task.subtasks?.length} subtasks`
                  : ""}
              </p>
              {task.subtasks && task.subtasks.length == 0 && (
                <p className="text-bodyM font-light text-medium-grey mt-1">
                  This tasks have no subtasks
                </p>
              )}
              <section className="flex flex-col gap-2 mt-3">
                {task.subtasks?.map((subtask, index) => {
                  return (
                    <div
                      className={classNames(
                        "bg-light-grey dark:bg-very-dark-grey rounded px-2 py-4 flex items-center gap-3 text-bodyM font-bold",
                        subtask.isCompleted
                          ? "text-black/50 dark:text-medium-grey line-through"
                          : "text-black dark:text-white"
                      )}
                      key={subtask.id}
                    >
                      <input
                        onChange={() => {
                          setSubtasks(
                            subtasks.map((subtask, i) => {
                              if (i === index) {
                                subtask.isCompleted = !subtask.isCompleted;
                              }
                              return subtask;
                            })
                          );
                          updateBoard();
                        }}
                        checked={subtask.isCompleted}
                        type="checkbox"
                        className="h-4 w-4 rounded-sm border-gray-300 text-purple focus:ring-purple"
                      />
                      <p>{subtask.title}</p>
                    </div>
                  );
                })}
              </section>
            </div>
            <div className="mt-3">
              <label htmlFor="board" className="label">
                Current Status
              </label>
              <select
                name="board"
                id="board"
                defaultValue={task.columnId}
                className="mt-2 block w-full rounded-md border-0 py-3 pl-3 ring-1 dark:bg-dark-grey ring-inset ring-gray-300 focus:ring-2 focus:ring-purple text-headingS font-medium"
                onChange={(e) => {
                  updateColumn(e);
                }}
              >
                {board.columns?.map((selectColumn) => {
                  return (
                    <option key={selectColumn.id} value={selectColumn.id}>
                      {selectColumn.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
