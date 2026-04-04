import ReactECharts from "echarts-for-react";
import { ArrowBigUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// TODO: Replace with data from backend (pantograph_voltage field)
const VOLTAGE_DATA = {
  value: 24.5,
  max: 29,
  unit: "кВ",
  status: "Норма",
};
const DATA_POINTS = [
  23.8, 24.2, 24.0, 24.6, 24.1, 23.7, 23.9, 24.0, 23.6, 24.1, 24.3, 24.0, 23.8,
  24.1, 24.3, 24.5,
];

function statusStyle(status: string): { color: string; bg: string } {
  if (status === "Критично")
    return { color: "#E23F3F", bg: "rgba(226,63,63,0.12)" };
  if (status === "Внимание")
    return { color: "#EABD52", bg: "rgba(234,189,82,0.12)" };
  return { color: "#49C86E", bg: "rgba(73,200,110,0.12)" };
}

function StatusPill({ status }: { status: string }) {
  const { color, bg } = statusStyle(status);
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs"
      style={{ borderColor: color, backgroundColor: bg, color }}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {status}
    </div>
  );
}

export default function VoltageWidget() {
  const { c } = useTheme();

  const option = {
    backgroundColor: "transparent",
    grid: { left: 0, right: 0, top: 8, bottom: 0 },
    xAxis: {
      type: "category",
      data: DATA_POINTS.map((_, i) => i),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      min: (v: { min: number }) => +(v.min - 0.4).toFixed(1),
      max: (v: { max: number }) => +(v.max + 0.4).toFixed(1),
    },
    series: [
      {
        type: "line",
        data: DATA_POINTS,
        smooth: false,
        symbol: "circle",
        symbolSize: 7,
        showSymbol: false,
        lineStyle: { color: "#3C96F6", width: 2 },
        itemStyle: { color: "#3C96F6" },
        emphasis: {
          scale: true,
          itemStyle: {
            color: "#3C96F6",
            borderColor: "#fff",
            borderWidth: 2,
            shadowBlur: 6,
            shadowColor: "rgba(60,150,246,0.6)",
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(60,150,246,0.28)" },
              { offset: 1, color: "rgba(60,150,246,0.01)" },
            ],
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: { color: "#3C96F6", width: 1, type: "dashed" },
      },
      backgroundColor: c.widgetBg,
      borderColor: "#3C96F6",
      borderWidth: 1,
      padding: [6, 10],
      textStyle: { color: c.text, fontSize: 12 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) =>
        `<span style="font-weight:600">${params[0].value} кВ</span>`,
    },
    dataZoom: [{ type: "inside", filterMode: "none" }],
    animation: true,
    animationDuration: 1200,
    animationEasing: "cubicOut" as const,
  };

  return (
    <div
      className="flex flex-col px-5 pt-4 rounded-xl overflow-hidden border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
            Напряжение
          </span>
          <div className="flex items-center gap-1">
            <ArrowBigUp size={13} color="#EABD52" />
            <span className="text-xs text-[#EABD52] tracking-[0.08em]">растет</span>
          </div>
        </div>
        <StatusPill status={VOLTAGE_DATA.status} />
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-semibold">{VOLTAGE_DATA.value}</span>
        <span className="text-sm">{VOLTAGE_DATA.unit}</span>
        <span className="text-sm ml-1" style={{ color: c.textMuted }}>
          норма {VOLTAGE_DATA.max} {VOLTAGE_DATA.unit}
        </span>
      </div>

      {/* Chart */}
      <div className="relative">
        <ReactECharts option={option} style={{ height: 90 }} />
        <div className="flex justify-between text-xs px-1 -mt-5 pb-3" style={{ color: c.textMuted }}>
          <span>2 минуты назад</span>
          <span>сейчас</span>
        </div>
      </div>
    </div>
  );
}
