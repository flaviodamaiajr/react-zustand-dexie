import Dexie, { Table } from "dexie";

export interface TaskRecord {
  id: string; // UUID local
  text: string;
  wasSync: boolean;
  createdAt: number;
}

export class TaskDatabase extends Dexie {
  tasks!: Table<TaskRecord>;

  constructor() {
    super("TaskDB");
    this.version(1).stores({
      tasks: "id, wasSync, createdAt",
    });
  }
}

export const db = new TaskDatabase();
