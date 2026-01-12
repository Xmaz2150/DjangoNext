import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions, getErrorMessage } from "@/app/auth/utils";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>();
  const router = useRouter();
  const { resetPasswordConfirm } = AuthActions();

  const searchParams = useSearchParams();
  const password = watch("password");

  // State for UID and Token
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  // Extract UID and Token from URL
  useEffect(() => {
    if (searchParams.get("uid") && searchParams.get("token")) {
      setUid(searchParams.get("uid") as string);
      setToken(searchParams.get("token") as string);
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    if (!uid || !token) {
      setError("root", {
        type: "manual",
        message: "Invalid password reset link. Please request a new one.",
      });
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");
    try {
      await resetPasswordConfirm(
        data.password,
        data.confirmPassword,
        token,
        uid
      ).res();
      setSuccessMessage("Password has been reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: getErrorMessage(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Set New Password
        </h1>
        <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
          Enter your new password below
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password.message}</span>
            )}
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confirmPassword.message}</span>
            )}
          </div>
          
          <button
            disabled={isLoading}
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
          
          {successMessage && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
              {successMessage}
            </div>
          )}
          {errors.root && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {errors.root.message}
            </div>
          )}
        </form>
        
        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Remember your password?{" "}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;