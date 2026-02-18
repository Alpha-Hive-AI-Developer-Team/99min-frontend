// src/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authApi = {

  // POST /api/auth/signup — ✅ name only, no firstName/lastName
  signup: (payload: { name: string; email: string; password: string }) =>
    request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifySignupOtp: (payload: { email: string; otp: string }) =>
    request("/api/auth/verify-signup-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resendSignupOtp: (payload: { email: string }) =>
    request("/api/auth/resend-signup-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    request<{ success: boolean; data: { user: User; accessToken: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify(payload) }
    ),

  logout: () =>
    request("/api/auth/logout", { method: "POST" }),

  refresh: () =>
    request<{ success: boolean; data: { user: User; accessToken: string } }>(
      "/api/auth/refresh",
      { method: "POST" }
    ),

  forgotPassword: (payload: { email: string }) =>
    request("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyResetOtp: (payload: { email: string; otp: string }) =>
    request("/api/auth/verify-reset-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resetPassword: (payload: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }) =>
    request("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const meApi = {
  getMe: (accessToken: string) =>
    request<{ success: boolean; data: User }>("/api/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};

// ✅ name instead of firstName + lastName
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  avatarUrl: string | null;
  phone: string | null;
  createdAt: string;
}