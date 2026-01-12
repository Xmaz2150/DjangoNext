import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from 'cookies-next/client';

export function middleware(request: NextRequest) {
  const accessToken = getCookie("accessToken");

  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/password/reset-password", "/auth/password/reset-password-confirmation"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};