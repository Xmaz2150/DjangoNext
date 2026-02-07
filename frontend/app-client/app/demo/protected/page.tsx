"use client";

import { useEffect, useState } from "react";
import { hasValidTokens } from "@/app/auth/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProtectedDemo() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [checkTime, setCheckTime] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const hasTokens = await hasValidTokens();
      setIsAuthenticated(hasTokens);
      setCheckTime(new Date().toLocaleTimeString());
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center">
        <div className="text-gray-600 dark:text-zinc-400">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-6">
            🔒 Protected Demo Page
          </h1>

          {/* Access Status */}
          <div
            className={`mb-6 p-6 rounded-lg border-2 ${
              isAuthenticated
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-red-500 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-3xl ${
                  isAuthenticated ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {isAuthenticated ? "✅" : "❌"}
              </span>
              <h2
                className={`text-xl font-semibold ${
                  isAuthenticated ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                }`}
              >
                {isAuthenticated
                  ? "Access Granted!"
                  : "Authentication Required"}
              </h2>
            </div>
            <p
              className={`${
                isAuthenticated ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
              }`}
            >
              {isAuthenticated
                ? "You have a valid access token. You can access protected resources."
                : "You don't have a valid access token. Please log in to access protected resources."}
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-500 mt-2">
              Last checked: {checkTime}
            </p>
          </div>

          {/* Explanation */}
          <div className="mb-6 p-4 rounded-lg border dark:border-zinc-700 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              How This Page Works
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>
                • This page is <strong>not</strong> protected by middleware
                (it&apos;s in the public routes list)
              </li>
              <li>
                • Instead, it checks authentication client-side using the{" "}
                <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">hasValidTokens</code>{" "}
                server action
              </li>
              <li>
                • This demonstrates how you can conditionally show content based
                on auth status
              </li>
            </ul>
          </div>

          {/* Middleware vs Client-side Protection */}
          <div className="mb-6 p-4 rounded-lg border dark:border-zinc-700">
            <h3 className="font-semibold text-gray-800 dark:text-zinc-200 mb-3">
              Middleware vs Client-side Protection
            </h3>
            <table className="w-full text-sm dark:text-zinc-300">
              <thead>
                <tr className="border-b dark:border-zinc-700">
                  <th className="py-2 text-left">Method</th>
                  <th className="py-2 text-left">When to Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-zinc-700">
                  <td className="py-2 font-medium">Middleware</td>
                  <td className="py-2">
                    Full page protection (redirects before page loads)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Client-side</td>
                  <td className="py-2">
                    Conditional content, partial protection, or when page should
                    load for all users
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {!isAuthenticated && (
              <Link
                href="/auth/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Login Now
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Go to Dashboard
              </Link>
            )}
            <button
              onClick={() => router.refresh()}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Re-check Auth
            </button>
          </div>

          <div className="mt-8 pt-6 border-t dark:border-zinc-700">
            <Link href="/demo" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Demo Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
