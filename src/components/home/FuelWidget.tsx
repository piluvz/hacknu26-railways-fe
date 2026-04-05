import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

export default function FuelWidget() {
  const { c } = useTheme();
  const { data } = useData();

  const source = data.params.fuel_liters ?? data.params.energy_usage;
  const title = source?.name ?? (data.params.fuel_liters ? "Топливо" : "Потребление энергии");
  const value = source?.value ?? 0;
  const max = source?.max ?? 1;
  const norm_max = source?.norm_max ?? 0;
  const unit = source?.unit ?? "";
  const percentage = (value / max) * 100;
  const normMaxPct = (norm_max / max) * 100;

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
        {title}
      </span>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-md font-regular">{unit}</span>
      </div>

      <div className="text-[10px] mb-3" style={{ color: c.textMuted }}>
        {value} {unit} из {max} {unit}
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
        <div className="absolute top-[-4px] flex flex-col items-center"
          style={{ left: `${normMaxPct}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
        </div>
      </div>
    </div>
  );
}
