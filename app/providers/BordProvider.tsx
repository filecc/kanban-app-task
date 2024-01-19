"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/db";

interface BoardContextType {
    board: Board;
    setBoard: (selectedBoard: Board) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function useBoard() {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const data = useLiveQuery(() => db.boards.toArray());
    const [localBoard, setLocalBoard] = useState<Board>();
    const [board, setBoard] = useState<Board | any>(localBoard ? localBoard : (data ? data[0] : {}));
    const tasks = useLiveQuery(() => db.tasks.toArray())


    useEffect(() => {
        const localData = localStorage.getItem("board");
        if(localData){
            setLocalBoard(JSON.parse(localData))
        }
    }, [])
    
    useEffect(() => {
        
        if(localBoard && tasks){
            // add tasks from tasks
            const newBoard = {
                name: localBoard.name,
                id: localBoard.id,
                columns: localBoard.columns?.map(column => {
                    return {
                        ...column,
                        tasks: tasks.filter(task => task.columnId === column.id)
                    }
                })
            }
            setBoard(newBoard)
            
        }
    }, [localBoard, tasks])

    return (
        <BoardContext.Provider value={{ board, setBoard }}>
            {children}
        </BoardContext.Provider>
    );
}
