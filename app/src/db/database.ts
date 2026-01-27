import Dexie, { Table } from "dexie";

export interface TaskRecord {
  id: string; // UUID local
  serverId: number | null;
  text: string;
  wasSync: 0 | 1;
  createdAt: string;
  isDeleted: 0 | 1;
  deletedAt: string | null;
}

export interface SignatureRecord {
  id?: number;
  userId: string;
  image: Blob;
  createdAt: Date;
  synced: boolean;
}
export class TaskDatabase extends Dexie {
  tasks!: Table<TaskRecord>;
  signatures!: Table<SignatureRecord, number>;

  constructor() {
    super("TaskDB");
    this.version(2).stores({
      tasks: "id, wasSync, createdAt, isDeleted", // Primary key (id) and indexed props
      signatures: "++id, userId, createdAt, synced", // When ++ is used the id is auto generated
    });
  }
}

export const db = new TaskDatabase();
