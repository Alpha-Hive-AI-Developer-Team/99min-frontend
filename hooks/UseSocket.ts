import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/utils/socket";
import { useAuth } from "@/store/auth-context";

export function useSocket(): Socket | null {
  const { accessToken } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      return;
    }

    const s = getSocket(accessToken);

    const onConnect = () => setSocket(s);
    const onDisconnect = () => setSocket(null);
    const onError = (err: Error) => console.error("[socket] error:", err.message);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("connect_error", onError);

    // If already connected (singleton reuse), trigger via timeout to avoid sync setState
    if (s.connected) {
      setTimeout(() => setSocket(s), 0);
    }

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("connect_error", onError);
    };
  }, [accessToken]);

  return socket;
}