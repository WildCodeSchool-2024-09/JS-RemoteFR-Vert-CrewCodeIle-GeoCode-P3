import { type MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { MarkerType } from "../assets/definition/lib";
import ShowInfoStation from "./ShowInfoStation";

export default function ModalStationInfo({
  onClose,
  onBook,
  stationId,
  distance,
}: {
  onClose: MouseEventHandler;
  onBook: MouseEventHandler;
  stationId: string;
  distance: number;
}) {
  const [findStation, setFindStation] = useState<MarkerType[]>();
  const id = stationId;

  // retrieving information from the selected station
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/${id}`)
      .then((response) => response.json())
      .then((data: MarkerType[]) => {
        if (data !== null) {
          setFindStation(data);
        } else {
          toast.warning(
            "Oups ! Impossible d'afficher les stations de recharge...",
          );
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  }, [id]);

  return (
    <div className="w-full flex flex-col justify-between bg-gray-50 border border-gray-600 rounded-lg absolute lg:w-[360px] lg:left-10 lg:bottom-10 bottom-0 z-[3000] overflow-hidden text-ellipsis">
      {/* display station information here */}
      <ShowInfoStation findStation={findStation} distance={distance} />

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-interestColor 1 font-bold  text-white px-8 py-2 rounded-3xl m-4"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="button"
          className="bg-interestColor 1 font-bold  text-white px-8 py-2 rounded-3xl m-4"
          onClick={onBook}
        >
          Reserver
        </button>
      </div>
    </div>
  );
}
