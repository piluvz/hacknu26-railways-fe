export default function RouteWidget() { 
    return (
        <div className="p-[20px] bg-[#171719] border-1 border-[#222223] rounded-[16px]">
            <div className="mb-[10px] uppercase text-[#696969]">Маршрут</div>

            <div className="text-[#fff] text-[14px]">
                <span className="inline-block mr-[14px]">Жилая зона</span>
                <span className="text-[#696969]">через 30 км · ~14мин</span>
            </div>
            <div className="text-[14px] font-bold text-[#EABD52]">Снизить скорость</div>

            <div className="border-b-1 border-[#222223] my-[15px]" />



            <div className="text-[10px] text-[#696969]">Следующая остановка:</div>

            <div className="text-[#fff] text-[14px]">
                <span className="inline-block mr-[14px]">Станция 3</span>
                <span className="text-[#696969]">через 119 км · ~1ч 02мин</span>
            </div>

            <div className="border-b-1 border-[#222223] my-[15px]" />

        
             <ProgressStations stations={[
                    { name: "Станция 1", distance: "120 км" },
                    { name: "Станция 2", distance: "250 км" },
                    { name: "Станция 3", distance: "530 км" },
                    { name: "Караганда", distance: "601 км" },
                    { name: "Станция 4", distance: "930 км" },
                    { name: "Станция 5", distance: "1243 км" },
                ]} currentIndex={3} />

             {/* <div className="relative w-full">
                <div className="h-2.5 w-full bg-[#242426] rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#3C96F6] rounded-left transition-all duration-500"
                        style={{ width: `${60}%` }}
                    />

                    <div className={`top-[-5px] left-[5px] absolute bg-[#3C96F6] w-[20px] h-[20px] rounded-[100%]`} />
                    <div className="text-[8px] text-[#3C96F6]">Станция 1</div>
                   

               

                </div>
            </div> */}
        </div>
    )
}



function ProgressStations({
  stations = [],
  currentIndex = 0,
}: {
    stations:  { name: string; distance: string; }[];
    currentIndex: number;
}) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-5 left-0 w-full h-[8px] bg-gray-700 rounded-full" />

        {/* Active progress line */}
        <div
          className="absolute top-5 left-0 h-[8px] bg-blue-500 rounded-full transition-all duration-500"
          style={{
            width: `${(currentIndex / (stations.length - 1)) * 100}%`,
          }}
        />

        <div className="absolute top-[-12px] left-[-25px] flex">
            {/* Stations */}
            {stations.map((station, index) => {
            const isCompleted = index <= currentIndex;

            return (
                <div
                    key={index}
                className="relative flex flex-col items-center text-center w-full"
                >
                {/* Distance label */}
                <span
                    className={`mb-2 text-[10px] ${
                    isCompleted ? "text-gray-300" : "text-gray-500"
                    }`}
                >
                    {station.distance}
                </span>

                {/* Circle */}
                <div
                    className={`w-[16px] h-[16px] rounded-full z-10 flex items-center justify-center
                    ${
                        isCompleted
                        ? "bg-blue-500"
                        : "bg-gray-700 border border-gray-600"
                    }
                    `}
                />

                {/* Station name */}
                <span
                    className={`mt-3 text-[8px] whitespace-nowrap
                    ${
                        isCompleted ? "text-blue-400" : "text-gray-500"
                    }
                    `}
                >
                    {station.name}
                </span>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
}