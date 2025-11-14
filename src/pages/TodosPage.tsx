import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useToggleTodo } from "../hooks/useTodos";
import { useState } from "react";

export default function TodosPage() {
  const { data: todos, isLoading } = useTodos();
  const create = useCreateTodo();
  const update = useUpdateTodo();
  const del = useDeleteTodo();
  const toggle = useToggleTodo();

  const [editing, setEditing] = useState<any>(null);

  if (isLoading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <TodoForm
        initial={editing}
        onSubmit={async (vals: any) => {
          if (editing) {
            await update.mutateAsync({ id: editing._id, payload: vals });
            setEditing(null);
          } else {
            await create.mutateAsync(vals);
          }
        }}
      />

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">Your Todos</h2>

        {todos?.length === 0 && (
          <div className="text-gray-600 text-sm">No todos yet. Create one above.</div>
        )}

        {todos?.map((todo: any) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={setEditing}
            onDelete={(id: string) => del.mutate(id)}
            onToggle={(id: string) => toggle.mutate(id)}
          />
        ))}
      </div>
    </Layout>
  );
}
