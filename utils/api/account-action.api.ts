import { getAccessToken } from "@/utils/api/client";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function downloadMyData(): Promise<void> {
  const token = getAccessToken();

  const response = await fetch(`${BACKEND_URL}/api/profile/data-export`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.message ?? `Failed to download data (${response.status})`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `my-data-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function deleteMyAccount(): Promise<{ success: boolean; message: string }> {
  const { request } = await import("@/utils/api/client");
  return request("/api/profile/account", { method: "DELETE" });
}