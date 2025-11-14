import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useReset } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../schemas/auth";
import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Reset() {
  const { token } = useParams();
  const reset = useReset();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(resetSchema) 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (vals: any) => {
    if (token) {
      await reset.mutateAsync({ token, payload: vals });
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/todos");
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-linear-to-br from-purple-50 to-blue-50 p-8 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h1>
              <p className="text-gray-600 text-sm">
                Choose a strong password to secure your account
              </p>
            </div>

            {/* Form Section */}
            <div className="p-8">
              {!isSuccess ? (
                <div className="space-y-5">
                  {/* Password Requirements Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Lock size={16} />
                      Password Requirements:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1 ml-6 list-disc">
                      <li>At least 8 characters long</li>
                      <li>Mix of letters, numbers & symbols</li>
                      <li>Avoid common passwords</li>
                    </ul>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder:text-gray-400"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={reset.isPending}
                    className="w-full bg-linear-to-r from-purple-500 to-blue-600 text-white py-4 rounded-xl font-medium hover:from-purple-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {reset.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Resetting Password...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <ShieldCheck size={20} />
                        Reset Password
                      </span>
                    )}
                  </button>

                  {/* Security Note */}
                  <div className="text-center text-xs text-gray-500 pt-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="flex items-center justify-center gap-1">
                      <Lock size={12} />
                      Your password is encrypted and secure
                    </p>
                  </div>
                </div>
              ) : (
                /* Success State */
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h3>
                  <p className="text-gray-600 mb-4">
                    Your password has been successfully reset
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 inline-flex items-center gap-2 text-green-700 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Redirecting to your todos...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Link expired?{" "}
              <a href="/forgot" className="text-purple-600 hover:underline font-medium">
                Request a new one
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}