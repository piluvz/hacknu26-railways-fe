import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

type NodeStatus = "ok" | "warning" | "error";

interface NodeData {
  id: string;
  label: string;
  status: NodeStatus;
}

// TODO: Replace hardcoded values with data from backend
const NODES_FROM_BACKEND: NodeData[] = [
  { id: "engine", label: "Двигатель", status: "warning" },
  { id: "brakes", label: "Тормоза", status: "error" },
  { id: "fuel", label: "Топливо", status: "warning" },
  { id: "electrical", label: "Электрика", status: "ok" },
  { id: "wheelsets", label: "Колес. пары", status: "ok" },
  { id: "compressor", label: "Компрессор", status: "error" },
];

const STATUS_CONFIG: Record<
  NodeStatus,
  { color: string; bg: string; border: string; label: string }
> = {
  ok: { color: "#49C86E", bg: "#49C86E1A", border: "#49C86E", label: "Норма" },
  warning: {
    color: "#EABD52",
    bg: "#EABD521A",
    border: "#EABD52",
    label: "Внимание",
  },
  error: {
    color: "#E23F3F",
    bg: "#E23F3F1A",
    border: "#E23F3F",
    label: "Критично",
  },
};

const ALERT_NODES = NODES_FROM_BACKEND.filter((n) => n.status === "error").map(
  (n) => n.label,
);

function NodeCard({ node, index }: { node: NodeData; index: number }) {
  const { c } = useTheme();
  const [visible, setVisible] = useState(false);
  const cfg = STATUS_CONFIG[node.status];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="flex flex-col justify-between rounded-lg px-2 py-2 max-w-24 h-20"
      style={{
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <span className="text-xs font-regular break-words" style={{ color: c.text }}>
        {node.label}
      </span>
      <span className="text-xs font-semibold" style={{ color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}

export default function StatesWidget() {
  const { c } = useTheme();
  const nodes = NODES_FROM_BACKEND;

  return (
    <div
      className="flex flex-col px-5 pt-4 pb-5 rounded-xl h-full border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <span className="text-sm uppercase tracking-[0.08em] mb-3" style={{ color: c.textMuted }}>
        Состояние узлов
      </span>

      {ALERT_NODES.length > 0 && (
        <span className="text-sm font-regular text-[#E23F3F] mb-4 leading-snug">
          Проверьте данные {ALERT_NODES.join(" и ")}
        </span>
      )}

      <div className="grid grid-cols-3 gap-x-3 gap-y-5">
        {nodes.map((node, i) => (
          <NodeCard key={node.id} node={node} index={i} />
        ))}
      </div>
    </div>
  );
}
