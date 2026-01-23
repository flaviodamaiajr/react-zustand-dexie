import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { taskRepo } from "../db/task.repo";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.get("/tasks");

      // TODO: Create service to update offline  

      return data;
    },
    staleTime: 1000 * 60,
  });
}
