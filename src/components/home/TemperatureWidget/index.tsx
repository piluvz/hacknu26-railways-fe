import PieChart from "./PieChart";
import { useTheme } from "../../../context/ThemeContext";
import { useData } from "../../../context/DataContext";

// const measures = [
//   { label: "Двигатель", value: 92, unit: "°C", status: "critical", norm: "ДВС <85°C" },
//   { label: "Масло", value: 70, unit: "°C", status: "warning", norm: "Масло <80°C" },
//   { label: "Преобразователи", value: 42, unit: "°C", status: "normal", norm: "Тормоза <120°C" },
//   { label: "Воздух", value: 22, unit: "°C", status: "normal", norm: "Воздух <120°C" },
// ];
// const norms = measures.map((m) => m.norm);

export default function TemperatureWidget() {
    const { c } = useTheme();
    const { data } = useData();
    const norms = [
        `ДВС <${ data.params.temp_motor.max }${ data.params.temp_motor.unit }`,
        `Масло <${ data.params.temp_oil.max }${ data.params.temp_motor.unit }`,
        `Тормоза <${ data.params.temp_converters.max }${ data.params.temp_motor.unit }`,
        `Воздух <${ data.params.temp_air.max }${ data.params.temp_motor.unit }`,
    ];

    return (
        <div
            className="p-[20px] rounded-[16px] h-[340px]"
            style={{ backgroundColor: c.widgetBg, border: `1px solid ${c.border}` }}
        >
            <div className="text-sm mb-[10px] uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
                Температура
            </div>

            <div className="grid grid-cols-2 gap-4 px-[30px]">
                <div>
                    <PieChart value={data.params.temp_motor.value} unit={data.params.temp_motor.unit} status={data.params.temp_motor.status} />
                    <div className="text-[12px] text-center" style={{ color: c.text }}>
                        { data.params.temp_motor.name }
                    </div>
                </div>

                <div>
                    <PieChart value={data.params.temp_oil.value} unit={data.params.temp_oil.unit} status={data.params.temp_oil.status} />
                    <div className="text-[12px] text-center" style={{ color: c.text }}>
                        { data.params.temp_oil.name }
                    </div>
                </div>

                <div>
                    <PieChart value={data.params.temp_converters.value} unit={data.params.temp_converters.unit} status={data.params.temp_converters.status} />
                    <div className="text-[12px] text-center" style={{ color: c.text }}>
                        { data.params.temp_converters.name }
                    </div>
                </div>

                <div>
                    <PieChart value={data.params.temp_air.value} unit={data.params.temp_air.unit} status={data.params.temp_air.status} />
                    <div className="text-[12px] text-center" style={{ color: c.text }}>
                        { data.params.temp_air.name }
                    </div>
                </div>


                {/* {data.map((measure, i) => (
                    <div key={i}>
                        <PieChart value={measure.value} unit={measure.unit} status={measure.status} />
                        <div className="text-[12px] text-center" style={{ color: c.text }}>
                            {measure.label}
                        </div>
                    </div>
                ))} */}
            </div>

            <div className="mt-[10px] text-[12px]" style={{ color: c.textMuted }}>
                Норма: {norms.join(" · ")}
            </div>
        </div>
    );
}
