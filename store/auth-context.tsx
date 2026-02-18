// src/store/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User, authApi } from "@/utils/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

interface AuthContextType extends AuthState {
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
  });

  const setAuth = useCallback((user: User, accessToken: string) => {
    setAuthState({ user, accessToken });
  }, []);

  const clearAuth = useCallback(() => {
    setAuthState({ user: null, accessToken: null });
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // clear local state even if backend call fails
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, clearAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
