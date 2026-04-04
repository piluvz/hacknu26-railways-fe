const STATIONS = [
    { name: "Станция 1", distance: 0 },
    { name: "Станция 2", distance: 250 },
    { name: "Станция 3", distance: 530 },
    { name: "Караганда", distance: 701 },
    { name: "Станция 4", distance: 930 },
    { name: "Станция 5", distance: 1243 }
];

export default function RouteWidget() { 
    const currentIndex = 3;
    const max = STATIONS[STATIONS.length - 1].distance;
    const displayPerc = STATIONS[currentIndex].distance * 100 / max;

    return (
        <div className="p-[20px] bg-[#171719] border-1 border-[#222223] rounded-[16px] h-full">
            <div className="text-sm mb-[10px] uppercase text-[#696969] tracking-[0.08em]">Маршрут</div>

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
            

            <div className="relative w-full pt-[20px] px-[10px]">
                <div className="relative w-full">
                    <div className="h-2.5 w-full bg-[#222223] rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-left transition-[width] duration-1000 ease-out bg-[#3C96F6]"
                        style={{ width: `${displayPerc}%` }}
                    />
                    </div>

                    {
                        STATIONS.map((station, index) => {
                            const max = STATIONS[STATIONS.length - 1].distance;
                            const displayPerc = station.distance * 100 / max;

                            const style = 
                                { 
                                    alignItems: index === 0 ? "flex-start"
                                         : index === STATIONS.length - 1 ? "flex-end"
                                         : "center",
                                    left: `calc(${displayPerc}% - 8px)`   
                                };

                            return (
                                <div
                                    className="absolute flex flex-col gap-[5px] items-center top-[-23px] w-[16px]"
                                    style={style}
                                >
                                    <div className="text-[#696969] text-[10px] whitespace-nowrap">
                                        { station.distance } км
                                    </div>
                                    
                                    <div className="w-[16px] h-[16px] rounded-[100%]" 
                                        style={{
                                            backgroundColor: index > currentIndex ? "#222223" : "#3C96F6"
                                        }}
                                    />

                                    <div className="text-[8px] whitespace-nowrap"
                                        style={{
                                            color: index === currentIndex ? "#fff" : 
                                                index > currentIndex ? "#696969" :
                                                "#3C96F6"
                                        }}
                                    >
                                        { station.name }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
          
        </div>
    )
}