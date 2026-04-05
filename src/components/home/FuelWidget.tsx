import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

export default function FuelWidget() {
  const { c } = useTheme();
  const { data } = useData();
  const value = data.params.fuel_liters.value;
  const max = data.params.fuel_liters.max;
  const percentage = (value / max) * 100;
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayPct(percentage), 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div
      className="flex flex-col px-5 pt-[20px] pb-5 rounded-xl h-[50%] border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <span className="text-sm uppercase tracking-[0.08em] mb-3" style={{ color: c.textMuted }}>
        Потребление энергии
      </span>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-md font-regular">кН</span>
      </div>

      <div className="text-[10px] mb-3" style={{ color: c.textMuted }}>
        { value } кВт·ч из { max } кВт·ч
      </div>

      {/* Прогресс-бар */}
      <div className="relative w-full">
        <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: c.progressTrack }}>
          <div
            className="h-full bg-[#EABD52] rounded-left transition-[width] duration-1000 ease-out"
            style={{ width: `${displayPct}%` }}
          />
        </div>

        {/* Максимальная отметка */}
        <div className="absolute top-[-4px] right-[20%] flex flex-col items-center">
          <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
        </div>
      </div>
    </div>
  );
}
