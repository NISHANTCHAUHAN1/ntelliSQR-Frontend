import { useForm } from "react-hook-form";
import { useForgot } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "../schemas/auth";
import { useState } from "react";
import { Mail, KeyRound, ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(forgotSchema) });
  const forgot = useForgot();

  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (resetUrl) {
      navigator.clipboard.writeText(resetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-8 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <KeyRound size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
              <p className="text-gray-600 text-sm">
                No worries! Enter your email and we'll send you a reset link
              </p>
            </div>

            {/* Form Section */}
            <div className="p-8">
              {!resetUrl ? (
                <div className="space-y-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-400"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <button
                    onClick={handleSubmit(async (vals) => {
                      const { resetUrl } = await forgot.mutateAsync(vals);
                      setResetUrl(resetUrl);
                    })}
                    disabled={forgot.isPending}
                    className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {forgot.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </span>
                    ) : (
                      "Generate Reset Link"
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-500 pt-2">
                    Remember your password?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                      Sign in
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Success Message */}
                  <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Link Generated!</h3>
                    <p className="text-gray-600 text-sm">
                      Your password reset link has been generated successfully
                    </p>
                  </div>

                  {/* Reset URL Display */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Reset Link:</p>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 break-all text-sm text-gray-600 mb-3">
                      {resetUrl}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 size={18} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={18} />
                            Copy Link
                          </>
                        )}
                      </button>

                      <a
                        href={resetUrl}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all"
                      >
                        <ExternalLink size={18} />
                        Open Link
                      </a>
                    </div>
                  </div>

                  {/* Try Another Email */}
                  <button
                    onClick={() => setResetUrl(null)}
                    className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                  >
                    Try Another Email
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}