import { useState, useEffect, useCallback } from "react";
import {
  getLocationSettings,
  updateLocationSettings,
  LocationSettings,
  UpdateLocationPayload,
} from "@/utils/api/settings.api";

export function useLocationSettings() {
  const [settings, setSettings] = useState<LocationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getLocationSettings();
      setSettings(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load location settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleUpdate = useCallback(async (payload: UpdateLocationPayload): Promise<boolean> => {
    // Optimistic update for booleans/numbers
    setSettings((prev) => (prev ? { ...prev, ...payload } : prev));
    try {
      setSaving(true);
      setError(null);
      const res = await updateLocationSettings(payload);
      setSettings(res.data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update location settings");
      // Revert
      fetchSettings();
      return false;
    } finally {
      setSaving(false);
    }
  }, [fetchSettings]);

  return { settings, loading, saving, error, handleUpdate };
}