import { Check, Trash2, Edit2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function TodoItem({ todo, onEdit, onDelete, onToggle }: any) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">

        <button
          onClick={() => onToggle(todo._id)}
          className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 transition-all ${
            todo.completed
              ? "bg-linear-to-br from-green-400 to-green-500 border-green-500"
              : "border-gray-300 hover:border-blue-400"
          } flex items-center justify-center`}
        >
          {todo.completed && <Check size={16} className="text-white" strokeWidth={3} />}
        </button>

 
        <div className="flex-1 min-w-0">
          <div
            className={`font-medium text-gray-800 ${
              todo.completed ? "line-through text-gray-400" : ""
            } wrap-break-word`}
          >
            {todo.title}
          </div>
          {todo.description && (
            <div
              className={`text-sm mt-1 ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-600"
              } wrap-break-word`}
            >
              {todo.description}
            </div>
          )}
        </div>

  
        <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="md:hidden relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-32">
                <button
                  onClick={() => {
                    onEdit(todo);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(todo._id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}