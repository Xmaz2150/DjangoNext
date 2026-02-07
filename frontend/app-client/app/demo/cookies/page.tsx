import { getTokens, hasValidTokens } from "@/app/auth/actions";

export default async function CookieInspector() {
  const tokens = await getTokens();
  const isAuthenticated = await hasValidTokens();

  // Mask tokens for security (show only first and last 10 chars)
  const maskToken = (token: string | null): string => {
    if (!token) return "Not set";
    if (token.length <= 20) return "****";
    return `${token.slice(0, 10)}...${token.slice(-10)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-6">
            🍪 Cookie Inspector
          </h1>

          {/* Auth Status */}
          <div className="mb-6 p-4 rounded-lg border dark:border-zinc-700">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-2">Authentication Status</h2>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isAuthenticated ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={
                  isAuthenticated ? "text-green-700" : "text-red-700"
                }
              >
                {isAuthenticated ? "Authenticated" : "Not Authenticated"}
              </span>
            </div>
          </div>

          {/* Access Token */}
          <div className="mb-4 p-4 rounded-lg border dark:border-zinc-700">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-2">Access Token</h2>
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded font-mono text-sm break-all dark:text-zinc-300">
              {maskToken(tokens.accessToken)}
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">
              {tokens.accessToken
                ? "✅ Token present (masked for security)"
                : "❌ No access token found"}
            </p>
          </div>

          {/* Refresh Token */}
          <div className="mb-6 p-4 rounded-lg border dark:border-zinc-700">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-2">Refresh Token</h2>
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded font-mono text-sm break-all dark:text-zinc-300">
              {maskToken(tokens.refreshToken)}
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">
              {tokens.refreshToken
                ? "✅ Token present (masked for security)"
                : "❌ No refresh token found"}
            </p>
          </div>

          {/* Security Info */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              🔒 Security Note
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Tokens are stored in <strong>httpOnly</strong> cookies, which
              means they cannot be accessed by JavaScript in the browser. This
              protects against XSS attacks. The values shown above are read
              server-side.
            </p>
          </div>

          {/* Cookie Properties */}
          <div className="p-4 rounded-lg border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
            <h2 className="text-lg font-semibold dark:text-zinc-200 mb-3">Cookie Configuration</h2>
            <table className="w-full text-sm dark:text-zinc-300">
              <tbody>
                <tr className="border-b dark:border-zinc-700">
                  <td className="py-2 font-medium">httpOnly</td>
                  <td className="py-2 text-green-600 dark:text-green-400">✅ true</td>
                </tr>
                <tr className="border-b dark:border-zinc-700">
                  <td className="py-2 font-medium">secure</td>
                  <td className="py-2">
                    {process.env.NODE_ENV === "production" ? (
                      <span className="text-green-600 dark:text-green-400">✅ true</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400">⚠️ false (dev mode)</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b dark:border-zinc-700">
                  <td className="py-2 font-medium">sameSite</td>
                  <td className="py-2 text-green-600 dark:text-green-400">✅ lax</td>
                </tr>
                <tr className="border-b dark:border-zinc-700">
                  <td className="py-2 font-medium">Access Token MaxAge</td>
                  <td className="py-2">1 hour</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Refresh Token MaxAge</td>
                  <td className="py-2">7 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t dark:border-zinc-700">
            <a href="/demo" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Demo Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
