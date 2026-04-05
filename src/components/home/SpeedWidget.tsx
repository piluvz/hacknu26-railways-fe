import ReactECharts from "echarts-for-react";
import { ArrowBigUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

function buildGaugeColors(
  speed: number,
  maxSpeed: number,
  emptyColor: string
): [number, string][] {
  const ratio = Math.min(speed / maxSpeed, 1);
  const steps = 50;
  const result: [number, string][] = [];

  for (let i = 1; i <= steps; i++) {
    const p = i / steps;

    if (p <= ratio) {
      const t = p / ratio;
      let r: number, g: number, b: number;

      if (t <= 0.5) {
        const s = t * 2;
        r = Math.round(90 + (245 - 90) * s);
        g = Math.round(224 + (200 - 224) * s);
        b = Math.round(104 + (66 - 104) * s);
      } else {
        const s = (t - 0.5) * 2;
        r = Math.round(245 + (232 - 245) * s);
        g = Math.round(200 + (122 - 200) * s);
        b = Math.round(66 + (48 - 66) * s);
      }

      result.push([p, `rgb(${r},${g},${b})`]);
    } else {
      result.push([p, emptyColor]);
    }
  }

  return result;
}

export default function SpeedWidget() {
  const { c } = useTheme();
  const { data } = useData();
  const speed = data.params.speed.value;
  const maxSpeed = data.params.speed.max;
  const unit = data.params.speed.unit;
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const prevSpeedRef = useRef(0);

  useEffect(() => {
    const from = prevSpeedRef.current;
    const to = speed;
    prevSpeedRef.current = to;

    const duration = 1400;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplaySpeed(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [speed]);

  const option = {
    backgroundColor: "transparent",
    series: [
      {
        type: "gauge",
        startAngle: 220,
        endAngle: -40,
        min: 0,
        max: maxSpeed,
        splitNumber: 10,
        radius: "85%",
        center: ["50%", "56%"],
        axisLine: {
          lineStyle: {
            width: 18,
            color: buildGaugeColors(displaySpeed, maxSpeed, c.gaugeEmpty),
          },
        },
        pointer: { show: false },
        axisTick: {
          distance: -22,
          length: 6,
          lineStyle: { color: c.gaugeTick, width: 1.5 },
        },
        splitLine: {
          distance: -28,
          length: 14,
          lineStyle: { color: c.gaugeSplit, width: 2 },
        },
        axisLabel: { show: false },
        detail: {
          valueAnimation: false,
          offsetCenter: [0, "15%"],
          formatter: (val: number) =>
            `{value|${Math.round(val)}}\n{unit|${unit}}`,
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 700,
              color: c.text,
              lineHeight: 40,
              fontFamily: "Inter, sans-serif",
            },
            unit: {
              fontSize: 17,
              color: c.text,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
            },
          },
        },
        data: [{ value: displaySpeed }],
      },
    ],
  };

  return (
    <div
      className="flex flex-col px-5 pt-4 rounded-xl h-full border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <div className="flex justify-between text-sm" style={{ color: c.textMuted }}>
        <span className="uppercase tracking-[0.08em]">Скорость</span>
        <div className="flex items-center justify-center gap-1">
          <ArrowBigUp size={13} color="#EABD52" />
          <span className="text-xs tracking-[0.08em] text-[#EABD52] leading-none">
            растет
          </span>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: 270, flex: 1 }} />
    </div>
  );
}
