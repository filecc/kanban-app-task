interface Board {
    id: string;
    name: string;
    columns?: Column[];
  }
  
 interface Column {
    id: string;
    name: string;
    tasks?: Task[];
  }
  
interface Task {
    id: string;
    title: string;
    boardId?: string;
    columnId?: string;
    description?: string;
    subtasks?: Subtask[];
  }
  
interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
  }