import { useData } from "../../../context/DataContext";
import { useTheme } from "../../../context/ThemeContext";

// const STATIONS = [
//     { name: "Станция 1", distance: 0 },
//     { name: "Станция 2", distance: 250 },
//     { name: "Станция 3", distance: 530 },
//     { name: "Караганда", distance: 701 },
//     { name: "Станция 4", distance: 930 },
//     { name: "Станция 5", distance: 1243 }
// ];

export default function RouteWidget() {
    const { c } = useTheme();
    const { data } = useData();
    const max = data.route.total_distance_km;

    const currentDist = data.route.current_position_km;
    const distanceLeft = data.route.total_distance_km - currentDist;
    const displayPerc =currentDist * 100 / max;
    const nextStation = data.route.stops.filter(s => s.status === "впереди")[0];

    const infoColor =
    data.route.info.status === "норма"
      ? "#49C86E"
      :  data.route.info.status === "критично"
        ? "#E23F3F"
        : "#EABD52";
    

    return (
        <div
            className="p-[20px] rounded-[16px] h-full"
            style={{ backgroundColor: c.widgetBg, border: `1px solid ${c.border}` }}
        >
            <div className="text-sm mb-[10px] uppercase tracking-[0.08em]" style={{ color: c.textMuted }}>
                Маршрут
            </div>

            <div className="text-[14px]" style={{ color: c.text }}>
                <span className="inline-block mr-[14px]">{ data.route.info.title }</span>
                <span style={{ color: c.textMuted }}>через { data.route.info.distance_left_km } км · ~{ data.route.info.time_left }</span>
            </div>
            <div className="text-[14px] font-bold" style={{ color: infoColor }}>{ data.route.info.recommendation }</div>

            <div className="my-[15px]" style={{ borderBottom: `1px solid ${c.border}` }} />

            <div className="text-[10px]" style={{ color: c.textMuted }}>Следующая остановка:</div>

            <div className="text-[14px]" style={{ color: c.text }}>
                <span className="inline-block mr-[14px]">{ nextStation.name }</span>
                <span style={{ color: c.textMuted }}>через { Math.round(distanceLeft) } км · ~{ data.route.time_left }</span>
            </div>

            <div className="my-[15px]" style={{ borderBottom: `1px solid ${c.border}` }} />

            <div className="relative w-full pt-[20px] px-[10px]">
                <div className="relative w-full">
                    <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: c.progressTrack }}>
                        <div
                            className="h-full rounded-left transition-[width] duration-1000 ease-out bg-[#3C96F6]"
                            style={{ width: `${displayPerc}%` }}
                        />
                    </div>

                    {data.route.stops.map((station, index) => {
                        const stationPerc = station.distance_km * 100 / max;
                        const alignItems = index === 0 ? "flex-start"
                            : index === data.route.stops.length - 1 ? "flex-end"
                            : "center";

                        return (
                            <div
                                key={index}
                                className="absolute flex flex-col gap-[5px] items-center top-[-23px] w-[16px]"
                                style={{ alignItems, left: `calc(${stationPerc}% - 8px)` }}
                            >
                                <div className="text-[#696969] text-[10px] whitespace-nowrap">
                                    {station.distance_km} км
                                </div>

                                <div
                                    className="w-[16px] h-[16px] rounded-[100%]"
                                    style={{
                                        backgroundColor: station.status === "впереди" ? c.progressTrack : "#3C96F6"
                                    }}
                                />

                                <div
                                    className="text-[8px] whitespace-nowrap"
                                    style={{
                                        color: station.distance_km === currentDist ? c.text
                                            : station.status === "впереди" ? c.textMuted
                                            : "#3C96F6"
                                    }}
                                >
                                    {station.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
