import { createContext, useContext, useState, ReactNode } from "react";

// const MOCK_JSON = {
//   "time": "2026-04-04T22:49:43+00:00",
//   "train_id": "TE33A-L006",
//   "health": {"score": 100, "category": "норма"},
//   "alert_count": 0,
//   "top_impacts": [
//       {"metric": "speed", "status": "норма", "impact": 80},
//       {"metric": "speed", "status": "норма", "impact": 80},
//       {"metric": "speed", "status": "норма", "impact": 80},
//       {"metric": "speed", "status": "норма", "impact": 80},
//       {"metric": "speed", "status": "норма", "impact": 80}, 
// ],
//   "params": {
//     "speed": {
//       "max": 200,
//       "min": 0,
//       "unit": "км/ч",
//       "range": "норма",
//       "value": 57.65,
//       "status": "норма",
//       "range_label": "Нормальная скорость",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "temp_air": {
//       "max": 200,
//       "min": -20,
//       "unit": "°C",
//       "range": "cold",
//       "value": 18.5,
//       "status": "норма",
//       "range_label": "Холодный воздух",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "temp_oil": {
//       "max": 150,
//       "min": 0,
//       "unit": "°C",
//       "range": "норма",
//       "value": 75.6,
//       "status": "норма",
//       "range_label": "Рабочая температура",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "temp_motor": {
//       "max": 200,
//       "min": 0,
//       "unit": "°C",
//       "range": "норма",
//       "value": 62.4,
//       "status": "норма",
//       "range_label": "Рабочая температура",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "brake_force": {
//       "max": 1000,
//       "min": 0,
//       "unit": "кПа",
//       "range": "released",
//       "value": 0.0,
//       "status": "норма",
//       "range_label": "Отпущены",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "fuel_liters": {
//       "max": 1500,
//       "min": 0,
//       "unit": "л",
//       "range": "норма",
//       "value": 962.1,
//       "status": "норма",
//       "range_label": "В норме",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "pressure_air": {
//       "max": 3.0,
//       "min": 0,
//       "unit": "бар",
//       "range": "норма",
//       "value": 0.83,
//       "status": "норма",
//       "range_label": "Нормальное давление",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "pressure_oil": {
//       "max": 7.0,
//       "min": 0,
//       "unit": "бар",
//       "range": "норма",
//       "value": 6.52,
//       "status": "норма",
//       "range_label": "Нормальное давление",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "current_ampere": {
//       "max": 2000,
//       "min": 0,
//       "unit": "А",
//       "range": "норма",
//       "value": 710.0,
//       "status": "норма",
//       "range_label": "В норме",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "pressure_brake": {
//       "max": 9.0,
//       "min": 0,
//       "unit": "бар",
//       "range": "норма",
//       "value": 6.88,
//       "status": "норма",
//       "range_label": "Нормальное давление",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "tractive_force": {
//       "max": 300,
//       "min": 0,
//       "unit": "кН",
//       "range": "норма",
//       "value": 175.6,
//       "status": "норма",
//       "range_label": "В норме",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "temp_converters": {
//       "max": 200,
//       "min": 0,
//       "unit": "°C",
//       "range": "cold",
//       "value": 39.4,
//       "status": "норма",
//       "range_label": "Холодные преобразователи",
//       "alert_message": "",
//       "recommendation": ""
//     },
//     "pressure_main_tank": {
//       "max": 9.0,
//       "min": 0,
//       "unit": "бар",
//       "range": "норма",
//       "value": 6.71,
//       "status": "норма",
//       "range_label": "Нормальное давление",
//       "alert_message": "",
//       "recommendation": ""
//     }
//   },
//   "route": {
//     "route_name": "Астана - Қарағанды - Алматы",
//     "total_distance_km": 1211,
//     "current_position_km": 439.59,
//     "current": {
//       "latitude": 48.299961,
//       "longitude": 73.948538
//     },
//     "stops": [
//       {
//         "name": "Астана",
//         "status": "пройдено",
//         "latitude": 51.1811,
//         "longitude": 71.446,
//         "distance_km": 0
//       },
// {
//         "name": "Қарағанды",
//         "status": "пройдено",
//         "latitude": 49.8047,
//         "longitude": 73.0884,
//         "distance_km": 211
//       },
//       {
//         "name": "Алматы",
//         "status": "впереди",
//         "latitude": 43.222,
//         "longitude": 76.8512,
//         "distance_km": 1211
//       }
//     ]
//   }
// };

interface TelemetryData {
  time: string;
  train_id: string;
  health_score: number;
  health_category: "норма" | "предупреждение" | "критично";
  alert_count: number;
  top_impacts: [
      { metric: string; status: "норма" | "предупреждение" | "критично"; impact: number; },
      { metric: string; status: "норма" | "предупреждение" | "критично"; impact: number; },
      { metric: string; status: "норма" | "предупреждение" | "критично"; impact: number; },
      { metric: string; status: "норма" | "предупреждение" | "критично"; impact: number; },
      { metric: string; status: "норма" | "предупреждение" | "критично"; impact: number; }, 
],
  params: {
    speed: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    temp_air: {
      max: number;
      min: number;
      unit: string;
      range: "cold",
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    temp_oil: {
      name: string;
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    temp_motor: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    brake_force: {
      max: number;
      min: number;
      unit: string;
      range: "released",
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    fuel_liters?: {
      name?: string;
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    energy_usage?: {
      name?: string;
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    pressure_air: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    pressure_oil: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    current_ampere: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    pressure_brake: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    tractive_force: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    temp_converters: {
      max: number;
      min: number;
      unit: string;
      range: "cold",
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    pressure_main_tank: {
      max: number;
      min: number;
      unit: string;
      range: string;
      value: number;
      status: "норма" | "предупреждение" | "критично";
      range_label: string;
      alert_message: string;
      recommendation: string;
      norm_min: number;
      norm_max: number;
    },
    system_condition: {
      name: string;
      value: {
        name: string;
        value: "норма" | "предупреждение" | "критично";
      }[];
    }
  },
  route_info: {
    route_name: string;
    total_distance_km: number;
    current_position_km: number;
    current: {
      latitude: number;
      longitude: number;
    },
    stops: [
        {
            name: string;
            status: "пройдено" | "впереди";
            latitude: number;
            longitude: number;
            distance_km: number;
        },
        {
            name: string;
            status: "пройдено" | "впереди";
            latitude: number;
            longitude: number;
            distance_km: number;
        },
        {
            name: string;
            status: "пройдено" | "впереди";
            latitude: number;
            longitude: number;
            distance_km: number;
        }
    ],
    info: {
      title: string;
      recommendation: string;
      distance_left_km: number;
      time_left: string;
      status: "норма" | "предупреждение" | "критично";
    },
    time_left: string
  }
}

const MOCK_JSON : TelemetryData = {
  time: "2026-04-04T22:49:43+00:00",
  train_id: "TE33A-L006",
  health_score: 67,
  health_category: "предупреждение",
  alert_count: 0,
  top_impacts: [
      { metric: "speed", status: "норма", impact: 80},
      { metric: "speed", status: "критично", impact: 80},
      { metric: "speed", status: "норма", impact: 20},
      { metric: "speed", status: "норма", impact: 40},
      { metric: "speed", status: "предупреждение", impact: 80}, 
  ],
  params: {
    speed: {
      max: 200,
      min: 0,
      unit: "км/ч",
      range: "норма",
      value: 57.65,
      status: "норма",
      range_label: "Нормальная скорость",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    temp_air: {
      max: 200,
      min: -20,
      unit: "°C",
      range: "cold",
      value: 18.5,
      status: "критично",
      range_label: "Холодный воздух",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    temp_oil: {
      name: "Температура масла",
      max: 150,
      min: 0,
      unit: "°C",
      range: "норма",
      value: 75.6,
      status: "норма",
      range_label: "Рабочая температура",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    temp_motor: {
      max: 200,
      min: 0,
      unit: "°C",
      range: "норма",
      value: 62.4,
      status: "предупреждение",
      range_label: "Рабочая температура",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    brake_force: {
      max: 1000,
      min: 0,
      unit: "кПа",
      range: "released",
      value: 0.0,
      status: "норма",
      range_label: "Отпущены",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    fuel_liters: {
      max: 1500,
      min: 0,
      unit: "л",
      range: "норма",
      value: 962.1,
      status: "норма",
      range_label: "В норме",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 1200
    },
    pressure_air: {
      max: 3.0,
      min: 0,
      unit: "бар",
      range: "норма",
      value: 0.83,
      status: "предупреждение",
      range_label: "Нормальное давление",
      alert_message: "",
      recommendation: "",
      norm_min: 0.2,
      norm_max: 2.8
    },
    pressure_oil: {
      max: 7.0,
      min: 0,
      unit: "бар",
      range: "норма",
      value: 6.52,
      status: "критично",
      range_label: "Нормальное давление",
      alert_message: "",
      recommendation: "",
      norm_min: 1.2,
      norm_max: 4.2
    },
    current_ampere: {
      max: 2000,
      min: 0,
      unit: "А",
      range: "норма",
      value: 710.0,
      status: "критично",
      range_label: "В норме",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    pressure_brake: {
      max: 9.0,
      min: 0,
      unit: "бар",
      range: "критично",
      value: 6.88,
      status: "норма",
      range_label: "Нормальное давление",
      alert_message: "",
      recommendation: "",
      norm_min: 0.5,
      norm_max: 6.7
    },
    tractive_force: {
      max: 300,
      min: 0,
      unit: "кН",
      range: "критично",
      value: 175.6,
      status: "норма",
      range_label: "В норме",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 210
    },
    temp_converters: {
      max: 200,
      min: 0,
      unit: "°C",
      range: "cold",
      value: 39.4,
      status: "норма",
      range_label: "Холодные преобразователи",
      alert_message: "",
      recommendation: "",
      norm_min: 10,
      norm_max: 50
    },
    pressure_main_tank: {
      max: 9.0,
      min: 0,
      unit: "бар",
      range: "норма",
      value: 6.71,
      status: "предупреждение",
      range_label: "Нормальное давление",
      alert_message: "",
      recommendation: "",
      norm_min: 2.5,
      norm_max: 8.6
    },
    system_condition: {
      name: "Состояние Узлов",
      value: [
        { name: "Давление тормозной магистрали", value: "норма" },
        { name: "Тяговое усилие", value: "критично" },
        { name: "Температура масла", value: "предупреждение" },
        { name: "Температура двигатель", value: "норма" },
        { name: "Температура воздуха", value: "норма" },
        { name: "Давление главного резервуара", value: "норма" }
      ]
    }
  },
  route_info: {
    route_name: "Астана - Қарағанды - Алматы",
    total_distance_km: 1211,
    current_position_km: 439.59,
    current: {
      latitude: 49.8047,
      longitude: 73.0884,
    },
    stops: [
      {
        name: "Астана",
        status: "пройдено",
        latitude: 51.1811,
        longitude: 71.446,
        distance_km: 0
      },
    {
        name: "Қарағанды",
        status: "пройдено",
        latitude: 49.8047,
        longitude: 73.0884,
        distance_km: 211
      },
      {
        name: "Алматы",
        status: "впереди",
        latitude: 43.222,
        longitude: 76.8512,
        distance_km: 1211
      }
    ],
    info: {
      title: "Жилая зона",
      recommendation: "Снизить скорость",
      distance_left_km: 30,
      time_left: "14 мин",
      status: "предупреждение"
    },
    time_left: "1ч 02мин",
  }
};


interface DataContextValue {
  data: TelemetryData;
  setData: React.Dispatch<React.SetStateAction<TelemetryData>>;
}

const DataContext = createContext<DataContextValue>({
  data: MOCK_JSON,
  setData: () => {}
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TelemetryData>(MOCK_JSON);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
