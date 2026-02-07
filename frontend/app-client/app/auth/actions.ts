"use server";

import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Stores both access and refresh tokens in httpOnly cookies.
 * This should be called after successful login.
 */
export async function storeTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  cookieStore.set("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

/**
 * Stores a single token in httpOnly cookies.
 * Useful for storing refreshed access tokens.
 */
export async function storeAccessToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
}

/**
 * Removes both access and refresh tokens from cookies.
 * This should be called on logout.
 */
export async function removeTokens() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

/**
 * Gets the current tokens from cookies.
 * Returns null if tokens don't exist.
 */
export async function getTokens() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
  };
}

/**
 * Checks if the user has valid auth tokens.
 */
export async function hasValidTokens() {
  const { accessToken } = await getTokens();
  return !!accessToken;
}
