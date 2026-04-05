import { useEffect, useRef } from "react";

export default function useWebSocket(trainId: string) {
  const wsRef = useRef(null);

  useEffect(() => {
    console.log("connecting...");
    const ws : any = new WebSocket(`ws://127.0.0.1:8000/api/websocket/ws?train_id=${trainId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log("Message:", data);
    };

    ws.onclose = () => {
      console.log("WS disconnected");
    };

    ws.onerror = (err: any) => {
      console.error("WS error:", err);
    };

    return () => {
      ws.close();
    };
  }, [trainId]);

  return wsRef;
}