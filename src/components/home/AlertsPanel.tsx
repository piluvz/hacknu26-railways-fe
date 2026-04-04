import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

type AlertSeverity = "critical" | "warning";

interface AlertItem {
  id: string;
  severity: AlertSeverity;
  time: string;
  title: string;
  description: string;
  action: string;
}

// TODO: Replace hardcoded values with data from backend
const ALERTS_FROM_BACKEND: AlertItem[] = [
  {
    id: "1",
    severity: "critical",
    time: "14:20",
    title: "Уровень топлива",
    description: "< 15% от ёмкости",
    action: "Сообщить диспетчеру",
  },
  {
    id: "2",
    severity: "warning",
    time: "14:20",
    title: "Давление воздуха",
    description: "6.1 бар → норма 7+",
    action: "Наблюдение",
  },
];

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  {
    badge: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    bg: string;
    actionColor: string;
  }
> = {
  critical: {
    badge: "КРИТИЧНО",
    badgeBg: "#E23F3F",
    badgeText: "#FFFFFF",
    border: "#E23F3F",
    bg: "rgba(226, 63, 63, 0.2)",
    actionColor: "#E23F3F",
  },
  warning: {
    badge: "ВНИМАНИЕ",
    badgeBg: "#EABD52",
    badgeText: "#FFFFFF",
    border: "#EABD52",
    bg: "rgba(234, 189, 82, 0.2)",
    actionColor: "#EABD52",
  },
};

const PULSE_STYLE = `
    @keyframes critical-pulse {
        0%, 100% {
            box-shadow: 0 0 6px 2px rgba(226, 63, 63, 0.6),
                        0 0 0px 0px rgba(226, 63, 63, 0.3);
            border-color: rgba(226, 63, 63, 1);
        }
        50% {
            box-shadow: 0 0 18px 6px rgba(226, 63, 63, 0.9),
                        0 0 40px 12px rgba(226, 63, 63, 0.3);
            border-color: rgba(255, 100, 100, 1);
        }
    }
`;

function AlertCard({ alert, index }: { alert: AlertItem; index: number }) {
  const { c } = useTheme();
  const [visible, setVisible] = useState(false);
  const cfg = SEVERITY_CONFIG[alert.severity];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120 + 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl px-3 py-3"
      style={{
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        animation:
          visible && alert.severity === "critical"
            ? "critical-pulse 1.6s ease-in-out infinite"
            : "none",
      }}
    >
      <div className="flex justify-between">
        <span
          className="text-[13px] font-semibold uppercase px-2 py-0.5 rounded-md tracking-wide"
          style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeText }}
        >
          {cfg.badge}
        </span>
        <span className="text-xs font-light" style={{ color: c.text }}>{alert.time}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-semibold" style={{ color: c.text }}>
          {alert.title}
        </span>
        <span className="text-[13px]" style={{ color: c.alertDesc }}>{alert.description}</span>
      </div>

      <span className="text-[13px]" style={{ color: cfg.actionColor }}>
        → {alert.action}
      </span>
    </div>
  );
}

export default function AlertsPanel() {
  const { c } = useTheme();
  const alerts = ALERTS_FROM_BACKEND;

  return (
    <div
      className="flex flex-col w-[250px] px-5 py-5 border-l h-full"
      style={{ backgroundColor: c.widgetBg, borderColor: c.border }}
    >
      <style>{PULSE_STYLE}</style>

      <div className="flex items-center justify-between mb-5">
        <span className="text-sm uppercase tracking-[0.08em]" style={{ color: c.text }}>
          Алерты
        </span>
        <span
          className="flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: "#E23F3F" }}
        >
          {alerts.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert, i) => (
          <AlertCard key={alert.id} alert={alert} index={i} />
        ))}
      </div>
    </div>
  );
}
