import ProgressBar from "./ProgressBar";
import { useTheme } from "../../../context/ThemeContext";
import { useData } from "../../../context/DataContext";

// const metrics = [
//   { label: "Metric", value: 80, unit: "бар", status: "normal" },
//   { label: "Metric", value: 20, unit: "бар", status: "critical" },
//   { label: "Metric", value: 60, unit: "бар", status: "warning" },
//   { label: "Metric", value: 80, unit: "бар", status: "normal" },
// ];

export default function PressureWidget() {
    const { c } = useTheme();
    const { data } = useData();

    return (
        <div
            className="p-[20px] rounded-[16px] h-[340px]"
            style={{ backgroundColor: c.widgetBg, border: `1px solid ${c.border}` }}
        >
            <div className="text-sm mb-[10px] uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
                Давление
            </div>

            <div className="mb-[24px]" style={{ color: c.text }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                    <span>Двигатель</span>
                    <span style={{
                        color: data.params.pressure_brake.status === "норма"
                            ? "#49C86E"
                            : data.params.pressure_brake.status === "критично"
                            ? "#E23F3F"
                            : "#EABD52"
                    }}>
                        {data.params.pressure_brake.value} {data.params.pressure_brake.unit}
                    </span>
                </div>

                <ProgressBar 
                    value={data.params.pressure_brake.value} 
                    status={data.params.pressure_brake.status} 
                    max={data.params.pressure_brake.max}
                />
            </div>

            <div className="mb-[24px]" style={{ color: c.text }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                    <span>Масло</span>
                    <span style={{
                        color: data.params.pressure_oil.status === "норма"
                            ? "#49C86E"
                            : data.params.pressure_oil.status === "критично"
                            ? "#E23F3F"
                            : "#EABD52"
                    }}>
                        {data.params.pressure_oil.value} {data.params.pressure_oil.unit}
                    </span>
                </div>

                <ProgressBar 
                    value={data.params.pressure_oil.value} 
                    status={data.params.pressure_oil.status} 
                    max={data.params.pressure_oil.max}
                />
            </div>

            <div className="mb-[24px]" style={{ color: c.text }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                    <span>Main Tank</span>
                    <span style={{
                        color: data.params.pressure_main_tank.status === "норма"
                            ? "#49C86E"
                            : data.params.pressure_main_tank.status === "критично"
                            ? "#E23F3F"
                            : "#EABD52"
                    }}>
                        {data.params.pressure_main_tank.value} {data.params.pressure_main_tank.unit}
                    </span>
                </div>

                <ProgressBar 
                    value={data.params.pressure_main_tank.value} 
                    status={data.params.pressure_main_tank.status} 
                    max={data.params.pressure_main_tank.max}

                />
            </div>

            <div className="mb-[24px]" style={{ color: c.text }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                    <span>Воздух</span>
                    <span style={{
                        color: data.params.pressure_air.status === "норма"
                            ? "#49C86E"
                            : data.params.pressure_air.status === "критично"
                            ? "#E23F3F"
                            : "#EABD52"
                    }}>
                        {data.params.pressure_air.value} {data.params.pressure_air.unit}
                    </span>
                </div>

                <ProgressBar
                    value={data.params.pressure_air.value} 
                    status={data.params.pressure_air.status} 
                    max={data.params.pressure_air.max}
                />
            </div>

            {/* {metrics.map((metric, index) =>
                <div key={index} className="mb-[24px]" style={{ color: c.text }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                        <span>{metric.label}</span>
                        <span style={{
                            color: metric.status === "normal"
                                ? "#49C86E"
                                : metric.status === "critical"
                                ? "#E23F3F"
                                : "#EABD52"
                        }}>
                            {metric.value} {metric.unit}
                        </span>
                    </div>

                    <ProgressBar value={metric.value} status={metric.status} />
                </div>
            )} */}
        </div>
    );
}
