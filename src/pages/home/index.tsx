import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
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
import LocomotiveMap from "../../components/home/Map/LocomotiveMap";
import RouteWidget from "../../components/home/Map/RouteWidget";
import CurrentWidget from "../../components/home/CurrentWidget";
import { useData } from "../../context/DataContext";
import { useHistory } from "../../context/HistoryContext";
import { useEffect } from "react";

export default function HomePage() {
  const { c } = useTheme();
  const { role, trainId, selectedTrainId, setSelectedTrainId } = useAuth();
  const { setData } = useData();
  const { distanceSelected } = useHistory();

  useEffect(() => {
    if (distanceSelected === null) return;
    const id = role === "dispatcher" ? selectedTrainId : trainId;

    ( async () => {
      const response = await fetch(`http://localhost:8000/api/historic/telemetry/${id}?distance=${distanceSelected}`, {
        method: "GET",
        headers: {
          "Accept": "application/json", 
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `` 
        }
      });

      if (!response.ok) {
        return;
      }

      console.log(response);
    })()
  }, [ distanceSelected ]);

  const DISPATCHER_TRAINS = ["TE33A-L006", "TE33A-L007", "TE33A-L008", "TE33A-L009"];

  if (role === "dispatcher" && !selectedTrainId) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-6" style={{ backgroundColor: c.pageBg, color: c.text }}>
        <div className="text-3xl font-bold">Выберите локомотив</div>
        <p className="text-sm opacity-50">Для просмотра данных выберите локомотив из списка</p>
        <select
          value={selectedTrainId}
          onChange={(e) => setSelectedTrainId(e.target.value)}
          className="border rounded-xl px-6 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer min-w-[240px]"
          style={{ borderColor: c.border, color: c.text, backgroundColor: c.widgetBg }}
        >
          <option value="" disabled>Выбрать локомотив</option>
          {DISPATCHER_TRAINS.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: c.pageBg }}>
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <HealthIndex />

        <div id="main-scroll" className="flex flex-col gap-5 p-5 w-full overflow-y-auto pb-24">
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
                        <div className="flex-3 flex flex-col gap-4">
                            <FuelWidget/>
                            <div className="flex-1">
                                <CurrentWidget />
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

        <div className="ml-auto h-full">
          <AlertsPanel />
        </div>
      </div>

      <HistoryBar />
    </div>
  );
}
