import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { useBoard } from "../providers/BordProvider"
import { classNames } from "../lib/functions"
import ViewTask from "./ViewTask"

export default function Column({ board } : { board: Board}){
    const { setBoard } = useBoard()
    const randomTailwind400BgColor = ["bg-cyan-400", "bg-yellow-400", "bg-green-400", "bg-blue-400", "bg-indigo-400", "bg-pink-400"]
    
    return <section className="flex overflow-x-auto min-h-dvh w-full md:pt-20 px-2" >
        {board.columns?.map((column) => {
            return <div key={column.id} className="p-1 min-w-[300px] w-full m-2 max-w-[350px]">
            <h2 className="uppercase text-headingS text-medium-grey tracking-[2.4px] font-bold flex items-center gap-2"><span className={classNames("inline-block w-4 h-4 rounded-full", randomTailwind400BgColor[Math.floor(Math.random() * randomTailwind400BgColor.length)])}></span>{column.name} ({column.tasks?.length ?? 0})</h2>
            {column.tasks?.map((task) => {
                return <div key={task.id} className="mt-6">
                <ViewTask task={task} />
            </div>
            })}
            {!column.tasks &&
                     <div className="mt-6 bg-white dark:bg-dark-grey rounded-lg px-4 py-6 grid place-items-center min-h-[92px]">
                    <p className="text-bodyM text-medium-grey mt-1">No tasks</p>
                </div>
                } 
        </div>
        })}
    </section>
}