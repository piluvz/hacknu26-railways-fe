import { useEffect, useState } from 'react';

export default function FuelWidget() {
  const value = 1240;
  const max = 2000;
  const percentage = (value / max) * 100;
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayPct(percentage), 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex flex-col px-5 pt-[20px] pb-5 bg-[#171719] text-white border border-[#222223] rounded-xl h-[50%]">
        <span className="text-sm text-[#696969] uppercase tracking-[0.08em] mb-3 tracking-[0.08em]">Потребление энергии</span>

        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">{value}</span>
            <span className="text-md font-regular">кН</span>
        </div>

        <div className='text-[10px] mb-3'>
            240 кВт·ч из 2 000 кВт·ч
        </div>

        {/* Прогресс-бар */}
        <div className="relative w-full">
            <div className="h-2.5 w-full bg-[#242426] rounded-full overflow-hidden">
            <div
                className="h-full bg-[#EABD52] rounded-left transition-[width] duration-1000 ease-out"
                style={{ width: `${displayPct}%` }}
            />
            </div>

            {/* Максимальная отметка */}
            <div className="absolute top-[-4px] right-[20%] flex flex-col items-center">
                <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
            </div>
        </div>
    </div>
    );
}
