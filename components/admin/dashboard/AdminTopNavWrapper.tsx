"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/store/admin-auth-context";
import { adminAuthApi } from "@/utils/api/admin.auth.api";
import { setAccessToken } from "@/utils/api/client";
import AdminTopNav from "@/components/admin/dashboard/AdminTopNav";

export default function AdminTopNavWrapper() {
  const router = useRouter();
  const { admin, clearAdminAuth } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await adminAuthApi.logout();
    } catch {
      // silent fail — still log out locally
    } finally {
      setAccessToken(null);
      clearAdminAuth();
      router.push("/admin/auth/login");
    }
  };

  return (
    <AdminTopNav
      userName={admin?.name}
      roleLabel="Admin"
      avatarSrc={admin?.avatar ?? "/assets/images/user.png"}
      onLogout={handleLogout}
    />
  );
}