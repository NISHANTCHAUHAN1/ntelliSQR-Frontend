import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/auth";
import { useSignup } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const signup = useSignup();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
            <Link to="/login">
              <button className="w-full py-4 border-2 border-gray-800 rounded-full font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                Log in
              </button>
            </Link>
            <button className="w-full py-4 bg-blue-300 rounded-full font-medium text-gray-800 hover:bg-blue-400 transition-colors">
              Sign Up
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative">
          <div className="absolute top-8 right-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
              <path d="M20 15 C20 15, 24 13, 28 15 L32 17 C36 19, 38 23, 36 27 L34 31 C32 35, 28 37, 24 35 L20 33 C16 31, 14 27, 16 23 Z" fill="#1F2937"/>
              <path d="M35 20 C35 20, 38 19, 40 20 L42 21 C44 22, 45 24, 44 26 L43 28 C42 30, 40 31, 38 30 L36 29 C34 28, 33 26, 34 24 Z" fill="#34D399"/>
              <circle cx="46" cy="28" r="3" fill="#60A5FA"/>
            </svg>
          </div>

          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign up</h2>
            <p className="text-gray-500">Create an account, It's free</p>
          </div>

          <div className="space-y-5">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleSubmit(async (vals) => {
                await signup.mutateAsync(vals);
                navigate("/todos");
              })}
              className="w-full py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors mt-2"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already gain an account?{' '}
            <Link to="/login" className="text-gray-800 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}