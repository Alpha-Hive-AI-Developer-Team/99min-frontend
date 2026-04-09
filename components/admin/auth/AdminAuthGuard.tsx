"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/store/admin-auth-context";
import { adminAuthApi } from "@/utils/api/admin.auth.api";
import { setAccessToken } from "@/utils/api/client";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { admin, setAdminAuth } = useAdminAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      // Already have admin in context (e.g. just logged in)
      if (admin) {
        setChecking(false);
        return;
      }

      // Try to refresh the access token using the httpOnly cookie
      try {
        const res = await adminAuthApi.refresh();
        setAccessToken(res.data.accessToken);

        // Fetch admin profile with the new token
        const meRes = await adminAuthApi.getMe();
        setAdminAuth(meRes.data.admin, res.data.accessToken);
        setChecking(false);
      } catch {
        // No valid session — redirect to login
        router.replace("/admin/auth/login");
      }
    };

    verify();
  }, []);

  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}