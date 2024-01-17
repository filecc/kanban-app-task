import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { useBoard } from "../providers/BordProvider"
import { classNames } from "../lib/functions"

export default function Column(){
    const { board, setBoard } = useBoard()
    const randomTailwind400BgColor = ["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-blue-400", "bg-indigo-400", "bg-pink-400"]
    
    return <section className="flex overflow-x-scroll min-h-dvh">
        {board.columns?.map((column) => {
            return <div key={column.id} className="p-6 min-w-[80%]">
            <h2 className="uppercase text-headingS text-medium-grey tracking-[2.4px] font-bold flex items-center gap-2"><span className={classNames("inline-block w-4 h-4 rounded-full", randomTailwind400BgColor[Math.floor(Math.random() * randomTailwind400BgColor.length)])}></span>{column.name} ({column.tasks?.length ?? 0})</h2>
            {column.tasks?.map((task) => {
                return <div key={task.id} className="mt-6 bg-white dark:bg-dark-grey rounded-lg shadow-lg dark:shadow-dark-grey dark:shadow px-4 py-6">
                <h3 className="text-headingM font-bold">{task.title}</h3>
                <p className="text-bodyM text-medium-grey mt-1">{task.subtasks?.length} subtasks</p>
            </div>
            })}
            {!column.tasks &&
                     <div className="mt-6 bg-white dark:bg-dark-grey rounded-lg  px-4 py-6 grid place-items-center">
                    <p className="text-bodyM text-medium-grey mt-1">No tasks</p>
                </div>
                } 
        </div>
        })}
    </section>
}