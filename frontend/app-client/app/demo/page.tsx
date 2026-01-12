"use client";

import Link from "next/link";

export default function DemoHome() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 mb-2">
            🔐 Auth Demo Pages
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 mb-8">
            Test and explore the authentication system. These pages help you
            understand how the auth flow works.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Auth Flow Section */}
            <div className="border dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-4">
                🚀 Auth Flow
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/auth/register"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>📝</span> Register
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Create a new account
                  </p>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>🔑</span> Login
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Sign in to your account
                  </p>
                </li>
                <li>
                  <Link
                    href="/auth/password/reset-password"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>🔄</span> Reset Password
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Request a password reset
                  </p>
                </li>
              </ul>
            </div>

            {/* Protected Routes Section */}
            <div className="border dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-4">
                🛡️ Protected Routes
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>📊</span> Dashboard
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Requires authentication
                  </p>
                </li>
                <li>
                  <Link
                    href="/demo/protected"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>🔒</span> Protected Demo
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Test route protection
                  </p>
                </li>
              </ul>
            </div>

            {/* Debug Tools Section */}
            <div className="border dark:border-zinc-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-4">
                🔧 Debug Tools
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/demo/cookies"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>🍪</span> Cookie Inspector
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    View current auth tokens
                  </p>
                </li>
                <li>
                  <Link
                    href="/demo/api-test"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <span>🌐</span> API Test
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 ml-6">
                    Test authenticated API calls
                  </p>
                </li>
              </ul>
            </div>

            {/* Info Section */}
            <div className="border dark:border-zinc-700 rounded-lg p-6 bg-blue-50 dark:bg-blue-900/20">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-4">
                ℹ️ How It Works
              </h2>
              <ul className="text-sm text-gray-700 dark:text-zinc-300 space-y-2">
                <li>
                  • <strong>JWT tokens</strong> are stored in httpOnly cookies
                </li>
                <li>
                  • <strong>Access tokens</strong> expire in 1 hour
                </li>
                <li>
                  • <strong>Refresh tokens</strong> expire in 7 days
                </li>
                <li>
                  • <strong>Auto-refresh</strong> happens on 401 errors
                </li>
                <li>
                  • <strong>Middleware</strong> protects routes server-side
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t dark:border-zinc-700">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
