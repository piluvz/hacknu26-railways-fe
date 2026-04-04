import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";
import SmallBarChart from "../../components/home/SmallBarChart";
import SpeedWidget from "../../components/home/SpeedWidget";
import BreaksWidget from "../../components/home/BreaksWidget";
import StatesWidget from "../../components/home/StatesWidget";
import AlertsPanel from "../../components/home/AlertsPanel";
import VoltageWidget from "../../components/home/VoltageWidget";

export default function HomePage() { 
    return (
        <div className='h-screen bg-[#111112] w-full '>
            <Header />

            <div className="flex h-full">
                <HealthIndex />

                <div className="flex flex-col mx-7 py-6 gap-5 flex-1 min-w-0">
                    <div className="flex gap-5 self-start">
                        <div className="w-[290px]">
                            <SpeedWidget />
                        </div>

                        <div className="w-[230px] flex flex-col gap-4">
                            <SmallBarChart/>
                            <div className="flex-1">
                                <BreaksWidget />
                            </div>
                        </div>

                        <div className="max-w-[330px]">
                            <StatesWidget />
                        </div>
                    </div>

                    <VoltageWidget />
                </div>

                <div className="ml-auto">
                    <AlertsPanel />
                </div>
            </div>

            

        </div>
    )   
};