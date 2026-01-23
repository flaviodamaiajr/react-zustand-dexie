import Dexie, { Table } from "dexie";

export interface TaskRecord {
  id: string; // UUID local
  serverId: number | null,
  text: string;
  wasSync: 0 | 1;
  createdAt: string;
  isDeleted: 0 | 1;
  deletedAt: string | null;
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
