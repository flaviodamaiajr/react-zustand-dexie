import { taskRepo } from "../db/task.repo";
import { api } from "../lib/api";
import { useTaskStore } from "../store/task";

let syncing = false;

interface CreateTaskPayload {
  text: string;
  createdAt: string;
  deletedAt: string | null;
}

export async function syncTasks() {
  if (syncing) return;
  syncing = true;

  try {
    const tasks = await taskRepo.getPendingSync();

    if (tasks.length === 0) return;

    const payload: CreateTaskPayload[] = tasks.map((task) => ({
      text: task.text,
      createdAt: new Date(task.createdAt).toISOString(),
      deletedAt: task.deletedAt ? new Date(task.deletedAt).toISOString() : null,
    }));

    await api.post("/sync", payload);

    for (const task of tasks) {
      await taskRepo.markAsSynced(task.id);
    }

    const updatedTasks = await taskRepo.getAll();
    useTaskStore.getState().hydrate(updatedTasks);

  } catch (err) {
    console.error("Sync failed", err);
  } finally {
    syncing = false;
  }
}
