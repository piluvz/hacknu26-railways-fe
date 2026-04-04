import ReactECharts from "echarts-for-react";

function makeTick(value: number, color: string) {
  return {
    type: "rect",
    left: `${(value / 100) * 100}%`,
    top: "center",
    shape: {
      width: 6,
      height: 40, // controls tick height
    },
    style: {
      fill: color,
      borderRadius: 3,
    },
    z: 10,
  };
}

const ProgressBar = ({ value, status }: { value: number; status: string }) => {
  const color =
    status === "normal"
      ? "#49C86E"
      : status === "critical"
        ? "#E23F3F"
        : "#EABD52";
  const total = 100;

  const warning = 20; // yellow marker
  const danger = 85; // red marker

  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: "value",
      max: total,
      show: false,
    },
    yAxis: {
      type: "category",
      data: [""],
      show: false,
    },

    series: [
      // Foreground progress
      {
        type: "bar",
        data: [value],
        barWidth: 20,
        itemStyle: {
          color: color,
          borderRadius: 16,
        },

        // 🔥 MARKERS
        // markLine: {
        //     symbol: "none",
        //     silent: true,

        //     lineStyle: {
        //     width: 0, // hide horizontal line
        //     },

        //     data: [
        //     {
        //         xAxis: warning,
        //         lineStyle: { color: "#F5A623", width: 4 },
        //         label: { show: false },
        //     },
        //     {
        //         xAxis: danger,
        //         lineStyle: { color: "#FF4D4F", width: 4 },
        //         label: { show: false },
        //     },
        //     ],
        // },
      },
    ],

    graphic: [makeTick(warning, "#F5A623"), makeTick(danger, "#FF4D4F")],
  };

  return (
    <div
      style={{
        backgroundColor: "#222223",
        height: 10,
        width: "100%",
        borderRadius: 16,
      }}
    >
      <ReactECharts option={option} style={{ height: 10 }} />
    </div>
  );
};

export default ProgressBar;
