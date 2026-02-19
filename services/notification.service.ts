import { request } from "@/utils/api/client";

export interface ApiNotification {
  _id: string;
  userId: string;
  type:
    | "new_response"
    | "response_accepted"
    | "task_expiring"
    | "task_expired"
    | "task_cancelled"
    | "new_message"
    | "system"
    | "marketing";
  title: string;
  body: string;
  data?: {
    taskId?: string;
    responseId?: string;
    url?: string;
  };
  read: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

export interface GetNotificationsResponse {
  success: boolean;
  data: ApiNotification[];
  unreadCount: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
  data: ApiNotification;
}

export interface MarkAllAsReadResponse {
  success: boolean;
  message: string;
  data: { updated: number };
}

export async function getNotifications(
  params: GetNotificationsParams = {}
): Promise<GetNotificationsResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.unreadOnly) searchParams.set("unreadOnly", "true");

  const query = searchParams.toString();
  return request<GetNotificationsResponse>(
    `/api/notifications${query ? `?${query}` : ""}`
  );
}

export async function markAsRead(
  notificationId: string
): Promise<MarkAsReadResponse> {
  return request<MarkAsReadResponse>(
    `/api/notifications/${notificationId}/read`,
    { method: "PATCH" }
  );
}

export async function markAllAsRead(): Promise<MarkAllAsReadResponse> {
  return request<MarkAllAsReadResponse>(`/api/notifications/read-all`, {
    method: "PATCH",
  });
}