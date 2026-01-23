// use-cases/addTask.ts
import { useTaskStore } from "../store/task";
import { taskRepo } from "../db/task.repo";
import { TaskRecord } from "../db/database";

export async function createTask(text: string) {
  const task: TaskRecord = {
    id: crypto.randomUUID(),
    text,
    wasSync: 0,
    createdAt: Date.now(),
    deletedAt: null,
    isDeleted: 0,
  };

  useTaskStore.getState().addTask(task);

  await taskRepo.save(task);
}

export async function updateTask(
  id: string,
  changes: Pick<TaskRecord, "text">,
) {
  useTaskStore.getState().editTask(id, changes);

  await taskRepo.update(id, {
    ...changes,
    wasSync: 0,
  });
}

export async function listTasks() {
  const tasks = await taskRepo.getAll();
  useTaskStore.getState().hydrate(tasks);
}

export async function removeTask(id: string) {
  useTaskStore.getState().removeTask(id);

  await taskRepo.update(id, {
    deletedAt: Date.now(),
    isDeleted: 1,
    wasSync: 0,
  });
}
