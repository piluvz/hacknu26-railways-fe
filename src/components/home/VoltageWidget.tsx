import ReactECharts from "echarts-for-react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

const MAX_POINTS = 20;
const BASE_URL = "http://127.0.0.1:8000";

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
  const { data } = useData();
  const params = data?.params as any;
  const currentParam = params?.pantograph_voltage || params?.temp_oil || {
    name: "",
    value: 0,
    norm_max: 0,
    unit: "—",
    status: "Норма",
    label: "Нет данных"
  };

  const metricKey = params?.pantograph_voltage ? "pantograph_voltage" : "temp_oil";
  const trainId = data?.train_id;

  // history: array of { x: number, y: number } with monotonically growing x
  const [history, setHistory] = useState<{ x: number; y: number }[]>([]);
  const counterRef = useRef(0);
  const prevValueRef = useRef<number | null>(null);
  const loadedRef = useRef(false);

  // Initial fetch of historical data
  useEffect(() => {
    if (!trainId) return;
    fetch(`${BASE_URL}/api/historic/telemetry/${trainId}/metrics/${metricKey}`)
      .then(res => res.json())
      .then(raw => {
        const values: number[] = Array.isArray(raw)
          ? raw
              .map((item: any) => (typeof item === "number" ? item : item.value))
              .filter((v: any) => typeof v === "number" && isFinite(v))
          : [];
        const sliced = values.slice(-MAX_POINTS);
        counterRef.current = sliced.length;
        loadedRef.current = true;
        setHistory(sliced.map((y, i) => ({ x: i, y })));
      })
      .catch(() => {
        loadedRef.current = true;
      });
  }, [trainId, metricKey]);

  // Slide in new point on each websocket update (only after history is loaded)
  useEffect(() => {
    const v = currentParam.value;
    if (!loadedRef.current || v == null || prevValueRef.current === v) return;
    prevValueRef.current = v;
    const idx = ++counterRef.current;
    setHistory(prev => {
      const next = [...prev, { x: idx, y: v }];
      return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
    });
  }, [currentParam.value]);

  const trend = history.length >= 2
    ? history[history.length - 1].y >= history[history.length - 2].y ? "up" : "down"
    : "stable";

  const xMin = history.length > 0 ? history[0].x : 0;
  const xMax = history.length > 0 ? history[history.length - 1].x : MAX_POINTS - 1;

  const option = {
    backgroundColor: "transparent",
    grid: { left: 0, right: 0, top: 8, bottom: 0 },
    xAxis: {
      type: "value" as const,
      min: xMin,
      max: xMax,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value" as const,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      min: currentParam.min ?? "dataMin",
      max: currentParam.max ?? "dataMax",
    },
    series: [
      {
        type: "line",
        data: history.map(p => [p.x, p.y]),
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
        `<span style="font-weight:600">${params[0].value[1]} ${currentParam.unit}</span>`,
    },
    dataZoom: [{ type: "inside", filterMode: "none" }],
    animation: true,
    animationDuration: 600,
    animationEasing: "cubicOut" as const,
    animationDurationUpdate: 800,
    animationEasingUpdate: "cubicInOut" as const,
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
            {currentParam.name}
          </span>
          <div className="flex items-center gap-1">
            {trend === "down"
              ? <ArrowBigDown size={13} color="#EABD52" />
              : <ArrowBigUp size={13} color="#EABD52" />}
            <span className="text-xs text-[#EABD52] tracking-[0.08em]">
              {trend === "down" ? "снижается" : trend === "up" ? "растет" : "стабильно"}
            </span>
          </div>
        </div>
        <StatusPill status={currentParam.status} />
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-semibold">{currentParam.value}</span>
        <span className="text-sm">{currentParam.unit}</span>
        <span className="text-sm ml-1" style={{ color: c.textMuted }}>
          норма до {currentParam.norm_max || 0} {currentParam.unit}
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
