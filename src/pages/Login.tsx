import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const login = useLogin();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form
          onSubmit={handleSubmit(async (vals) => {
            await login.mutateAsync(vals);
            navigate("/todos");
          })}
          className="space-y-3"
        >
          <input {...register("email")} className="w-full border p-2 rounded" placeholder="Email" />
          <input type="password" {...register("password")} className="w-full border p-2 rounded" placeholder="Password" />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-3">
          <Link to="/forgot" className="text-blue-600">Forgot password?</Link>
        </p>
      </div>
    </Layout>
  );
}
