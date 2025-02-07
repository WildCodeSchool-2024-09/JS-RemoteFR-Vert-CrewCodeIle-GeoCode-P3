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
import L from "leaflet";
import { type SetStateAction, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { toast } from "react-toastify";
import type { Station } from "../assets/definition/lib";
import type { ContactModaleProps } from "../assets/definition/lib";
import type { searchApi } from "../assets/definition/lib";
import LocationUser from "./LocationUser";
import ModalStationBook from "./ModalStationBook";
import ModalStationInfo from "./ModalStationInfo";
import ModaleContact from "./ModaleContact";

import MarkerClusterGroup from "react-leaflet-cluster";
import type { latlng } from "../assets/definition/lib";
import { useAuth } from "../context/userContext";
import distanceTo from "../services/distanceTo";

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
  const { userInfo } = useAuth();
  const userId = userInfo?.email;

  // default map centering position
  const position = { lat: 48.8566, lng: 2.3522 };
  const [stations, setStations] = useState<Station[]>();
  const [markerPos, setMarkerPos] = useState<latlng>(position);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);
  const [showMarkerBook, setShowMarkerBook] = useState(false);
  const [stationId, setStationId] = useState("");

  const price = 15;

  const latA = selectedPosition.geometry.coordinates[1];
  const lngA = selectedPosition.geometry.coordinates[0];
  const latB = markerPos.lat;
  const lngB = markerPos.lng;

  // calculate the distance between the user's position and the selected station
  const dist = distanceTo(latA, lngA, latB, lngB);
  const distance = Number.parseFloat(dist);

  const launch = () => {
    if (userInfo) {
      setShowMarkerInfo(false);
      setShowMarkerBook(true);
    } else {
      alert("Vous devez être connecte pour pouvoir reserver");
    }
  };

  const handleClick = useCallback(
    (e: {
      latlng: { lat: number; lng: number };
      target: {
        options: { children: SetStateAction<string> };
      };
    }) => {
      setMarkerPos(e.latlng);
      setStationId(e.target.options.children);
      setShowMarkerInfo(true);
    },
    [],
  );

  // custom station icon
  const LeafIcon = L.Icon.extend({
    options: {
      iconUrl: "./src/assets/images/chargingPoint.png",
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -42],
    },
  });
  const stationIcon = new LeafIcon();

  // loading stations from database
  useEffect(() => {
    toast.loading("Chargement des points de charge...");
    fetch(`${import.meta.env.VITE_API_URL}/api/stations`)
      .then((response) => response.json())
      .then((data: Station[]) => {
        if (data.length > 0) {
          setStations(data);
          toast.dismiss();
        } else {
          toast.warning(
            "Oups ! Impossible d'afficher les stations de recharge...",
          );
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  }, []);

  // loading book_cost
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/cost`)
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          // ajout setcost
        } else {
          toast.warning(
            "Oups ! Impossible de récupérer le prix de la recharge",
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
            <Marker
              position={[s.latitude, s.longitude]}
              key={s.id_station}
              icon={stationIcon}
              eventHandlers={{ click: handleClick }}
            >
              {s.id_station}
            </Marker>
          ))}
          {/*display station information after clicking on marker */}
          {showMarkerInfo &&
            createPortal(
              <ModalStationInfo
                onClose={() => setShowMarkerInfo(false)}
                onBook={() => launch()}
                stationId={stationId}
                distance={distance}
              />,
              document.body,
            )}
          {/*display station reservation information*/}
          {showMarkerBook &&
            createPortal(
              <ModalStationBook
                onClose={() => setShowMarkerBook(false)}
                stationId={stationId}
                cost={price}
                distance={distance}
                userId={userId}
              />,
              document.body,
            )}
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
