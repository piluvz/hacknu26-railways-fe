import { useEffect, useState } from "react";

export default function Header() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
        setOpacity((prev) => (prev === 1 ? 0.5 : 1));
        }, 700); // speed

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex items-center gap-6 px-[30px] h-[68px] bg-[#171719] text-sm text-white border-b border-[#222223]">
            <div className="flex items-center">
                ТЕ33А
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1 13.1C12.6523 13.1 13.1 12.6523 13.1 12.1C13.1 11.5477 12.6523 11.1 12.1 11.1C11.5477 11.1 11.1 11.5477 11.1 12.1C11.1 12.6523 11.5477 13.1 12.1 13.1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                1234
            </div>

            <div className="font-semibold mr-auto">Локомотив Алматы - Астана</div>

            <div className="absolute flex items-center gap-[10px] left-[42%] text-[#49C86E]">
                <div 
                    className="w-[8px] h-[8px] bg-[#49C86E] rounded-[100%] transition-opacity duration-300"
                    style={{ opacity: opacity }}
                />
                <div>Трансляция в реальном времени</div>
            </div>
           

            <div className="font-semibold">16:30:14</div>
            <div>04.04.2026</div>
        </div>
    );
}
