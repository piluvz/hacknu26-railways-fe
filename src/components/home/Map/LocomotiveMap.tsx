// @ts-nocheck
import { MapContainer, TileLayer, Polyline, Marker, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Custom Marker Icon for Destination
// const destIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//   iconSize: [30, 30],
// });
const UNTRAVELETED_ROUTE = [
  [51.1605, 71.4704], // Astana - Final Destination
  [50.8000, 71.9000],
  [50.5000, 72.3000],
  [50.2000, 72.8000], // Near Temirtau
  [49.8064, 73.0855],
];

const TRAVELETED_ROUTE = [
  [49.8064, 73.0855], // Karaganda
  [49.4000, 74.0000],
  [49.0000, 75.0000], // First
]


export const LocomotiveMap = () => {
    const traveledOptions = {  weight: 6, color: '#3C96F6' }
    const untraveledOptions = { dashArray: '5, 10', weight: 6, fillColor: '#3C96F6' }

    const position = [49.8064, 73.0855];

    return (
        // <div style={{ height: "300px" }}>
            <MapContainer center={position} zoom={7.2} scrollWheelZoom={true}  style={{ height: "270px", width: "460px", borderRadius: 16 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Polyline pathOptions={traveledOptions} positions={TRAVELETED_ROUTE} />
                    <Polyline pathOptions={untraveledOptions} positions={UNTRAVELETED_ROUTE} />

                    <CircleMarker 
                        center={position} 
                        pathOptions={{ color: '#49C86E', fillColor: '#49C86E', fillOpacity: 1 }}
                        radius={7}
                    />
            

                    <CircleMarker 
                        center={position} 
                        pathOptions={{ color: '#49C86E75', fillColor: '#49C86E75', fillOpacity: 1 }}
                        radius={15}
                    />

                    <Marker position={[51.1605, 71.4704]} />
                    
            </MapContainer>
        // </div>
    );
};