import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoCreateSchema } from "../schemas/todo";
import { Plus, X } from "lucide-react";

export default function TodoForm({ initial, onSubmit }: any) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: initial || { title: "", description: "" },
  });

  const isEditing = !!initial;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {isEditing ? (
            <>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Edit Todo
            </>
          ) : (
            <>
              <Plus size={20} className="text-blue-500" />
              Add New Todo
            </>
          )}
        </h2>
        {isEditing && (
          <button
            onClick={() => reset({ title: "", description: "" })}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <input
            {...register("title")}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-400"
            placeholder="What needs to be done?"
          />
        </div>

        <div>
          <textarea
            {...register("description")}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-400 resize-none"
            placeholder="Add some details... (optional)"
            rows={3}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit((vals) => {
            onSubmit(vals);
            reset();
          })}
          className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {isEditing ? (
            <>
              <span>Update Todo</span>
            </>
          ) : (
            <>
              <Plus size={20} />
              <span>Add Todo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}