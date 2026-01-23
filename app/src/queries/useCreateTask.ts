import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useCreateTask() {
  return useMutation({
    mutationFn: (task: any) =>
      api.post("/tasks", task).then(res => res.data),
  });
}
