/**
 * install packages leaflet from the folder "client" :
 * "react-leaflet";
 * "react-leaflet-cluster";
 * "react-leaflet@next"
 * AND "npm i -D @types/leaflet"
 * --------------------------------------------------
 *
 * This component displays the OSM map (full screen mode)
 * with an arbitrary position and with certain markers (charging stations).
 *
 */

import "../index.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import charchingPoints from "../assets/data/chargingPointsCars.json";
import type { chargingPointsType } from "../assets/definition/chargingPointsType";

const pointsMarkers: chargingPointsType[] = charchingPoints;

const position = { lat: 48.8566, lng: 2.3522 };

console.info("Point cooordonees", pointsMarkers);

export default function Maps() {
  return (
    <>
      <MapContainer center={position} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {pointsMarkers?.map((p) => (
            <Marker position={[p.latitude, p.longitude]} key={p.id} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}
