import Dexie, { Table } from "dexie";

export interface TaskRecord {
  id: string; // UUID local
  text: string;
  wasSync: 0 | 1;
  createdAt: number;
  isDeleted: 0 | 1;
  deletedAt: number | null;
}

export class TaskDatabase extends Dexie {
  tasks!: Table<TaskRecord>;

  constructor() {
    super("TaskDB");
    this.version(1).stores({
      tasks: "id, wasSync, createdAt, isDeleted", // Primary key (id) and indexed props
    });
  }
}

export const db = new TaskDatabase();
