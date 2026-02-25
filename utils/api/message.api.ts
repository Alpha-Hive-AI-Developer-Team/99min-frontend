import { request } from "@/utils/api/client";

// ============================================================
// TYPES
// ============================================================


export interface ApiMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderInitial: string;
  body: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiConversation {
  _id: string;
  otherParticipant: { _id: string; name: string; initial: string };
  lastMessage?: {
    body: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  isOnline: boolean;
  updatedAt: string;
   taskId?: string | null; 
}

export interface GetConversationsResponse {
  success: boolean;
  data: ApiConversation[];
}

export interface GetMessagesResponse {
  success: boolean;
  data: ApiMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface SendMessageResponse {
  success: boolean;
  data: ApiMessage;
}

export interface GetOrCreateConversationResponse {
  success: boolean;
  data: ApiConversation;
}

// ============================================================
// API FUNCTIONS
// ============================================================

export async function getConversations(): Promise<GetConversationsResponse> {
  return request<GetConversationsResponse>("/api/messages/conversations");
}

export async function getOrCreateConversation(
  otherUserId: string,
  taskId?: string
): Promise<GetOrCreateConversationResponse> {
  return request<GetOrCreateConversationResponse>("/api/messages/conversations", {
    method: "POST",
    body: JSON.stringify({ otherUserId, taskId }),
  });
}

export async function getMessages(
  conversationId: string,
  params: { page?: number; limit?: number } = {}
): Promise<GetMessagesResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  const query = searchParams.toString();
  return request<GetMessagesResponse>(
    `/api/messages/conversations/${conversationId}/messages${query ? `?${query}` : ""}`
  );
}

export async function sendMessage(
  conversationId: string,
  body: string
): Promise<SendMessageResponse> {
  return request<SendMessageResponse>(
    `/api/messages/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ body }),
    }
  );
}

export async function markConversationRead(
  conversationId: string
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(
    `/api/messages/conversations/${conversationId}/read`,
    { method: "PATCH" }
  );
}
export async function deleteConversation(conversationId: string): Promise<{ success: boolean }> {
  return request(`/api/messages/conversations/${conversationId}`, { method: "DELETE" });
}