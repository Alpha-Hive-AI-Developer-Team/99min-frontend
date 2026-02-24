import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getConversations,
  GetConversationsResponse,
  ApiMessage,
} from "@/utils/api/message.api";
import { useSocket } from "./UseSocket";

export function useConversations() {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const { data, isLoading, isError, error, refetch } =
    useQuery<GetConversationsResponse>({
      queryKey: ["conversations"],
      queryFn: getConversations,
      staleTime: 1000 * 30,
    });

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: ApiMessage) => {
      queryClient.setQueryData<GetConversationsResponse>(
        ["conversations"],
        (old) => {
          if (!old) return old;
          const updated = old.data.map((conv) => {
            if (conv._id !== message.conversationId) return conv;
            return {
              ...conv,
              lastMessage: {
                body: message.body,
                createdAt: message.createdAt,
                senderId: message.senderId,
              },
              unreadCount: conv.unreadCount + 1,
              updatedAt: message.createdAt,
            };
          });
          updated.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          return { ...old, data: updated };
        }
      );
    };

    const handleConversationRead = (conversationId: string) => {
      queryClient.setQueryData<GetConversationsResponse>(
        ["conversations"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((conv) =>
              conv._id === conversationId
                ? { ...conv, unreadCount: 0 }
                : conv
            ),
          };
        }
      );
    };

    const handleUserOnline = (userId: string) => {
      queryClient.setQueryData<GetConversationsResponse>(
        ["conversations"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((conv) =>
              conv.otherParticipant._id === userId
                ? { ...conv, isOnline: true }
                : conv
            ),
          };
        }
      );
    };

    const handleUserOffline = (userId: string) => {
      queryClient.setQueryData<GetConversationsResponse>(
        ["conversations"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((conv) =>
              conv.otherParticipant._id === userId
                ? { ...conv, isOnline: false }
                : conv
            ),
          };
        }
      );
    };

    socket.on("message:new", handleNewMessage);
    socket.on("conversation:read", handleConversationRead);
    socket.on("user:online", handleUserOnline);
    socket.on("user:offline", handleUserOffline);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("conversation:read", handleConversationRead);
      socket.off("user:online", handleUserOnline);
      socket.off("user:offline", handleUserOffline);
    };
  }, [socket, queryClient]);

  return {
    conversations: data?.data ?? [],
    totalUnread:
      data?.data.reduce((sum, conv) => sum + conv.unreadCount, 0) ?? 0,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refresh: refetch,
  };
}