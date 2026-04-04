import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function SmallBarChart() {
  const { c } = useTheme();
  const value = 245;
  const max = 350;
  const percentage = (value / max) * 100;
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayPct(percentage), 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div
      className="flex flex-col px-5 pt-4 pb-10 rounded-xl border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <span className="text-sm uppercase tracking-[0.08em] mb-3" style={{ color: c.textMuted }}>
        Тяговое усилие
      </span>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-md font-regular">кН</span>
      </div>

      {/* Прогресс-бар */}
      <div className="relative w-full">
        <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: c.progressTrack }}>
          <div
            className="h-full bg-[#3C96F6] rounded-left transition-[width] duration-1000 ease-out"
            style={{ width: `${displayPct}%` }}
          />
        </div>

        {/* Максимальная отметка */}
        <div className="absolute top-[-4px] right-[1%] flex flex-col items-center">
          <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
          <div className="text-[10px] mt-1 whitespace-nowrap" style={{ color: c.textMuted }}>
            макс: {max}
          </div>
        </div>
      </div>
    </div>
  );
}
