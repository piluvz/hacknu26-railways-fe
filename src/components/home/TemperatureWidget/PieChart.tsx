import ReactECharts from "echarts-for-react";

export default function PieChart({
  value,
  unit,
  status,
}: {
  value: number;
  unit: string;
  status: "норма" | "предупреждение" | "критично";
}) {
  const total = 100;
  const valueRounded = Math.round(value);
  const color =
    status === "норма"
      ? "#49C86E"
      : status === "критично"
        ? "#E23F3F"
        : "#EABD52";
  const bgColor =
    status === "норма"
      ? "#49C86E1A"
      : status === "критично"
        ? "#E23F3F1A"
        : "#EABD521A";

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
        color: [color, "transparent"],
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
            r: 31.5,
          },
          style: {
            fill: bgColor, // background color
          },
          left: "center",
          top: "center",
        },
        {
          type: "text",
          style: {
            text: `${valueRounded}${unit}`,
            fontSize: 20,
            fontWeight: 600,
            fill: color,
          },
          left: "center",
          top: "center",
        },
      ],
    },
  };

  return (
    <div className="relative h-[90px]">
      <ReactECharts option={option} style={{ height: 90 }} />

      {status === "критично" && (
        <div className="absolute top-[0px] right-[15px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="white" />
            <path
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#E23F3F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
