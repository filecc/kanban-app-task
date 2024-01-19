"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { classNames } from "../lib/functions";

export default function ViewTask({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks ?? []);
  const [completedSubtasks, setCompletedSubtasks] = useState(
    task.subtasks?.filter((subtask) => subtask.isCompleted).length ?? 0
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-dark-grey rounded-lg shadow-md dark:shadow-dark-grey dark:shadow px-4 py-6 w-full text-start"
      >
        <h3 className="text-headingM font-bold">{task.title}</h3>
        <p className="text-bodyM text-medium-grey mt-1">
          {task.subtasks && task.subtasks.length > 0
            ? `${completedSubtasks} of ${task.subtasks?.length} subtasks`
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
              <EllipsisVerticalIcon className="w-6 h-6 text-medium-grey dark:text-white" />
            </div>
            <div className="mt-3">
              <p className="text-bodyL text-medium-grey">
                {task.description}
              </p>
              <p className="text-bodyM text-medium-grey mt-4 text-bold">
                Subtasks{" "}
                {task.subtasks && task.subtasks.length > 0
                  ? `${completedSubtasks} of ${task.subtasks?.length} subtasks`
                  : ""}
              </p>
              {task.subtasks && task.subtasks.length == 0 && (
                <p className="text-bodyM font-light text-medium-grey mt-1">
                  This tasks have no subtasks
                </p>
              )}
              <section className="flex flex-col gap-2 mt-3">
              {subtasks.map((subtask, index) => {
                return <div className="bg-light-grey rounded px-2 py-4 flex items-center gap-3 text-bodyM text-black/50 font-bold" key={subtask.id}>
                    <input onChange={() => {
                        setSubtasks(subtasks.map((subtask, i) => {
                            if (i === index) {
                                subtask.isCompleted = !subtask.isCompleted
                            }
                            return subtask
                        }
                        ))
                    }} checked={subtask.isCompleted} type="checkbox"  className="h-4 w-4 rounded border-gray-300 text-purple focus:ring-purple" />
                    <p className={classNames(subtask.isCompleted ? 'line-through' : '')}>{subtask.title}</p>
                </div>
              })}
              </section>
            </div>
            <p className="text-bodyM text-medium-grey mt-4 text-bold">
              Current Status
            </p>
          </div>
        </div>
      )}
    </>
  );
}

