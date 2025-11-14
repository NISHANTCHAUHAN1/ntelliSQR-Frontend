import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useToggleTodo } from "../hooks/useTodos";
import { useState } from "react";
import { CheckCircle2, ListTodo, Loader2 } from "lucide-react";

export default function TodosPage() {
  const { data: todos, isLoading } = useTodos();
  const create = useCreateTodo();
  const update = useUpdateTodo();
  const del = useDeleteTodo();
  const toggle = useToggleTodo();

  const [editing, setEditing] = useState<any>(null);

  const completedCount = todos?.filter((t: any) => t.completed).length || 0;
  const totalCount = todos?.length || 0;
  const pendingCount = totalCount - completedCount;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your todos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mb-5">
 
        {totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <ListTodo size={20} />
                <span className="text-sm font-medium">Total</span>
              </div>
              <div className="text-3xl font-bold text-blue-700">{totalCount}</div>
            </div>

            <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <div className="w-5 h-5 rounded-full border-2 border-orange-600"></div>
                <span className="text-sm font-medium">Pending</span>
              </div>
              <div className="text-3xl font-bold text-orange-700">{pendingCount}</div>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <div className="text-3xl font-bold text-green-700">{completedCount}</div>
            </div>
          </div>
        )}

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

      
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ListTodo size={24} className="text-gray-600" />
              Your Todos
              {totalCount > 0 && (
                <span className="ml-auto text-sm font-medium text-gray-500">
                  {pendingCount} pending
                </span>
              )}
            </h2>
          </div>

          <div className="p-4">
            {totalCount === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo size={36} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No todos yet</h3>
                <p className="text-gray-500 text-sm">
                  Create your first todo above to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}