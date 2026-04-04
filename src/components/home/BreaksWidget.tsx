export default function BreaksWidget() {
  const value = 0;

  return (
    <div className="flex flex-col px-5 py-4 bg-[#171719] text-white border border-[#222223] rounded-xl h-full">
      <span className="text-sm text-[#696969] uppercase tracking-[0.08em] mb-3">
        Тормоза
      </span>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-semibold tracking-tight">{value}</span>
        <span className="text-sm font-regular">кПа</span>
      </div>

      <span className="flex items-center gap-1.5 text-sm text-[#3C96F6]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#3C96F6] animate-pulse" />
        Отпущены
      </span>
    </div>
  );
}
