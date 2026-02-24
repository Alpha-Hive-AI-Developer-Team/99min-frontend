import { useState } from "react";
import { useRouter } from "next/navigation";
import { getOrCreateConversation } from "@/utils/api/message.api";

export function useOpenChat() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openChat = async (otherUserId: string, taskId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getOrCreateConversation(otherUserId, taskId);
      // ✅ Match your actual Next.js route
      router.push(`/dashboard/messages?conversationId=${res.data._id}`);
    } catch (err) {
      setError("Failed to open chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { openChat, loading, error };
}