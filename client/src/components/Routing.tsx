import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Routing = ({
  startPoint,
  endPoint,
}: { startPoint: number[]; endPoint: number[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (startPoint != null && endPoint != null) {
      // Create a routing control and add it to the map
      const routingControl = L.Routing.control({
        // @ts-ignore
        createMarker: () => null,
        waypoints: [
          L.latLng(startPoint[0], startPoint[1]),
          L.latLng(endPoint[0], endPoint[1]),
        ],

        routeWhileDragging: false,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: "#0000FF", weight: 5 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        show: false,
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [map, startPoint, endPoint]);

  return null;
};

export default Routing;
