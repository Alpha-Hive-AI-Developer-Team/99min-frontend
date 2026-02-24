import { useState, useEffect, useCallback } from "react";
import {
  getNotificationSettings,
  updateNotificationSettings,
  NotificationSettings,
  UpdateNotificationSettingsPayload,
} from "@/utils/api/settings.api";

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getNotificationSettings();
      setSettings(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notification settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleToggle = useCallback(
    async (key: keyof NotificationSettings, value: boolean) => {
      // Optimistic update
      setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
      try {
        setSaving(true);
        const payload: UpdateNotificationSettingsPayload = { [key]: value };
        const res = await updateNotificationSettings(payload);
        setSettings(res.data);
      } catch (err) {
        // Revert on failure
        setSettings((prev) => (prev ? { ...prev, [key]: !value } : prev));
        setError(err instanceof Error ? err.message : "Failed to update settings");
      } finally {
        setSaving(false);
      }
    },
    []
  );

  return { settings, loading, saving, error, handleToggle };
}