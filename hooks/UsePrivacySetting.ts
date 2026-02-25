import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrivacySettings,
  updatePrivacySettings,
  PrivacySettings,
  UpdatePrivacyPayload,
} from "@/utils/api/settings.api";

export const privacySettingsQueryKey = ["privacySettings"];

export function usePrivacySettings() {
  const queryClient = useQueryClient();

  const {
    data: settings = null,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: privacySettingsQueryKey,
    queryFn: () => getPrivacySettings().then((res) => res.data),
    retry: false,
  });

  const { mutate, error: mutationError } = useMutation({
    mutationFn: (payload: UpdatePrivacyPayload) =>
      updatePrivacySettings(payload).then((res) => res.data),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: privacySettingsQueryKey });
      const previous = queryClient.getQueryData<PrivacySettings>(privacySettingsQueryKey);
      queryClient.setQueryData<PrivacySettings>(
        privacySettingsQueryKey,
        (old) => (old ? { ...old, ...payload } : old)
      );
      return { previous };
    },

    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(privacySettingsQueryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: privacySettingsQueryKey });
    },
  });

  const handleUpdate = useCallback(
    (payload: UpdatePrivacyPayload) => {
      mutate(payload);
    },
    [mutate]
  );

  const error =
    (queryError instanceof Error
      ? queryError.message
      : queryError
      ? "Failed to load privacy settings"
      : null) ??
    (mutationError instanceof Error
      ? mutationError.message
      : mutationError
      ? "Failed to update privacy settings"
      : null);

  return {
    settings,
    loading,
    saving: false,
    error,
    handleUpdate,
  };
}