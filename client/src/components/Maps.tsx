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
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { toast } from "react-toastify";
import type { ContactModaleProps } from "../assets/definition/lib";
import type { searchApi } from "../assets/definition/lib";
import type { Station } from "../assets/definition/lib";
import LocationUser from "./LocationUser";
import ModaleContact from "./ModaleContact";

/**
 *
 * @param {object} selectedPosition:
 * coordinates ​​of the user selected position or the default position at map startup
 * @param {boolean} showContactModale and @param {function}setShowContactModale:
 * - values and function to child element "ModalContact"
 * @returns
 *
 * --
 */
export default function Maps({
  showContactModale,
  setShowContactModale,
  selectedPosition,
}: {
  showContactModale: boolean;
  selectedPosition: searchApi;

  setShowContactModale: ContactModaleProps["setShowContactModale"];
}) {
  // default map centering position
  const position = { lat: 48.8566, lng: 2.3522 };
  const [stations, setStations] = useState<Station[]>();

  // loading stations from database
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stations`)
      .then((response) => response.json())
      .then((data: Station[]) => {
        if (data.length > 0) {
          setStations(data);
        } else {
          toast.warning(
            "Oups ! Impossible d'afficher les stations de recharge...",
          );
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  }, []);

  return (
    <>
      <MapContainer center={position} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {stations?.map((s) => (
            <Marker position={[s.latitude, s.longitude]} key={s.id}>
              <Popup>
                Station : {s.name}
                <br />
                Adresse : {s.adress}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <LocationUser selectedPosition={selectedPosition} />
      </MapContainer>
      <ModaleContact
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
      />
    </>
  );
}
