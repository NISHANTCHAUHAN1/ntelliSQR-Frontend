export default function TodoItem({ todo, onEdit, onDelete, onToggle }: any) {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          className="w-4 h-4"
        />

        <div>
          <div className={`${todo.completed ? "line-through" : ""} font-medium`}>
            {todo.title}
          </div>
          {todo.description && (
            <div className="text-sm text-gray-600">{todo.description}</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(todo)} className="px-3 py-1 border rounded">
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
