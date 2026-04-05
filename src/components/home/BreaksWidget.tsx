import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";

export default function BreaksWidget() {
  const { c } = useTheme();
  const { data } = useData();
  
  const value = data.params.brake_force.value;
  const unit = data.params.brake_force.unit;
  const label = data.params.brake_force.range_label;

  return (
    <div
      className="flex flex-col px-5 py-4 rounded-xl h-full border"
      style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
    >
      <span className="text-sm uppercase tracking-[0.08em] mb-3" style={{ color: c.textMuted }}>
        Тормоза
      </span>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-sm font-regular">{unit}</span>
      </div>

      <span className="flex items-center gap-1.5 text-sm text-[#3C96F6]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#3C96F6] animate-pulse" />
        {label}
      </span>
    </div>
  );
}
