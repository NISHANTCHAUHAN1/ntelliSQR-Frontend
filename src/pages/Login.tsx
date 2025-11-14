import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "nishchaynish8@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = async (vals: any) => {
    try {
      setServerError("");
      await login.mutateAsync(vals);
      navigate("/todos");
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col justify-center shadow-lg">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-cyan-100 rounded-full"></div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-3">Welcome</h1>
            <p className="text-gray-500">Have you log in already</p>
          </div>

          <div className="relative mb-8">
            <div className="w-full h-64 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-8 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-cyan-200 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 right-12 w-4 h-4 border-2 border-gray-400 rounded-full"></div>

              <div className="relative z-10 flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-40 bg-blue-300 rounded-2xl transform rotate-12"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-800 rounded-lg transform -rotate-6"></div>
                  <div className="absolute top-4 left-4 w-16 h-20 bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-4 border-2 border-gray-800 rounded-full font-medium text-gray-800 hover:bg-gray-50 transition-colors">
              Log in
            </button>
            <Link to="/signup">
              <button className="w-full py-4 bg-blue-300 rounded-full font-medium text-gray-800 hover:bg-blue-400 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative">
          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Log in</h2>
            <p className="text-gray-500">Welcome back!</p>
            <p className="text-gray-400 text-sm mt-1">
              It’s default ID & password. you can create your own account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded">
                {serverError}
              </p>
            )}

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot"
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-800 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
