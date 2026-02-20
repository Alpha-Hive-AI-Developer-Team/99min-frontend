import { useState, useEffect, useCallback } from "react";
import {
  getBlockedUsers,
  unblockUser,
  blockUser,
  BlockedUser,
} from "@/services/settings.service";

export function useBlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockedUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBlockedUsers();
      setBlockedUsers(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blocked users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

  const handleUnblock = useCallback(
    async (userId: string) => {
      // Optimistic remove
      setBlockedUsers((prev) => prev.filter((u) => u.blockedId._id !== userId));
      try {
        await unblockUser(userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to unblock");
        fetchBlockedUsers(); // restore state on failure
      }
    },
    [fetchBlockedUsers]
  );

  const handleBlock = useCallback(
    async (userId: string) => {
      try {
        await blockUser(userId);
        fetchBlockedUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to block user");
      }
    },
    [fetchBlockedUsers]
  );

  return { blockedUsers, loading, error, handleUnblock, handleBlock };
}