import ProgressBar from "./ProgressBar";
import PieChart from "./PieChart";
import { useTheme } from "../../../context/ThemeContext";
import { useData } from "../../../context/DataContext";

// const metrics = [
//   { label: "Metric", value: 80, status: "normal" },
//   { label: "Metric", value: 20, status: "critical" },
//   { label: "Metric", value: 60, status: "warning" },
//   { label: "Metric", value: 80, status: "normal" },
//   { label: "Metric", value: 65, status: "warning" },
// ];

export default function HealthIndex() {
  const { c } = useTheme();
  const { data } = useData();

  const labelColor =
    data.health_category === "норма"
      ? "#49C86E"
      :  data.health_category === "критично"
        ? "#E23F3F"
        : "#EABD52";

  const bgColor =
    data.health_category === "норма"
      ? "#49C86E1A"
      : data.health_category === "критично"
        ? "#E23F3F1A"
        : "#EABD521A";

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "26px 30px",
        backgroundColor: c.widgetBg,
        fontSize: 14,
        color: c.text,
        borderRight: `1px solid ${c.border}`,
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: 30,
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Индекс здоровья
      </div>

      <PieChart />

      <span
        style={{
          marginTop: 10,
          marginBottom: 45,
          padding: "6px 20px",
          borderRadius: 40,
          backgroundColor: bgColor,
          border: `1px solid ${labelColor}`,
          color: labelColor,
          textAlign: "center",
          textTransform: "capitalize"
        }}
      >
        { data.health_category }
      </span>

      {data.top_impacts.map((metric, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              width: "100%",
              fontWeight: 400,
              textTransform: "capitalize"
            }}
          >
            <span>{metric.metric}</span>
            <span>{metric.impact}%</span>
          </div>
          <ProgressBar value={metric.impact} status={metric.status} />
        </div>
      ))}

      <div
        style={{
          borderTop: `1px solid ${c.border}`,
          paddingTop: 24,
          fontSize: 14,
          fontWeight: 400,
          color: c.textMuted,
        }}
      >
        Формула индекса объясненная
      </div>
    </div>
  );
}
