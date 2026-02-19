
import { request, getAccessToken } from "./client";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export interface CreateTaskPayload {
  title: string;
  description: string;
  category: string;
  budget: { min: number; max: number };
  location: { label: string; coordinates?: [number, number] };
  duration: "90_mins" | "24_hours";
  urgent?: boolean;
  tags?: string[];
  media?: string[];
}

export interface TaskListParams {
  category?: string;
  status?: "active" | "expired" | "cancelled";
  q?: string;
  location?: string;
  radius?: number;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc" | "expiring" | "popular";
  page?: number;
  limit?: number;
}

export const tasksApi = {
  list: (params?: TaskListParams) => {
    const qs = params
      ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
      : "";
    return request(`/api/tasks${qs}`);
  },

  getById: (taskId: string) =>
    request(`/api/tasks/${taskId}`),

  create: (payload: CreateTaskPayload) =>
    request("/api/tasks", { method: "POST", body: JSON.stringify(payload) }),

  update: (taskId: string, payload: Partial<CreateTaskPayload>) =>
    request(`/api/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(payload) }),

  delete: (taskId: string) =>
    request(`/api/tasks/${taskId}`, { method: "DELETE" }),

  respond: (taskId: string, payload: { message: string; offeredPrice?: number }) =>
    request(`/api/tasks/${taskId}/respond`, { method: "POST", body: JSON.stringify(payload) }),

  getResponses: (taskId: string) =>
    request(`/api/tasks/${taskId}/responses`),

  report: (taskId: string, payload: { reason: string; details?: string }) =>
    request(`/api/tasks/${taskId}/report`, { method: "POST", body: JSON.stringify(payload) }),

  share: (taskId: string) =>
    request(`/api/tasks/${taskId}/share`, { method: "POST" }),
   uploadMedia: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      credentials: "include",
      headers: {
        // Do NOT set Content-Type — browser sets multipart/form-data boundary automatically
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data.urls as string[];
  },
};
