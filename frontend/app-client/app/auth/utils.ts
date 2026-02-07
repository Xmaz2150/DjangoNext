import wretch from "wretch";

import { API_BASE_URL } from "@/lib/api";

// Base API setup for making HTTP requests
const api = wretch(API_BASE_URL).accept("application/json");

/**
 * Helper function to safely extract error messages from wretch errors.
 * Handles various error response formats.
 */
export const getErrorMessage = (err: unknown): string => {
  // Handle wretch errors with JSON response
  if (err && typeof err === "object" && "json" in err) {
    const errorJson = (err as { json: unknown }).json;
    if (errorJson && typeof errorJson === "object") {
      // Check common error response patterns
      if ("detail" in errorJson && typeof errorJson.detail === "string") {
        return errorJson.detail;
      }
      if ("message" in errorJson && typeof errorJson.message === "string") {
        return errorJson.message;
      }
      // Handle field-specific errors (e.g., {"email": ["This field is required"]})
      const firstFieldError = Object.values(errorJson).find(
        (val) => Array.isArray(val) && val.length > 0
      );
      if (firstFieldError && Array.isArray(firstFieldError)) {
        return firstFieldError[0];
      }
    }
  }

  // Handle standard Error objects
  if (err instanceof Error) {
    return err.message;
  }

  return "An unexpected error occurred. Please try again.";
};

const register = (email: string, username: string, password: string) => {
  return api.post({ email, username, password }, "/auth/users/");
};

const login = (username: string, password: string) => {
  return api.post({ username, password }, "/auth/jwt/create");
};

const logout = (refreshToken: string) => {
  return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = (refreshToken: string) => {
  return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

const resetPassword = (email: string) => {
  return api.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
) => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "/auth/users/reset_password_confirm/"
  );
};

const activateUser = (uid: string, token: string) => {
  return api.post({ uid, token }, "/auth/users/activation/");
};

const resendActivation = (email: string) => {
  return api.post({ email }, "/auth/users/resend_activation/");
};

const changePassword = (
  current_password: string,
  new_password: string,
  re_new_password: string,
  accessToken: string
) => {
  return api
    .auth(`Bearer ${accessToken}`)
    .post(
      { current_password, new_password, re_new_password },
      "/auth/users/set_password/"
    );
};

const updateProfile = (
  data: { username?: string; email?: string },
  accessToken: string
) => {
  return api.auth(`Bearer ${accessToken}`).patch(data, "/auth/users/me/");
};

const getMe = (accessToken: string) => {
  return api.auth(`Bearer ${accessToken}`).get("/auth/users/me/");
};

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    logout,
    activateUser,
    resendActivation,
    changePassword,
    updateProfile,
    getMe,
  };
};