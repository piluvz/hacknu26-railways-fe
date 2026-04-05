import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

const ProgressBar = ({ value, status }: { value: number; status: "normal" | "warning" | "critical" }) => {
  const { c } = useTheme();
  const color =
    status === "normal"
      ? "#49C86E"
      : status === "critical"
        ? "#E23F3F"
        : "#EABD52";
  const max = 100;
  const percentage = (value / max) * 100;

  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayPct(percentage), 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative w-[200px]">
      <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: c.progressTrack }}>
        <div
          className="h-full rounded-left transition-[width] duration-1000 ease-out"
          style={{ width: `${displayPct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
