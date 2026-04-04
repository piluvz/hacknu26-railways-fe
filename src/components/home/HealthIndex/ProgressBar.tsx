import ReactECharts from "echarts-for-react";

const ProgressBar = ({ value, status
}: {
    value: number;
    status: string;
}) => {
    const color = status === "normal" 
        ? "#49C86E"
        : status === "critical" 
        ? "#E23F3F"
        : "#EABD52";
    const total = 100;

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
            },
        ],
    };

  return (
    <div style={{
        backgroundColor: "#222223", 
        height: 10,
        width: 188,
        borderRadius: 16,
    }}>
        <ReactECharts option={option} style={{ height: 10 }} />
    </div>
);
};

export default ProgressBar;