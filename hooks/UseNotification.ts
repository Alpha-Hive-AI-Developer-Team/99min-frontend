// hooks/useNotifications.ts
import { useEffect } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  GetNotificationsResponse,
  ApiNotification,
} from "@/utils/api/notification.api";
import { useSocket } from "./UseSocket";

export function useNotifications(limit = 20) {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<GetNotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      getNotifications({ page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
  });

  // 🔌 Real-time: new notification arrives
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification: ApiNotification) => {
      // Prepend the new notification to the first page optimistically
      queryClient.setQueryData(
        ["notifications"],
        (old: { pages: GetNotificationsResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;

          const updatedPages = old.pages.map((page, index) => {
            if (index !== 0) return page;
            return {
              ...page,
              data: [notification, ...page.data],
              unreadCount: page.unreadCount + 1,
            };
          });

          return { ...old, pages: updatedPages };
        }
      );
    };

    // 🔌 Real-time: a notification was marked read elsewhere (e.g. another tab)
    const handleNotificationRead = (notificationId: string) => {
      queryClient.setQueryData(
        ["notifications"],
        (old: { pages: GetNotificationsResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;

          let decremented = false;
          const updatedPages = old.pages.map((page) => ({
            ...page,
            unreadCount:
              !decremented && page.data.some((n) => n._id === notificationId && !n.read)
                ? (decremented = true, page.unreadCount - 1)
                : page.unreadCount,
            data: page.data.map((n) =>
              n._id === notificationId ? { ...n, read: true, readAt: new Date().toISOString() } : n
            ),
          }));

          return { ...old, pages: updatedPages };
        }
      );
    };

    // 🔌 Real-time: all marked as read
    const handleAllRead = () => {
      queryClient.setQueryData(
        ["notifications"],
        (old: { pages: GetNotificationsResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;

          const updatedPages = old.pages.map((page) => ({
            ...page,
            unreadCount: 0,
            data: page.data.map((n) => ({
              ...n,
              read: true,
              readAt: n.readAt ?? new Date().toISOString(),
            })),
          }));

          return { ...old, pages: updatedPages };
        }
      );
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:read", handleNotificationRead);
    socket.on("notification:all_read", handleAllRead);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:read", handleNotificationRead);
      socket.off("notification:all_read", handleAllRead);
    };
  }, [socket, queryClient]);

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = data?.pages[0]?.unreadCount ?? 0;

  const markOneMutation = useMutation({
    mutationFn: markAsRead,
    // Optimistic update — socket event will also sync other tabs
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previous = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(
        ["notifications"],
        (old: { pages: GetNotificationsResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;

          let decremented = false;
          const updatedPages = old.pages.map((page) => ({
            ...page,
            unreadCount:
              !decremented && page.data.some((n) => n._id === notificationId && !n.read)
                ? (decremented = true, page.unreadCount - 1)
                : page.unreadCount,
            data: page.data.map((n) =>
              n._id === notificationId
                ? { ...n, read: true, readAt: new Date().toISOString() }
                : n
            ),
          }));

          return { ...old, pages: updatedPages };
        }
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      // Roll back on failure
      if (context?.previous) {
        queryClient.setQueryData(["notifications"], context.previous);
      }
    },
  });

  const markAllMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications,
    unreadCount,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    refresh: refetch,
    handleMarkAsRead: markOneMutation.mutate,
    handleMarkAllAsRead: markAllMutation.mutate,
  };
}