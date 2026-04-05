import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function ProgressBar({ value, status, max, normMin, normMax }: {
    value: number;
    status: "норма" | "предупреждение" | "критично";
    max: number;
    normMin: number;
    normMax: number;
}) {
    const { c } = useTheme();
    const color = status === "норма"
        ? "#49C86E"
        : status === "критично"
        ? "#E23F3F"
        : "#EABD52";
  //  const max = 100;
    const percentage = (value / max) * 100;
    const normMinPct = (normMin / max) * 100;
    const normMaxPct = (normMax / max) * 100;
    const [displayPct, setDisplayPct] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setDisplayPct(percentage), 50);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="relative w-full">
            <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: c.progressTrack }}>
                <div
                    className="h-full rounded-left transition-[width] duration-1000 ease-out"
                    style={{ width: `${displayPct}%`, backgroundColor: color }}
                />
            </div>

            {/* Максимальная отметка */}
            <div className="absolute top-[-4px] flex flex-col items-center"
                style={{ left: `${normMaxPct}%`, transform: "translateX(-50%)" }}
            >
                <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
            </div>

            {/* Минимальная отметка */}
            <div className="absolute top-[-4px] flex flex-col items-center"
                 style={{ left: `${normMinPct}%`, transform: "translateX(-50%)" }}
            >
                <div className="h-5 w-[3px] bg-[#F7A92E] rounded-full" />
            </div>
        </div>
    );
}
