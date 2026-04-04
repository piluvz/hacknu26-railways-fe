import ReactECharts from "echarts-for-react";

// TODO: Replace hardcoded values with data from backend
const DATA_FROM_BACKEND = {
    tractionForce: 320,   // kN — replace with API response
    tractionMax: 500,
    brakesPressure: 4.2,  // bar — replace with API response
    brakesMax: 8.0,
};

function LinearGauge({
    label,
    value,
    max,
    unit,
    color,
}: {
    label: string;
    value: number;
    max: number;
    unit: string;
    color: string;
}) {
    const option = {
        backgroundColor: "transparent",
        grid: { top: 0, bottom: 0, left: 0, right: 0 },
        xAxis: { type: "value", min: 0, max, show: false },
        yAxis: { type: "category", data: [""], show: false },
        series: [
            {
                type: "bar",
                data: [value],
                barWidth: 12,
                itemStyle: { color, borderRadius: [0, 6, 6, 0] },
                backgroundStyle: { color: "#FFFFFF14", borderRadius: 6 },
                showBackground: true,
            },
        ],
    };

    const pct = Math.round((value / max) * 100);

    return (
        <div className="mb-7">
            <div className="flex justify-between items-baseline mb-[10px]">
                <span className="text-[13px] text-white/60 uppercase tracking-[0.06em]">{label}</span>
                <div className="text-right">
                    <span className="text-[28px] font-semibold text-white">{value}</span>
                    <span className="text-xs text-white/30 ml-1">{unit}</span>
                </div>
            </div>

            <ReactECharts option={option} style={{ height: 24 }} />

            <div className="flex justify-between mt-1.5 text-[11px] text-white/20">
                <span>0</span>
                <span style={{ color }}>{pct}%</span>
                <span>{max} {unit}</span>
            </div>
        </div>
    );
}

export default function TractionBrakes() {
    const { tractionForce, tractionMax, brakesPressure, brakesMax } = DATA_FROM_BACKEND;

    const brakesColor = brakesPressure > brakesMax * 0.8 ? "#E5534B" : "#4D94FF";

    return (
        <div className="flex flex-col px-[30px] py-[26px] bg-[#171719] text-white border-r border-[#222223]">
            <div className="mb-[30px] font-normal uppercase text-sm tracking-[0.08em] text-white/60">
                Тяга и тормоза
            </div>

            <div className="flex-1">
                {/* Traction section label */}
                <div className="flex items-center gap-[10px] mb-4">
                    <div className="w-1 h-4 rounded-sm bg-[#49C86E]" />
                    <span className="text-xs text-white/40 uppercase tracking-[0.06em]">Тяговое усилие</span>
                </div>

                <LinearGauge
                    label="Усилие"
                    value={tractionForce}
                    max={tractionMax}
                    unit="кН"
                    color="#49C86E"
                />

                <div className="border-t border-[#222223] my-2 mb-5" />

                {/* Brakes section label */}
                <div className="flex items-center gap-[10px] mb-4">
                    <div className="w-1 h-4 rounded-sm" style={{ backgroundColor: brakesColor }} />
                    <span className="text-xs text-white/40 uppercase tracking-[0.06em]">Тормоза</span>
                </div>

                <LinearGauge
                    label="Давление"
                    value={brakesPressure}
                    max={brakesMax}
                    unit="бар"
                    color={brakesColor}
                />
            </div>

            {/* Status row */}
            <div className="flex gap-4 pt-4 border-t border-[#222223] text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#49C86E]" />
                    <span className="text-white/40">Тяга активна</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brakesColor }} />
                    <span className="text-white/40">
                        {brakesPressure > brakesMax * 0.8 ? "Торможение" : "Тормоза в норме"}
                    </span>
                </div>
            </div>
        </div>
    );
}
