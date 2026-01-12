import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Use native Next.js cookie access for Edge Runtime
  const accessToken = request.cookies.get("accessToken")?.value;

  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/password/reset-password",
    "/auth/password/reset-password-confirmation",
    "/demo",
    "/demo/cookies",
    "/demo/api-test",
  ]; // api-test still requires auth but is public for demo purposes
  
  // Check if the current path starts with any public route
  const isPublicRoute = publicRoutes.some(
    (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/")
  );

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};