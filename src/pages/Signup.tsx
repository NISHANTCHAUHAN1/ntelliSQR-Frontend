import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/auth";
import { useSignup } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Signup() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const signup = useSignup();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Create Account</h2>

        <form
          onSubmit={handleSubmit(async (vals) => {
            await signup.mutateAsync(vals);
            navigate("/todos");
          })}
          className="space-y-3"
        >
          <input {...register("name")} className="w-full border p-2 rounded" placeholder="Name" />
          <input {...register("email")} className="w-full border p-2 rounded" placeholder="Email" />
          <input type="password" {...register("password")} className="w-full border p-2 rounded" placeholder="Password" />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-3">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
