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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Set New Password</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="text-xs text-red-600">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={isLoading}
              className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <span className="text-sm text-green-600">{successMessage}</span>
            </div>
          )}
          {errors.root && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <span className="text-sm text-red-600">{errors.root.message}</span>
            </div>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;