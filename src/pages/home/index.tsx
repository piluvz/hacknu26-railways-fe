import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";
import SmallBarChart from "../../components/home/SmallBarChart";
import SpeedWidget from "../../components/home/SpeedWidget";
import BreaksWidget from "../../components/home/BreaksWidget";

export default function HomePage() { 
    return (
        <div className='h-screen bg-[#111112] w-full '>
            <Header />

            <div className="flex h-full">
                <HealthIndex />

                <div className="ml-8 mr-5 py-6 w-[300px]">
                    <SpeedWidget />
                </div>

                <div className="py-6 w-[260px] flex flex-col gap-4">
                    <SmallBarChart/>
                    <BreaksWidget />
                </div>
               
            </div>

            

        </div>
    )   
};