import { create } from "zustand";

type Task = {
  id: string;
  text: string;
  wasSync: 0 | 1;
  isDeleted: 0 | 1
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, changes: Partial<Task>) => void;
  hydrate: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  editTask: (id, changes) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    })),
  hydrate: (tasks) => set({ tasks }),
}));
