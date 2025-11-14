import { useForm } from "react-hook-form";
import { useForgot } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "../schemas/auth";
import { useState } from "react";

export default function Forgot() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(forgotSchema) });
  const forgot = useForgot();

  const [resetUrl, setResetUrl] = useState<string | null>(null);

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-3">
        <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>

        <form
          onSubmit={handleSubmit(async (vals) => {
            const { resetUrl } = await forgot.mutateAsync(vals);
            setResetUrl(resetUrl);
          })}
          className="space-y-3"
        >
          <input {...register("email")} className="w-full border p-2 rounded" placeholder="Email" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Reset Link
          </button>
        </form>

        {resetUrl && (
          <div className="p-3 rounded bg-gray-50 border">
            <p className="text-sm text-gray-700">Reset Link:</p>
            <a href={resetUrl} className="text-blue-600 break-all">{resetUrl}</a>
          </div>
        )}
      </div>
    </Layout>
  );
}
