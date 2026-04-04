import PieChart from "./PieChart";

const measures = [
    {
        label: "Двигатель",
        value: 92,
        unit: "°C",
        status: "critical",
        norm: "ДВС <85°C"
    },
    {
        label: "Масло",
        value: 70,
        unit: "°C",
        status: "warning",
        norm: "Масло <80°C"
    },
    {
        label: "Преобразователи",
        value: 42,
        unit: "°C",
        status: "normal",
        norm: "Тормоза <120°C"
    },
    {
        label: "Воздух",
        value: 22,
        unit: "°C",
        status: "normal",
        norm: "Воздух <120°C"
    }
];
const norms = measures.map(m => m.norm);

export default function TemperatureWidget() {
    return (
        <div className="p-[20px] bg-[#171719] border-1 border-[#222223] rounded-[16px]">
            <div className="mb-[10px] uppercase text-[#696969]">Температура</div>

            <div className="grid grid-cols-2 gap-4 px-[30px]">
                {
                    measures.map(measure => 
                        <div>
                            <PieChart 
                                value={measure.value}
                                unit={measure.unit}
                                status={measure.status}
                            />
                            <div className="text-[12px] text-[#fff] text-center">{ measure.label }</div>
                        </div>
                    )
                }
            </div>

            <div className="mt-[10px] text-[12px] text-[#696969]">
                Норма: { norms.join(" · ") }
            </div>
        </div>
    )
}