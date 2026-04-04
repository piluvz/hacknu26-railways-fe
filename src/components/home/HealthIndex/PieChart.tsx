import ReactECharts from "echarts-for-react";
import { useTheme } from "../../../context/ThemeContext";

export default function PieChart() {
  const { c } = useTheme();
  const value = 89;
  const total = 100;

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
        color: ["#49C86E", "transparent"],
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
          style: { fill: "#44BD681A" },
          left: "center",
          top: "center",
        },
        {
          type: "text",
          style: {
            text: `${value}`,
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
