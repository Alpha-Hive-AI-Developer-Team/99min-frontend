/**
 * useAuthFetch.ts
 *
 * Shared utility for hooks that need to fetch data after auth is ready.
 * Waits for a valid access token (running silent refresh if needed) before
 * executing the fetch, preventing the race condition where in-memory
 * accessToken is null on first page load.
 */
import { useCallback } from "react";
import { getAccessToken, silentRefresh } from "@/utils/api/client";

/**
 * Returns an `authFetch` wrapper you call instead of your service function directly.
 * It ensures a valid token exists before the request fires.
 *
 * Usage:
 *   const { authFetch } = useAuthFetch();
 *   const data = await authFetch(() => getProfile());
 */
export function useAuthFetch() {
  const authFetch = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    if (!getAccessToken()) {
      const refreshed = await silentRefresh();
      if (!refreshed) {
        throw new Error("Session expired. Please log in again.");
      }
    }
    return fn();
  }, []);

  return { authFetch };
}