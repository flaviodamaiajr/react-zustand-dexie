import { db, TaskRecord } from "../db/database";

export const taskRepo = {
  save(task: TaskRecord) {
    return db.tasks.put(task);
  },
  getAll(): Promise<TaskRecord[]> {
    return db.tasks.where("isDeleted").equals(0).toArray();
  },
  getPendingSync(): Promise<TaskRecord[]> {
    return db.tasks.where("wasSync").equals(0).toArray();
  },
  markAsSynced(id: string) {
    return db.tasks.update(id, {
      wasSync: 1,
    });
  },
  update(id: string, changes: Partial<TaskRecord>) {
    return db.tasks.update(id, {
      ...changes,
      wasSync: 0,
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

