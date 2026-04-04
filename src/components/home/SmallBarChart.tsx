export default function SmallBarChart() {
  const value = 245;
  const max = 300;
  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col px-5 pt-4 pb-10 bg-[#171719] text-white border border-[#222223] rounded-xl">
        <span className="text-sm text-[#696969] uppercase tracking-[0.08em] mb-3">Тяговое усилие</span>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-md font-regular">кН</span>
      </div>

        {/* Прогресс-бар */}
      <div className="relative w-full">
        <div className="h-2.5 w-full bg-[#242426] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3C96F6] rounded-left transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Максимальная отметка */}
        <div className="absolute top-[-4px] right-[10%] flex flex-col items-center">
            <div className="h-5 w-[3px] bg-[#E23F3F] rounded-full" />
            <div className="text-[10px] text-[#696969] mt-1 whitespace-nowrap">
                макс: {max}
            </div>
        </div>
      </div>
    </div>
    );
}