"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";

export default function ApiTest() {
  const [customEndpoint, setCustomEndpoint] = useState("/auth/users/me");
  const [customResult, setCustomResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test the /auth/users/me endpoint with SWR
  const { data: userData, error: userError, isLoading: userLoading } = useSWR(
    "/auth/users/me",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const testCustomEndpoint = async () => {
    setIsLoading(true);
    setError(null);
    setCustomResult(null);

    try {
      const result = await fetcher(customEndpoint);
      setCustomResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-6">
            🌐 API Test Page
          </h1>

          {/* Current User Test */}
          <div className="mb-8 p-4 rounded-lg border dark:border-zinc-700">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-4">
              Test: GET /auth/users/me
            </h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
              This endpoint requires authentication. If you&apos;re logged in, it
              will return your user data.
            </p>

            <div className="bg-gray-100 dark:bg-zinc-800 dark:bg-zinc-800 rounded-lg p-4">
              {userLoading && (
                <div className="text-gray-600 dark:text-zinc-400">Loading...</div>
              )}
              {userError && (
                <div className="text-red-600 dark:text-red-400">
                  <p className="font-semibold">Error:</p>
                  <p>Not authenticated or token expired</p>
                </div>
              )}
              {userData && (
                <div>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                    ✅ Success!
                  </p>
                  <pre className="text-sm overflow-auto dark:text-zinc-300">
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </div>
              )}
              {!userLoading && !userError && !userData && (
                <div className="text-gray-500 dark:text-zinc-500">No data</div>
              )}
            </div>
          </div>

          {/* Custom Endpoint Test */}
          <div className="mb-8 p-4 rounded-lg border dark:border-zinc-700">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-4">
              Custom Endpoint Test
            </h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
              Test any authenticated API endpoint. The request will include
              your access token and handle auto-refresh.
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                placeholder="/api/endpoint"
                className="flex-1 px-4 py-2 border dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <button
                onClick={testCustomEndpoint}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Testing..." : "Test"}
              </button>
            </div>

            {(customResult || error) && (
              <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4">
                {error && (
                  <div className="text-red-600 dark:text-red-400">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                  </div>
                )}
                {customResult && (
                  <div>
                    <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                      ✅ Response:
                    </p>
                    <pre className="text-sm overflow-auto whitespace-pre-wrap dark:text-zinc-300">
                      {customResult}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Available Endpoints */}
          <div className="p-4 rounded-lg border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-3">Common Endpoints</h2>
            <ul className="text-sm space-y-2 dark:text-zinc-300">
              <li>
                <code className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded">
                  /auth/users/me
                </code>{" "}
                - Get current user (requires auth)
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded">
                  /auth/jwt/verify
                </code>{" "}
                - Verify access token
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded">/api/</code> -
                Your custom API endpoints
              </li>
            </ul>
          </div>

          {/* Auth Status Indicator */}
          <div className="mt-6 p-4 rounded-lg border dark:border-zinc-700">
            <h3 className="font-semibold dark:text-zinc-200 mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                Login
              </Link>
              <Link
                href="/demo/cookies"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
              >
                Check Cookies
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
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
