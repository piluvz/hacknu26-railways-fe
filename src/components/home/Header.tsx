import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

export default function Header() {
    const status: any = "online";
    const [opacity, setOpacity] = useState(1);
    const { isDark, toggle, c } = useTheme();
    const { data } = useData();

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity((prev) => (prev === 1 ? 0.5 : 1));
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="flex items-center gap-6 px-[30px] h-[68px] text-sm border-b"
            style={{ backgroundColor: c.widgetBg, color: c.text, borderColor: c.border }}
        >
            <div className="flex items-center">
                { data.train_id }
                {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1 13.1C12.6523 13.1 13.1 12.6523 13.1 12.1C13.1 11.5477 12.6523 11.1 12.1 11.1C11.5477 11.1 11.1 11.5477 11.1 12.1C11.1 12.6523 11.5477 13.1 12.1 13.1Z" stroke={c.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                1234 */}
            </div>

            <div className="font-semibold mr-auto">Локомотив { data.route.route_name } </div>

            <div
                className="absolute flex items-center gap-[10px]"
                style={{
                    left: status === "online" ? "42%" : "45%",
                    color: status === "online" ? "#49C86E" : "#696969",
                }}
            >
                {status === "online" ? (
                    <div
                        className="w-[8px] h-[8px] bg-[#49C86E] rounded-[100%] transition-opacity duration-300"
                        style={{ opacity }}
                    />
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4103 10.7852C10.1529 11.1218 10 11.5425 10 11.999C10 13.1036 10.8954 13.999 12 13.999C12.5077 13.999 12.9713 13.8098 13.324 13.498M16.1992 7.80078C17.4739 9.07549 18.0422 10.8109 17.9039 12.5134M19.0996 4.89844C22.0892 7.88804 22.7871 12.2879 21.1932 15.936M2 2L22 22M4.89961 19.0984C0.999609 15.1984 0.999609 8.79844 4.89961 4.89844M7.79922 16.1992C5.66828 14.0683 5.51165 10.6498 7.32931 8.25" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
                <div>
                    {status === "online" ? "Трансляция в реальном времени" : "Оффлайн"}
                </div>
            </div>

            {/* Theme toggle */}
            <button
                onClick={toggle}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-80"
                style={{
                    border: `1.5px solid ${c.border}`,
                    color: c.text,
                    backgroundColor: "transparent",
                }}
            >
                {isDark ? <Moon size={13} /> : <Sun size={13} />}
                {isDark ? "Ночной режим" : "Светлый режим"}
            </button>

            <div className="font-semibold">
                { 
                    new Date(data.time).toLocaleTimeString("en-GB", { hour12: false }) 
                }
            </div>
            <div>
                { 
                    new Date(data.time).toLocaleDateString("en-GB").replace(/\//g, ".")
                }
            </div>
        </div>
    );
}
