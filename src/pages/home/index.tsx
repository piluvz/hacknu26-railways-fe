import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";
import SmallBarChart from "../../components/home/SmallBarChart";
import SpeedWidget from "../../components/home/SpeedWidget";
import BreaksWidget from "../../components/home/BreaksWidget";
import StatesWidget from "../../components/home/StatesWidget";
import AlertsPanel from "../../components/home/AlertsPanel";
import VoltageWidget from "../../components/home/VoltageWidget";
import FuelWidget from "../../components/home/FuelWidget";
import TemperatureWidget from "../../components/home/TemperatureWidget";
import PressureWidget from "../../components/home/PressureWidget";

export default function HomePage() { 
    return (
        <div className='h-screen bg-[#111112] w-full '>
            <Header />

            <div className="flex h-full">
                <HealthIndex />

                <div className="flex flex-col gap-5 p-5 w-full">
                    <div className="flex gap-5">
                        <div className="flex-3">
                            <SpeedWidget />
                        </div>

                        <div className="flex-2 flex flex-col gap-4">
                            <SmallBarChart/>
                            <div className="flex-1">
                                <BreaksWidget />
                            </div>
                        </div>

                        <div className="flex-3">
                            <StatesWidget />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex-2 flex flex-col gap-4">
                            <FuelWidget/>
                            <div className="flex-1">
                                <FuelWidget />
                            </div>
                        </div>

                        <div className="flex-4">
                            <TemperatureWidget />
                        </div>

                          <div className="flex-3">
                            <PressureWidget />
                        </div>
                    </div>

                </div>
            

                <div className="ml-auto">
                    <AlertsPanel />
                </div>
            </div>
        </div>
    )   
};