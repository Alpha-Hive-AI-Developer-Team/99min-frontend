import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
  PaymentMethod,
  AddPaymentMethodPayload,
} from "@/utils/api/settings.api";

export const paymentMethodsQueryKey = ["paymentMethods"];

export function usePaymentMethods() {
  const queryClient = useQueryClient();

  const {
    data: methods = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: paymentMethodsQueryKey,
    queryFn: () => getPaymentMethods().then((res) => res.data),
    retry: false,
  });

  // ── Add ───────────────────────────────────────────────────────────────────
  const { mutateAsync: addMutate, error: addError } = useMutation({
    mutationFn: (payload: AddPaymentMethodPayload) =>
      addPaymentMethod(payload).then((res) => res.data),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: paymentMethodsQueryKey });
      const previous = queryClient.getQueryData<PaymentMethod[]>(paymentMethodsQueryKey);

      queryClient.setQueryData<PaymentMethod[]>(paymentMethodsQueryKey, (old = []) => {
        const updated = payload.isDefault
          ? old.map((m) => ({ ...m, isDefault: false }))
          : old;
        // Temporary optimistic entry — server will replace on settle
        return [
          ...updated,
          {
            _id: `optimistic_${Date.now()}`,
            userId: "",
            stripePaymentMethodId: payload.stripePaymentMethodId,
            type: payload.type,
            brand: payload.brand,
            last4: payload.last4,
            expMonth: payload.expMonth,
            expYear: payload.expYear,
            isDefault: payload.isDefault ?? false,
            createdAt: new Date().toISOString(),
          },
        ];
      });

      return { previous };
    },

    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(paymentMethodsQueryKey, context.previous);
      }
    },

    // Always refetch so optimistic _id is replaced with real server _id
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: paymentMethodsQueryKey });
    },
  });

  const handleAdd = useCallback(
    async (payload: AddPaymentMethodPayload): Promise<boolean> => {
      try {
        await addMutate(payload);
        return true;
      } catch {
        return false;
      }
    },
    [addMutate]
  );

  // ── Set Default ───────────────────────────────────────────────────────────
  const { mutate: setDefaultMutate } = useMutation({
    mutationFn: (methodId: string) => setDefaultPaymentMethod(methodId),

    onMutate: async (methodId) => {
      await queryClient.cancelQueries({ queryKey: paymentMethodsQueryKey });
      const previous = queryClient.getQueryData<PaymentMethod[]>(paymentMethodsQueryKey);

      queryClient.setQueryData<PaymentMethod[]>(paymentMethodsQueryKey, (old = []) =>
        old.map((m) => ({ ...m, isDefault: m._id === methodId }))
      );

      return { previous };
    },

    onError: (_err, _methodId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(paymentMethodsQueryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: paymentMethodsQueryKey });
    },
  });

  const handleSetDefault = useCallback(
    (methodId: string) => setDefaultMutate(methodId),
    [setDefaultMutate]
  );

  // ── Delete ────────────────────────────────────────────────────────────────
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (methodId: string) => deletePaymentMethod(methodId),

    onMutate: async (methodId) => {
      await queryClient.cancelQueries({ queryKey: paymentMethodsQueryKey });
      const previous = queryClient.getQueryData<PaymentMethod[]>(paymentMethodsQueryKey);

      queryClient.setQueryData<PaymentMethod[]>(paymentMethodsQueryKey, (old = []) => {
        const wasDefault = old.find((m) => m._id === methodId)?.isDefault ?? false;
        const filtered = old.filter((m) => m._id !== methodId);
        // Promote first remaining card to default if we removed the default
        if (wasDefault && filtered.length > 0) {
          filtered[0] = { ...filtered[0], isDefault: true };
        }
        return filtered;
      });

      return { previous };
    },

    onError: (_err, _methodId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(paymentMethodsQueryKey, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: paymentMethodsQueryKey });
    },
  });

  const handleDelete = useCallback(
    (methodId: string) => deleteMutate(methodId),
    [deleteMutate]
  );

  // ── Error aggregation ─────────────────────────────────────────────────────
  const error =
    (queryError instanceof Error ? queryError.message : queryError ? "Failed to load payment methods" : null) ??
    (addError instanceof Error ? addError.message : addError ? "Failed to add payment method" : null);

  return {
    methods,
    loading,
    saving: false,
    error,
    handleAdd,
    handleSetDefault,
    handleDelete,
  };
}