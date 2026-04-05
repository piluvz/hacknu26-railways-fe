import ReactECharts from "echarts-for-react";
import { useTheme } from "../../../context/ThemeContext";
import { useData } from "../../../context/DataContext";

export default function PieChart() {
  const { c } = useTheme();
  const { data } = useData();
  const value = data.health_score;
  const total = 100;

  const color =
    data.health_category === "Норма"
      ? "#49C86E"
      :  data.health_category === "Критично"
        ? "#E23F3F"
        : "#EABD52";

  const bgColor =
    data.health_category === "Норма"
      ? "#49C86E1A"
      : data.health_category === "Критично"
        ? "#E23F3F1A"
        : "#EABD521A";

  const option = {
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: value, name: "Completed" },
          { value: total - value, name: "Remaining" },
        ],
        color: [color, "transparent"],
      },
    ],
    graphic: {
      type: "group",
      left: "center",
      top: "center",
      children: [
        {
          type: "circle",
          shape: { r: 52.5 },
          style: { fill: bgColor },
          left: "center",
          top: "center",
        },
        {
          type: "text",
          style: {
            text: `${Math.round(value)}`,
            fontSize: 48,
            fontWeight: 600,
            fill: c.text,
          },
          left: "center",
          top: "center",
        },
        {
          type: "text",
          style: {
            text: `/${total}`,
            fontSize: 14,
            fontWeight: 400,
            fill: c.textSub,
          },
          left: 0,
          top: 20,
        },
      ],
    },
  };

  return (
    <div style={{ height: 150, width: "100%" }}>
      <ReactECharts option={option} style={{ height: 150 }} />
    </div>
  );
}
