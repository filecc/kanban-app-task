// db.ts
import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
  boards!: Table<Board>;
  tasks!: Table<Task>;

  constructor() {
    super("kanban-filecc-db");
    this.version(1).stores({
      boards: "id, name, columns",
      tasks: "id, boardId, name, description, columnId",
    });
  }
}

export const db = new MySubClassedDexie();
