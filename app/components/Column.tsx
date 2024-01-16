import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { useBoard } from "../providers/BordProvider"

export default function Column(){
    const { board, setBoard } = useBoard()
    return <>
    {board.name}
    </>
}