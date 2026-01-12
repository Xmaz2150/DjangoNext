"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthActions, getErrorMessage } from "@/app/auth/utils";
import Link from "next/link";

export default function ActivatePage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const uid = params.uid as string;
  const token = params.token as string;

  const { activateUser } = AuthActions();

  useEffect(() => {
    const activate = async () => {
      if (!uid || !token) {
        setStatus("error");
        setErrorMessage("Invalid activation link.");
        return;
      }

      try {
        await activateUser(uid, token).res();
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(getErrorMessage(err));
      }
    };

    activate();
  }, [uid, token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Activating Your Account
            </h1>
            <p className="text-center text-zinc-600 dark:text-zinc-400">
              Please wait while we verify your email...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Account Activated!
            </h1>
            <p className="mb-6 text-center text-zinc-600 dark:text-zinc-400">
              Your email has been verified successfully. You can now sign in to your account.
            </p>
            <Link
              href="/auth/login"
              className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Activation Failed
            </h1>
            <p className="mb-6 text-center text-zinc-600 dark:text-zinc-400">
              {errorMessage || "The activation link is invalid or has expired."}
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
              >
                Go to Login
              </Link>
              <Link
                href="/auth/resend-activation"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-center font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Resend Activation Email
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
