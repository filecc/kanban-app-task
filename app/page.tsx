"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./lib/db";
import AddBoard from "./components/AddBoard";
import Column from "./components/Column";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { classNames } from "./lib/functions";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const data = useLiveQuery(() => db.boards.toArray());
  if (!data) return <Loader />;
  return (
    <>
      <div className="md:hidden">
        <Navbar boards={data} />
      </div>
      <div className="hidden md:block">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} boards={data} />
      </div>

      {data && data.length > 0 ? (
       <div className={classNames(isSidebarOpen ? 'flex' : '')}>
        <div className={classNames("min-w-[260px] hidden md:block", isSidebarOpen ? '' : 'hidden')}></div>
         <Column />
       </div>
      ) : (
        <section className="flex-grow grid place-items-center">
          <div className="text-center px-6 flex flex-col items-center gap-6">
            <AddBoard />
          </div>{" "}
        </section>
      )}
    </>
  );
}
