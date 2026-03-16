import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLocationSettings,
  updateLocationSettings,
  LocationSettings,
  UpdateLocationPayload,
} from "@/utils/api/settings.api";

export const locationSettingsQueryKey = ["locationSettings"];

export function useLocationSettings() {
  const queryClient = useQueryClient();

  const {
    data: settings = null,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: locationSettingsQueryKey,
    queryFn: () => getLocationSettings().then((res) => res.data),
    retry: false,
  });

  const { mutate, error: mutationError } = useMutation({
    mutationFn: (payload: UpdateLocationPayload) =>
      updateLocationSettings(payload).then((res) => res.data),

    // Optimistic update
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: locationSettingsQueryKey });
      const previous = queryClient.getQueryData<LocationSettings>(locationSettingsQueryKey);
      queryClient.setQueryData<LocationSettings>(
        locationSettingsQueryKey,
        (old) => (old ? { ...old, ...payload } : old)
      );
      return { previous };
    },

    // Revert on failure
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(locationSettingsQueryKey, context.previous);
      }
    },

    // Sync with server after settle
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: locationSettingsQueryKey });
    },
  });

  const handleUpdate = useCallback(
    (payload: UpdateLocationPayload) => {
      mutate(payload);
    },
    [mutate]
  );

  const error =
    (queryError instanceof Error ? queryError.message : queryError ? "Failed to load location settings" : null) ??
    (mutationError instanceof Error ? mutationError.message : mutationError ? "Failed to update location settings" : null);

  return {
    settings,
    loading,
    saving: false,
    error,
    handleUpdate,
  };
}