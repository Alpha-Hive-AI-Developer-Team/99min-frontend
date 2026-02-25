import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationSettings,
  updateNotificationSettings,
  NotificationSettings,
  UpdateNotificationSettingsPayload,
} from "@/utils/api/settings.api";

export const notificationSettingsQueryKey = ["notificationSettings"];

export function useNotificationSettings() {
  const queryClient = useQueryClient();

  const {
    data: settings = null,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: notificationSettingsQueryKey,
    queryFn: () => getNotificationSettings().then((res) => res.data),
    retry: false,
  });

  const error = queryError instanceof Error
    ? queryError.message
    : queryError
    ? "Failed to load notification settings"
    : null;

  const { mutate, error: mutationError } = useMutation({
    mutationFn: (payload: UpdateNotificationSettingsPayload) =>
      updateNotificationSettings(payload).then((res) => res.data),

    // Optimistic update
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: notificationSettingsQueryKey });
      const previous = queryClient.getQueryData<NotificationSettings>(notificationSettingsQueryKey);
      queryClient.setQueryData<NotificationSettings>(
        notificationSettingsQueryKey,
        (old) => old ? { ...old, ...payload } : old
      );
      return { previous };
    },

    // Roll back on failure
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationSettingsQueryKey, context.previous);
      }
    },

    // Always sync with server truth after settle
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationSettingsQueryKey });
    },
  });

  const handleToggle = useCallback(
    (key: keyof NotificationSettings, value: boolean) => {
      mutate({ [key]: value });
    },
    [mutate]
  );

  const toggleError = mutationError instanceof Error
    ? mutationError.message
    : mutationError
    ? "Failed to update settings"
    : null;

  return {
    settings,
    loading,
    saving: false, // optimistic — no spinner needed
    error: error ?? toggleError,
    handleToggle,
  };
}