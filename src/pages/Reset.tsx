import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useReset } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../schemas/auth";

export default function Reset() {
  const { token } = useParams();
  const reset = useReset();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ resolver: zodResolver(resetSchema) });

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-3">
        <h2 className="text-xl font-semibold mb-2">Create New Password</h2>

        <form
          onSubmit={handleSubmit(async (vals) => {
            if (token) {
              await reset.mutateAsync({ token, payload: vals });
              navigate("/todos");
            }
          })}
          className="space-y-3"
        >
          <input {...register("password")} className="w-full border p-2 rounded" placeholder="New password" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}
