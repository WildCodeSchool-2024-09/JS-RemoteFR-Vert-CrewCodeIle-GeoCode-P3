/**
 * install packages leaflet from the folder "client" :
 * "react-leaflet";
 * "react-leaflet-cluster";
 * "react-leaflet@next"
 * AND "npm i -D @types/leaflet"
 */

import "./maps.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
//import MarkerClusterGroup from "react-leaflet-cluster";

// markers : simulation of charging stations
const markers = [
  {
    geocode: { lat: 48.86, lng: 2.3822 },
  },
  {
    geocode: { lat: 48.83, lng: 2.3562 },
  },
  {
    geocode: { lat: 48.885, lng: 2.34 },
  },
];

const position = { lat: 48.8566, lng: 2.3522 };

export default function Maps() {
  return (
    <>
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers?.map((pos, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Marker position={pos.geocode} key={index} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}
