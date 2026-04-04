import { useState } from "react";
import { Radio, Download } from "lucide-react";

// TODO: Replace with data from backend
const KM_POINTS = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];

const GOLD = "#EABD52";

function DotTooltip({ label }: { label: string }) {
    return (
        <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none z-20
                        px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"
            style={{
                backgroundColor: "#1E1E20",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                boxShadow: `0 2px 8px rgba(0,0,0,0.5)`,
            }}
        >
            {label}
            {/* arrow */}
            <div
                className="absolute top-full left-1/2 -translate-x-1/2"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: `4px solid ${GOLD}`,
                }}
            />
        </div>
    );
}

export default function HistoryBar() {
    const [hovered, setHovered] = useState<number | "now" | null>(null);

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 py-7  gap-5 border-t border-[#222223]"
            style={{ backgroundColor: "#0F0F0F", height: 90 }}
        >
            {/* Label + Timeline — takes most of the space */}
            <div className="flex flex-col flex-1 min-w-0 justify-center gap-2">
                <span className="text-xs text-white font-semibold uppercase tracking-[0.1em]">
                    История
                </span>

                {/* Dots + line */}
                <div className="relative flex items-start">
                    {/* Connecting line — sits at dot center (7px = half of w-3.5 = 14px) */}
                    <div
                        className="absolute left-0 right-0 h-[3px]"
                        style={{ backgroundColor: GOLD, top: 6 }}
                    />

                    <div className="relative flex justify-between w-full">
                        {KM_POINTS.map((km) => (
                            <div
                                key={km}
                                className="relative flex flex-col items-center cursor-pointer"
                                onMouseEnter={() => setHovered(km)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {hovered === km && <DotTooltip label={`${km} км`} />}
                                <div
                                    className="w-3.5 h-3.5 rounded-full z-10 transition-transform duration-150"
                                    style={{
                                        backgroundColor: GOLD,
                                        transform: hovered === km ? "scale(1.4)" : "scale(1)",
                                        boxShadow: hovered === km ? `0 0 8px ${GOLD}BB` : "none",
                                    }}
                                />
                                <span className="text-[10px] text-[#555] whitespace-nowrap mt-1.5">
                                    {km} км
                                </span>
                            </div>
                        ))}

                        {/* Сейчас */}
                        <div
                            className="relative flex flex-col items-center cursor-pointer"
                            onMouseEnter={() => setHovered("now")}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {hovered === "now" && <DotTooltip label="Текущая позиция" />}
                            <div
                                className="w-3.5 h-3.5 rounded-full z-10 transition-transform duration-150"
                                style={{
                                    backgroundColor: GOLD,
                                    boxShadow: hovered === "now"
                                        ? `0 0 14px ${GOLD}CC`
                                        : `0 0 10px ${GOLD}AA`,
                                    transform: hovered === "now" ? "scale(1.4)" : "scale(1)",
                                }}
                            />
                            <span
                                className="text-[10px] font-medium whitespace-nowrap mt-1.5 text-[#44BD68]"
                            >
                                Сейчас
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons — shrink to content */}
            <div className="flex flex-col gap-2 w-fit items-end">
                <button
                    className="w-fit flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                    style={{ backgroundColor: "#49C86E" }}
                >
                    <Radio size={12} />
                    Вернуться на трансляцию
                </button>

                <button
                    className="w-fit flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-80 whitespace-nowrap"
                    style={{
                        border: `1.5px solid ${GOLD}`,
                        color: GOLD,
                        backgroundColor: "transparent",
                    }}
                >
                    <Download size={12} />
                    Экспортировать в PDF
                </button>
            </div>
        </div>
    );
}
