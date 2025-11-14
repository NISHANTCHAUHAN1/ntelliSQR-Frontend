import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";

export default function Layout({ children }: { children: any }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <Link to="/todos" className="text-xl font-semibold">Todo App</Link>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-200">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </header>

      {children}
    </div>
  );
}
