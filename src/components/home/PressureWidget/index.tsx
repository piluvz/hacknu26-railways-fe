import ProgressBar from "./ProgressBar";
import { useTheme } from "../../../context/ThemeContext";

const metrics = [
  { label: "Metric", value: 80, unit: "бар", status: "normal" },
  { label: "Metric", value: 20, unit: "бар", status: "critical" },
  { label: "Metric", value: 60, unit: "бар", status: "warning" },
  { label: "Metric", value: 80, unit: "бар", status: "normal" },
];

export default function PressureWidget() {
    const { c } = useTheme();

    return (
        <div
            className="p-[20px] rounded-[16px] h-[340px]"
            style={{ backgroundColor: c.widgetBg, border: `1px solid ${c.border}` }}
        >
            <div className="text-sm mb-[10px] uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
                Давление
            </div>

            {metrics.map((metric, index) =>
                <div key={index} className="mb-[24px]" style={{ color: c.text }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                        <span>{metric.label}</span>
                        <span style={{
                            color: metric.status === "normal"
                                ? "#49C86E"
                                : metric.status === "critical"
                                ? "#E23F3F"
                                : "#EABD52"
                        }}>
                            {metric.value} {metric.unit}
                        </span>
                    </div>

                    <ProgressBar value={metric.value} status={metric.status} />
                </div>
            )}
        </div>
    );
}
