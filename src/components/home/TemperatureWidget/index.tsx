import PieChart from "./PieChart";
import { useTheme } from "../../../context/ThemeContext";

const measures = [
  { label: "Двигатель", value: 92, unit: "°C", status: "critical", norm: "ДВС <85°C" },
  { label: "Масло", value: 70, unit: "°C", status: "warning", norm: "Масло <80°C" },
  { label: "Преобразователи", value: 42, unit: "°C", status: "normal", norm: "Тормоза <120°C" },
  { label: "Воздух", value: 22, unit: "°C", status: "normal", norm: "Воздух <120°C" },
];
const norms = measures.map((m) => m.norm);

export default function TemperatureWidget() {
    const { c } = useTheme();

    return (
        <div
            className="p-[20px] rounded-[16px] h-[340px]"
            style={{ backgroundColor: c.widgetBg, border: `1px solid ${c.border}` }}
        >
            <div className="text-sm mb-[10px] uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
                Температура
            </div>

            <div className="grid grid-cols-2 gap-4 px-[30px]">
                {measures.map((measure, i) => (
                    <div key={i}>
                        <PieChart value={measure.value} unit={measure.unit} status={measure.status} />
                        <div className="text-[12px] text-center" style={{ color: c.text }}>
                            {measure.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-[10px] text-[12px]" style={{ color: c.textMuted }}>
                Норма: {norms.join(" · ")}
            </div>
        </div>
    );
}
