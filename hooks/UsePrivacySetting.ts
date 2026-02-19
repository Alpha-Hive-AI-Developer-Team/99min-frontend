import { useState, useEffect, useCallback } from "react";
import {
  getPrivacySettings,
  updatePrivacySettings,
  PrivacySettings,
  UpdatePrivacyPayload,
} from "@/services/settings.service";

export function usePrivacySettings() {
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPrivacySettings();
      setSettings(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load privacy settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleUpdate = useCallback(
    async (payload: UpdatePrivacyPayload): Promise<boolean> => {
      // Optimistic update
      setSettings((prev) => (prev ? { ...prev, ...payload } : prev));
      try {
        setSaving(true);
        setError(null);
        const res = await updatePrivacySettings(payload);
        setSettings(res.data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update privacy settings");
        fetchSettings(); // revert
        return false;
      } finally {
        setSaving(false);
      }
    },
    [fetchSettings]
  );

  return { settings, loading, saving, error, handleUpdate };
}