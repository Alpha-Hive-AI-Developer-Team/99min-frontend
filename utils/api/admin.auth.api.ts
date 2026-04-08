import { request } from "./client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface AdminAuthResponse {
  success: boolean;
  message?: string;
  data: {
    accessToken: string;
    admin: AdminUser;
  };
}

export const adminAuthApi = {
  login: (payload: { email: string; password: string }) =>
    request<AdminAuthResponse>("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () =>
    request<{ success: boolean; message: string }>("/api/admin/auth/logout", {
      method: "POST",
    }),

  refresh: () =>
    request<{ success: boolean; data: { accessToken: string } }>(
      "/api/admin/auth/refresh",
      { method: "POST" }
    ),

  forgotPassword: (payload: { email: string }) =>
    request<{ success: boolean; message: string; data?: { otp?: string } }>(
      "/api/admin/auth/forgot-password",
      { method: "POST", body: JSON.stringify(payload) }
    ),

  verifyResetOtp: (payload: { email: string; otp: string }) =>
    request<{ success: boolean; message: string; data: { resetToken: string } }>(
      "/api/admin/auth/verify-reset-otp",
      { method: "POST", body: JSON.stringify(payload) }
    ),

  resetPassword: (payload: { resetToken: string; newPassword: string }) =>
    request<{ success: boolean; message: string }>("/api/admin/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMe: () =>
    request<{ success: boolean; data: { admin: AdminUser } }>(
      "/api/admin/me",
      { method: "GET" }
    ),
};