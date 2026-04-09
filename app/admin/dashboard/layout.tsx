import type { ReactNode } from "react";
import AdminSidebar from "../../../components/admin/dashboard/AdminSidebar";
import AdminTopNavWrapper from "../../../components/admin/dashboard/AdminTopNavWrapper";
import AdminAuthGuard from "../../../components/admin/auth/AdminAuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-white font-sans text-textBlack">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopNavWrapper />

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}