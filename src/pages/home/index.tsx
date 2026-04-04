import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";
import SmallBarChart from "../../components/home/SmallBarChart";
import SpeedWidget from "../../components/home/SpeedWidget";
import BreaksWidget from "../../components/home/BreaksWidget";
import StatesWidget from "../../components/home/StatesWidget";
import AlertsPanel from "../../components/home/AlertsPanel";
import VoltageWidget from "../../components/home/VoltageWidget";
import TrendsWidget from "../../components/home/TrendsWidget";
import HistoryBar from "../../components/home/HistoryBar";
import FuelWidget from "../../components/home/FuelWidget";
import TemperatureWidget from "../../components/home/TemperatureWidget";
import PressureWidget from "../../components/home/PressureWidget";
import Map from "../../components/home/Map";
import LocomotiveMap from "../../components/home/Map/LocomotiveMap";
import RouteWidget from "../../components/home/Map/RouteWidget";

export default function HomePage() {
  return (
    <div className="h-screen bg-[#111112] w-full flex flex-col overflow-hidden ">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <HealthIndex />

        <div className="flex flex-col gap-5 p-5 w-full overflow-y-auto pb-24">
          <div className="flex gap-5">
            <div className="flex-3">
              <SpeedWidget />
            </div>

            <div className="flex-2 flex flex-col gap-4">
              <SmallBarChart />
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
              <FuelWidget />
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

          <div className="flex ">
            <div className="flex-1">
              <VoltageWidget />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <LocomotiveMap />
            </div>
            <div className="flex-1">
              <RouteWidget />
            </div>
          </div>

          <div className="flex">
            <div className="flex-1">
              {" "}
              <TrendsWidget />{" "}
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <AlertsPanel />
        </div>
      </div>

      <HistoryBar />
    </div>
  );
}
