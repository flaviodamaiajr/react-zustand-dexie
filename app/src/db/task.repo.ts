import { db, TaskRecord } from "../db/database";
import { Status } from "../enums/status";

export const taskRepo = {
  save(task: TaskRecord) {
    return db.tasks.add(task);
  },
  getAll(): Promise<TaskRecord[]> {
    return db.tasks.where("isDeleted").equals(Status.NO).toArray();
  },
  getPendingSync(): Promise<TaskRecord[]> {
    return db.tasks.where("wasSync").equals(Status.NO).toArray();
  },
  markAsSynced(id: string) {
    return db.tasks.update(id, {
      wasSync: Status.YES,
    });
  },
  update(id: string, changes: Partial<TaskRecord>) {
    return db.tasks.update(id, {
      ...changes,
      wasSync: Status.NO,
    });
  },
  remove(id: string) {
    return db.tasks.delete(id);
  },
  // Testar depois, mas apenas por curiosidade.
  clear() {
    return db.tasks.clear();
  },
};

