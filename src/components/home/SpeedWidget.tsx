import ReactECharts from "echarts-for-react";

// TODO: Replace hardcoded value with data from backend
const SPEED_FROM_BACKEND = 87; // km/h — replace with API response

export default function SpeedWidget() {
    const speed = SPEED_FROM_BACKEND;

    const option = {
        backgroundColor: "transparent",
        series: [
            {
                type: "gauge",
                startAngle: 220,
                endAngle: -40,
                min: 0,
                max: 200,
                splitNumber: 10,
                radius: "82%",
                center: ["50%", "54%"],
                axisLine: {
                    lineStyle: {
                        width: 14,
                        color: [
                            [0.4, "#49C86E"],
                            [0.7, "#F0A500"],
                            [1, "#E5534B"],
                        ],
                    },
                },
                pointer: {
                    length: "60%",
                    width: 5,
                    itemStyle: { color: "#FFFFFF" },
                },
                axisTick: {
                    distance: -18,
                    length: 6,
                    lineStyle: { color: "#FFFFFF66", width: 1 },
                },
                splitLine: {
                    distance: -24,
                    length: 14,
                    lineStyle: { color: "#FFFFFF99", width: 2 },
                },
                axisLabel: {
                    color: "#FFFFFF66",
                    distance: 28,
                    fontSize: 11,
                    fontFamily: "Inter, sans-serif",
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: [0, "30%"],
                    formatter: (val: number) => `{value|${val}}\n{unit|км/ч}`,
                    rich: {
                        value: {
                            fontSize: 48,
                            fontWeight: 600,
                            color: "#FFFFFF",
                            lineHeight: 56,
                            fontFamily: "Inter, sans-serif",
                        },
                        unit: {
                            fontSize: 14,
                            color: "#FFFFFF4D",
                            fontFamily: "Inter, sans-serif",
                        },
                    },
                },
                data: [{ value: speed }],
            },
        ],
    };

    return (
        <div className="flex flex-col px-[30px] py-[26px] bg-[#171719] text-white border-r border-[#222223]">
            <div className="mb-2 font-normal uppercase text-sm tracking-[0.08em] text-white/60">
                Скорость
            </div>

            <ReactECharts option={option} style={{ height: 280, flex: 1 }} />

            <div className="flex justify-between mt-2 text-xs">
                <span className="text-[#49C86E]">● Норма</span>
                <span className="text-[#F0A500]">● Ограничение</span>
                <span className="text-[#E5534B]">● Превышение</span>
            </div>
        </div>
    );
}
