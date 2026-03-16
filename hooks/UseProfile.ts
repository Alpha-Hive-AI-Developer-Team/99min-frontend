import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  type Profile,
  type UpdateProfilePayload,
} from "@/utils/api/settings.api";
import { getAccessToken, silentRefresh } from "@/utils/api/client";

export const profileQueryKey = ["profile"];

async function fetchProfileWithAuth(): Promise<Profile> {
  if (!getAccessToken()) {
    const refreshed = await silentRefresh();
    if (!refreshed) {
      throw new Error("Session expired. Please log in again.");
    }
  }
  const res = await getProfile();
  return res.data;
}

export function useProfile() {
  const queryClient = useQueryClient();

  const {
    data: profile = null,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfileWithAuth,
    retry: false,
  });

  const error = queryError instanceof Error ? queryError.message : queryError ? "Failed to load profile" : null;

  const { mutateAsync, isPending: saving } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      updateProfile(payload).then((res) => res.data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(profileQueryKey, updatedProfile);
    },
  });

  const handleUpdateProfile = useCallback(
    async (payload: UpdateProfilePayload): Promise<boolean> => {
      try {
        await mutateAsync(payload);
        return true;
      } catch {
        return false;
      }
    },
    [mutateAsync]
  );

  return {
    profile,
    loading,
    saving,
    error,
    handleUpdateProfile,
    refetch: () => queryClient.invalidateQueries({ queryKey: profileQueryKey }),
  };
}