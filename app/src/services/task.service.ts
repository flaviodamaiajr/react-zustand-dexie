import { useTaskStore } from "../store/task";
import { taskRepo } from "../db/task.repo";
import { TaskRecord } from "../db/database";
import { Status } from "../enums/status";

export async function createTask(text: string) {
  const task: TaskRecord = {
    id: crypto.randomUUID(),
    serverId: null,
    text,
    wasSync: Status.NO,
    createdAt: new Date().toISOString(),
    deletedAt: null,
    isDeleted: Status.NO,
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
    wasSync: Status.NO,
  });
}

export async function listTasks() {
  const tasks = await taskRepo.getAll();
  useTaskStore.getState().hydrate(tasks);
}

export async function removeTask(id: string) {
  useTaskStore.getState().removeTask(id);

  await taskRepo.update(id, {
    deletedAt:  new Date().toISOString(),
    isDeleted: Status.YES,
    wasSync: Status.NO,
  });
}
