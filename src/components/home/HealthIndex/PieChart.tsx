import ReactECharts from "echarts-for-react";

export default function PieChart() {
  const value = 89;
  const total = 100;

  const option = {
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"], // inner & outer radius → creates the hole
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
        // Background circle (optional)
        {
          type: "circle",
          shape: {
            r: 52.5,
          },
          style: {
            fill: "#44BD681A", // background color
          },
          left: "center",
          top: "center",
        },
        // Big number (89)
        {
          type: "text",
          style: {
            text: `${value}`,
            fontSize: 48,
            fontWeight: 600,
            fill: "#fff",
          },
          left: "center",
          top: "center",
        },
        // Smaller "/100"
        {
          type: "text",
          style: {
            text: `/${total}`,
            fontSize: 14,
            fontWeight: 400,
            fill: "#FFFFFF4D",
          },
          left: 0,
          top: 20,
        },
      ],
    },
  };

  return (
    <div
      style={{
        height: 150,
        width: "100%",
      }}
    >
      <ReactECharts option={option} style={{ height: 150 }} />
    </div>
  );
}
