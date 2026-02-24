import { useState, useEffect, useCallback } from "react";
import {
  getProfile,
  updateProfile,
  type Profile,
  type UpdateProfilePayload,
} from "@/utils/api/settings.api";
import { getAccessToken, silentRefresh } from "@/utils/api/client";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // FIX: accessToken is stored in-memory and starts as null on page load.
      // If it's missing, run a silent refresh first so the Authorization header
      // is present when the profile request fires. Without this, the backend
      // receives an unauthenticated request and mergeWithUser never runs.
      if (!getAccessToken()) {
        const refreshed = await silentRefresh();
        if (!refreshed) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }
      }

      const res = await getProfile();
      setProfile(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = useCallback(
    async (payload: UpdateProfilePayload): Promise<boolean> => {
      try {
        setSaving(true);
        setError(null);
        const res = await updateProfile(payload);
        setProfile(res.data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update profile");
        return false;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  return {
    profile,
    loading,
    saving,
    error,
    handleUpdateProfile,
    refetch: fetchProfile,
  };
}