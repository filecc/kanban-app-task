// db.ts
import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
  boards!: Table<Board>;

  constructor() {
    super("kanban-filecc-db");
    this.version(1).stores({
      boards: "id, name, columns",
    });
  }
}

export const db = new MySubClassedDexie();
