import { useEffect, useRef } from "react";

export default function useWebSocket(trainId) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${trainId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message:", data);
    };

    ws.onclose = () => {
      console.log("WS disconnected");
    };

    ws.onerror = (err) => {
      console.error("WS error:", err);
    };

    return () => {
      ws.close();
    };
  }, [trainId]);

  return wsRef;
}