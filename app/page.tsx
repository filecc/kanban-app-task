"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./lib/db";
import AddBoard from "./components/AddBoard";
import Column from "./components/Column";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const data = useLiveQuery(() => db.boards.toArray());
  if (!data) return <Loader />;
  return (
    <>
      <div className="md:hidden">
        <Navbar boards={data} />
      </div>
      <div className="hidden md:block">
        <Sidebar boards={data} />
      </div>

      {data && data.length > 0 ? (
        <Column />
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
