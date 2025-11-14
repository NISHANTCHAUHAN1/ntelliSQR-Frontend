import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

// -------------------- GET TODOS --------------------
export const useTodos = () =>
  useQuery({
    queryKey: ["todos"] as const,
    queryFn: async () => {
      const { data } = await api.get("/todos");
      return data;
    },
  });

// -------------------- CREATE TODO --------------------
export const useCreateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/todos", payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

// -------------------- UPDATE TODO --------------------
export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: any) => {
      const { data } = await api.put(`/todos/${id}`, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

// -------------------- DELETE TODO --------------------
export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todos/${id}`);
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

// -------------------- TOGGLE TODO --------------------
export const useToggleTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/todos/${id}/toggle`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};
