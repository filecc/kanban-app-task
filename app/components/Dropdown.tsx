"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../lib/functions";
import EditBoard from "./EditBoard";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col gap-4 py-4 px-6 text-bodyL">
            <EditBoard classes="bg-none my-0 py-0" hideIcon={true} />
            <p className="text-red">Delete board</p>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
