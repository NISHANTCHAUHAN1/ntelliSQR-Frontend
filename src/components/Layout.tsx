import { Link } from "react-router-dom";
import useAuthStore from "../store/auth";
import Footer from "./Footer";

export default function Layout({ children }: { children: any }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="max-w-2xl mx-auto ">

      <header className="mb-8 -mx-4 px-4 py-6 bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link to="/todos" className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          
            <span>Todo App</span>
          </Link>

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/90 font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-md"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {children}

      <Footer />
    </div>
  );
}
