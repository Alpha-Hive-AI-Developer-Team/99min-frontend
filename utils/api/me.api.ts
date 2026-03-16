import { request } from "./client";
import type { User } from "./auth.api";

// ─── Me API ───────────────────────────────────────────────────────────────────

export const meApi = {
  // GET /api/me — get current user profile
  getMe: () =>
    request<{ success: boolean; data: User }>("/api/me"),

  // PATCH /api/me — update profile (name, phone, etc.)
  updateMe: (payload: Partial<Pick<User, "name" | "phone">>) =>
    request<{ success: boolean; data: User }>("/api/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  // PATCH /api/me/avatar — upload avatar (multipart, handle separately)
  updateAvatar: (formData: FormData) =>
    request<{ success: boolean; data: { avatarUrl: string } }>("/api/me/avatar", {
      method: "PATCH",
      body: formData,
      // Note: Do NOT set Content-Type here — browser sets it with boundary for FormData
      headers: {},
    }),

  // DELETE /api/me — delete own account
  deleteMe: () =>
    request<{ success: boolean; message: string }>("/api/me", {
      method: "DELETE",
    }),
};