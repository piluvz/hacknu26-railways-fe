// @ts-nocheck
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useData } from "../../../context/DataContext";

// Custom Marker Icon for Destination
// const destIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//   iconSize: [30, 30],
// });
// const UNTRAVELETED_ROUTE = [
//   [51.1605, 71.4704], // Astana - Final Destination
//   [50.8, 71.9],
//   [50.5, 72.3],
//   [50.2, 72.8], // Near Temirtau
//   [49.8064, 73.0855],
// ];

// const TRAVELETED_ROUTE = [
//   [49.8064, 73.0855], // Karaganda
//   [49.4, 74.0],
//   [49.0, 75.0], // First
// ];

export default function LocomotiveMap() {
  const { data } = useData();
  const position = [data.route_info.current.latitude, data.route_info.current.longitude ];  //[49.8064, 73.0855];

  const totalRoute = data.route_info.stops.map(s => [ s.latitude, s.longitude ]);
  // const untraveledRoute = [ position, ...data.route_info.stops.filter(s => s.status === "впереди").map(s => [ s.latitude, s.longitude ]) ];
  // const traveledRoute = data.route_info.stops.filter(s => s.status === "пройдено").map(s => [ s.latitude, s.longitude ]);

  const destination = totalRoute[totalRoute.length - 1];

  const traveledOptions = { weight: 6, color: "#3C96F6" };
  // const untraveledOptions = {
  //   dashArray: "5, 10",
  //   weight: 6,
  //   fillColor: "#3C96F6",
  // };

  return (
    <MapContainer
      center={position}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "270px", width: "100%", borderRadius: 16, zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={traveledOptions} positions={totalRoute} />
      {/* <Polyline pathOptions={traveledOptions} positions={traveledRoute} />
      <Polyline
        pathOptions={untraveledOptions}
        positions={untraveledRoute}
      /> */}

      <CircleMarker
        center={position}
        pathOptions={{ color: "#49C86E", fillColor: "#49C86E", fillOpacity: 1 }}
        radius={7}
      />

      <CircleMarker
        center={position}
        pathOptions={{
          color: "#49C86E75",
          fillColor: "#49C86E75",
          fillOpacity: 1,
        }}
        radius={15}
      />

      <Marker position={destination} />
    </MapContainer>
  );
}
