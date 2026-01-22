import { create } from "zustand";

type Task = {
  id: string | number;
  text: string;
  wasSync: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: number | string) => void;
  editTask: (id: number | string, text: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text: text, wasSync: false }],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  editTask: (id, text) =>
    set((state) => {
      const index = state.tasks.findIndex((t) => t.id === id);

      if (index === -1) return state;

      const tasks = [...state.tasks];
      tasks[index] = { ...tasks[index], text };

      return { tasks };
    }),
}));
