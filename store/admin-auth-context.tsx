"use client";

import React, { createContext, useContext, useState } from "react";
import { AdminUser } from "@/utils/api/admin.auth.api";

interface AdminAuthContextType {
  admin: AdminUser | null;
  accessToken: string | null;
  setAdminAuth: (admin: AdminUser, token: string) => void;
  clearAdminAuth: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setAdminAuth = (admin: AdminUser, token: string) => {
    setAdmin(admin);
    setAccessToken(token);
  };

  const clearAdminAuth = () => {
    setAdmin(null);
    setAccessToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, accessToken, setAdminAuth, clearAdminAuth }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}