import ReactECharts from "echarts-for-react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

const HISTORY_SIZE = 14;

function getTrend(history: number[]): "up" | "down" {
  if (history.length < 2) return "up";
  return history[history.length - 1] >= history[history.length - 2] ? "up" : "down";
}

interface TrendCardProps {
  title: string;
  value: number;
  unit: string;
  trend: "up" | "down";
  color: string;
  data: number[];
  yMin: number;
  yMax: number;
}

function TrendCard({ title, value, unit, trend, color, data, yMin, yMax }: TrendCardProps) {
  const { c } = useTheme();

  const option = {
    backgroundColor: "transparent",
    grid: { left: 32, right: 4, top: 8, bottom: 4 },
    xAxis: {
      type: "category",
      show: false,
      boundaryGap: true,
      data: data.map((_, i) => i),
    },
    yAxis: {
      type: "value",
      min: yMin,
      max: yMax,
      splitNumber: 1,
      axisLabel: {
        color: c.textMuted,
        fontSize: 11,
        fontFamily: "Inter, sans-serif",
        formatter: (val: number) =>
          val === yMin || val === yMax ? String(val) : "",
      },
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data,
        barCategoryGap: "12%",
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color + "DD" },
              { offset: 0.05, color: color + "99" },
              { offset: 1, color: color + "14" },
            ],
          },
        },
        emphasis: { disabled: true },
      },
    ],
    dataZoom: [{ type: "inside", filterMode: "none" }],
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut" as const,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: { color: "rgba(255,255,255,0.04)" },
      },
      backgroundColor: c.widgetBg,
      borderColor: color,
      borderWidth: 1,
      padding: [6, 10],
      textStyle: { color: c.text, fontSize: 12 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) =>
        `<span style="font-weight:600;color:${color}">${params[0].value} ${unit}</span>`,
    },
  };

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-[15px] mb-1 tracking-[0.08em]" style={{ color: c.text }}>
        {title}
      </span>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-semibold" style={{ color }}>
          {value}
        </span>
        <span className="text-sm" style={{ color: c.textMuted }}>{unit}</span>
        <div className="flex items-center gap-1 ml-2">
          {trend === "up" ? (
            <ArrowBigUp size={13} color="#EABD52" />
          ) : (
            <ArrowBigDown size={13} color="#EABD52" />
          )}
          <span className="text-xs text-[#EABD52] tracking-[0.06em]">
            {trend === "up" ? "растет" : "снижается"}
          </span>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: 100 }} />
    </div>
  );
}

export default function TrendsWidget() {
  const { c } = useTheme();
  const { data } = useData();
  const { speed, temp_motor, tractive_force } = data.params;

  const speedHistory = useRef<number[]>([]);
  const tempHistory = useRef<number[]>([]);
  const tractionHistory = useRef<number[]>([]);

  useEffect(() => {
    speedHistory.current = [...speedHistory.current, speed.value].slice(-HISTORY_SIZE);
    tempHistory.current = [...tempHistory.current, temp_motor.value].slice(-HISTORY_SIZE);
    tractionHistory.current = [...tractionHistory.current, tractive_force.value].slice(-HISTORY_SIZE);
  }, [data]);

  const trendsData = [
    {
      id: "speed",
      title: "Скорость",
      value: speed.value,
      unit: speed.unit,
      trend: getTrend(speedHistory.current),
      color: "#9B6DFF",
      yMin: speed.min,
      yMax: speed.max,
      data: speedHistory.current.length ? speedHistory.current : [speed.value],
    },
    {
      id: "temp",
      title: "Температура двигателя",
      value: temp_motor.value,
      unit: temp_motor.unit,
      trend: getTrend(tempHistory.current),
      color: "#FF6B6B",
      yMin: temp_motor.min,
      yMax: temp_motor.max,
      data: tempHistory.current.length ? tempHistory.current : [temp_motor.value],
    },
    {
      id: "traction",
      title: "Тяговое усилие",
      value: tractive_force.value,
      unit: tractive_force.unit,
      trend: getTrend(tractionHistory.current),
      color: "#3C96F6",
      yMin: tractive_force.min,
      yMax: tractive_force.max,
      data: tractionHistory.current.length ? tractionHistory.current : [tractive_force.value],
    },
  ];

  const DIVIDER = <div className="w-px self-stretch mx-2" style={{ backgroundColor: c.innerBorder }} />;

  return (
    <div
      className="flex flex-col px-5 pt-4 pb-6 rounded-xl border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <div className="flex items-center gap-7 mb-4">
        <span className="text-sm uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
          Тренды
        </span>
        <span className="text-sm" style={{ color: c.textMuted }}>Последние 20 минут</span>
      </div>

      <div className="flex gap-5">
        {trendsData.map((t, i) => (
          <>
            <TrendCard key={t.id} {...t} />
            {i < trendsData.length - 1 && DIVIDER}
          </>
        ))}
      </div>
    </div>
  );
}
