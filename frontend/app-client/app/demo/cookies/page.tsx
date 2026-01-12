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
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🍪 Cookie Inspector
          </h1>

          {/* Auth Status */}
          <div className="mb-6 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
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
          <div className="mb-4 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">Access Token</h2>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
              {maskToken(tokens.accessToken)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {tokens.accessToken
                ? "✅ Token present (masked for security)"
                : "❌ No access token found"}
            </p>
          </div>

          {/* Refresh Token */}
          <div className="mb-6 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">Refresh Token</h2>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
              {maskToken(tokens.refreshToken)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {tokens.refreshToken
                ? "✅ Token present (masked for security)"
                : "❌ No refresh token found"}
            </p>
          </div>

          {/* Security Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              🔒 Security Note
            </h3>
            <p className="text-sm text-yellow-700">
              Tokens are stored in <strong>httpOnly</strong> cookies, which
              means they cannot be accessed by JavaScript in the browser. This
              protects against XSS attacks. The values shown above are read
              server-side.
            </p>
          </div>

          {/* Cookie Properties */}
          <div className="p-4 rounded-lg border bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Cookie Configuration</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">httpOnly</td>
                  <td className="py-2 text-green-600">✅ true</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">secure</td>
                  <td className="py-2">
                    {process.env.NODE_ENV === "production" ? (
                      <span className="text-green-600">✅ true</span>
                    ) : (
                      <span className="text-yellow-600">⚠️ false (dev mode)</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">sameSite</td>
                  <td className="py-2 text-green-600">✅ lax</td>
                </tr>
                <tr className="border-b">
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

          <div className="mt-8 pt-6 border-t">
            <a href="/demo" className="text-blue-600 hover:underline">
              ← Back to Demo Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
