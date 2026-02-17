// src/components/auth/AuthGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { authApi } from "@/utils/api";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, accessToken, setAuth } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Already authenticated in memory — done
    if (user && accessToken) {
      setChecking(false);
      return;
    }

    // Try silent restore via httpOnly refresh-token cookie
    authApi
      .refresh()
      .then((res) => {
        setAuth(res.data.user, res.data.accessToken);
        setChecking(false);
      })
      .catch(() => {
        router.replace("/auth/login");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-textGray text-sm">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}