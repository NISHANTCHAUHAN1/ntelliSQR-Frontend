import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoCreateSchema } from "../schemas/todo";

export default function TodoForm({ initial, onSubmit }: any) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: initial || { title: "", description: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((vals) => {
        onSubmit(vals);
        reset();
      })}
      className="bg-white p-4 rounded shadow mb-4 space-y-3"
    >
      <input
        {...register("title")}
        className="w-full border p-2 rounded"
        placeholder="Title"
      />
      <textarea
        {...register("description")}
        className="w-full border p-2 rounded"
        placeholder="Description"
      ></textarea>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Save Todo
      </button>
    </form>
  );
}
