import { useState, useEffect, useCallback } from "react";
import {
  getProfile,
  updateProfile,
  Profile,
  UpdateProfilePayload,
} from "@/services/settings.service";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
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

  return { profile, loading, saving, error, handleUpdateProfile, refetch: fetchProfile };
}