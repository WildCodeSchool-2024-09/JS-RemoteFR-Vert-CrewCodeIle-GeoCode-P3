/**
 * install packages leaflet from the folder "client" :
 * "react-leaflet";
 * "react-leaflet-cluster";
 * "react-leaflet@next"
 * AND "npm i -D @types/leaflet"
 * --------------------------------------------------
 *
 * This component displays the OSM map (full screen mode)
 *
 */

import "../index.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import type { searchApi } from "../types/searchApi";
import LocationUser from "./LocationUser";
import "../index.css";

const position = { lat: 48.8566, lng: 2.3522 };

export default function Maps({
  selectedPosition,
}: { selectedPosition: searchApi }) {
  return (
    <>
      <MapContainer center={position} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationUser selectedPosition={selectedPosition} />
      </MapContainer>
    </>
  );
}
