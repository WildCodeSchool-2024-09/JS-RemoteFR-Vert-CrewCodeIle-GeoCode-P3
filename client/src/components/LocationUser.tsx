import L from "leaflet";
import { useEffect, useState } from "react";
import { CircleMarker, Marker, Tooltip, useMap } from "react-leaflet";
import type { searchApi } from "../types/searchApi";

export default function LocationUser({
  selectedPosition,
}: { selectedPosition: searchApi }) {
  // Default position
  const defaultPosition: searchApi = {
    geometry: {
      coordinates: [48.8566, 2.3522],
    },
    properties: {
      label: "Recherche de position en cours",
    },
  };

  const [position, setPosition] = useState<searchApi>(defaultPosition);

  const map = useMap();

  const LeafIcon = L.Icon.extend({
    options: {
      iconUrl: "../icons8-voiture-64.png",
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -42],
    },
  });
  const carIcon = new LeafIcon();

  // GPS or automatic position of the web browser
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 13,
    });
    map.on("locationfound", (e) => {
      const positionFound: searchApi = {
        geometry: {
          coordinates: [e.latlng.lat, e.latlng.lng],
        },
        properties: {
          label: "Ma position",
        },
      };
      setPosition(positionFound);
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedPosition !== null) {
      map.flyTo(
        [
          selectedPosition.geometry.coordinates[1],
          selectedPosition.geometry.coordinates[0],
        ],
        14,
      );
      const positionPut: searchApi = {
        geometry: {
          coordinates: [
            selectedPosition.geometry.coordinates[1],
            selectedPosition.geometry.coordinates[0],
          ],
        },
        properties: {
          label: selectedPosition.properties.label,
        },
      };
      setPosition(positionPut);
    }
  }, [selectedPosition]);
  //[latitude, longitude]

  return (
    <Marker
      position={[
        position.geometry.coordinates[0],
        position.geometry.coordinates[1],
      ]}
      icon={carIcon}
    >
      <CircleMarker
        center={[
          position.geometry.coordinates[0],
          position.geometry.coordinates[1],
        ]}
        pathOptions={{ color: "purple", opacity: 0.4 }}
        radius={40}
      />
      <Tooltip direction="top" offset={[0, -45]} opacity={1}>
        <>
          <b>Vous êtes ici</b> : {position.properties.label}
        </>
      </Tooltip>
    </Marker>
  );
}
