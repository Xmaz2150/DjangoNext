import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions, getErrorMessage } from "@/app/auth/utils";
import { storeTokens } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { login } = AuthActions();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const json = await login(data.username, data.password).json<{
        access: string;
        refresh: string;
      }>();
      
      // Store tokens securely via server action
      await storeTokens(json.access, json.refresh);
      
      router.push("/dashboard");
    } catch (err) {
      setError("root", { 
        type: "manual", 
        message: getErrorMessage(err) 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Login to your account</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={isLoading}
            />
            {errors.username && (
              <span className="text-xs text-red-600">{errors.username.message}</span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="text-xs text-red-600">{errors.password.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button 
              disabled={isLoading}
              className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </div>
          {errors.root && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <span className="text-sm text-red-600">{errors.root.message}</span>
            </div>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/auth/password/reset-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link
            href="/auth/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;