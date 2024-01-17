"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./lib/db";
import AddBoard from "./components/AddBoard";
import Column from "./components/Column";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

export default function Home() {
  const data = useLiveQuery(() => db.boards.toArray());
  if (!data) return <Loader />;
  return (
    <>
      <Navbar boards={data} />

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
