import { useState, useEffect, useCallback } from "react";
import {
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
  PaymentMethod,
  AddPaymentMethodPayload,
} from "@/utils/api/settings.api";

export function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMethods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPaymentMethods();
      setMethods(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMethods();
  }, [fetchMethods]);

  const handleAdd = useCallback(
    async (payload: AddPaymentMethodPayload): Promise<boolean> => {
      try {
        setSaving(true);
        setError(null);
        const res = await addPaymentMethod(payload);
        setMethods((prev) => {
          const updated = payload.isDefault
            ? prev.map((m) => ({ ...m, isDefault: false }))
            : prev;
          return [...updated, res.data];
        });
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add payment method");
        return false;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const handleSetDefault = useCallback(async (methodId: string): Promise<void> => {
    // Optimistic
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m._id === methodId }))
    );
    try {
      await setDefaultPaymentMethod(methodId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set default");
      fetchMethods(); // revert
    }
  }, [fetchMethods]);

  const handleDelete = useCallback(async (methodId: string): Promise<void> => {
    const previous = methods;
    // Optimistic remove
    setMethods((prev) => {
      const updated = prev.filter((m) => m._id !== methodId);
      // If we removed the default, make first one default
      const wasDefault = previous.find((m) => m._id === methodId)?.isDefault;
      if (wasDefault && updated.length > 0) updated[0].isDefault = true;
      return updated;
    });
    try {
      await deletePaymentMethod(methodId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete payment method");
      setMethods(previous); // revert
    }
  }, [methods]);

  return { methods, loading, saving, error, handleAdd, handleSetDefault, handleDelete };
}