import { type MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Marker } from "../assets/definition/lib";

export default function ModalStationInfo({
  onClose,
  onBook,
  stationId,
}: {
  onClose: MouseEventHandler;
  onBook: MouseEventHandler;
  stationId: string;
}) {
  const [findStation, setFindStation] = useState<Marker[]>();
  const id = stationId;

  // loading stations from database
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/${id}`)
      .then((response) => response.json())
      .then((data: Marker[]) => {
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
    <div className="w-full flex flex-col shadow-md bg-gray-50 border border-gray-600 rounded-lg absolute lg:w-[360px] top-[40%] lg:left-10 lg:bottom-10 bottom-20 z-[3000]">
      <div className="m-10">
        <h1 className="lg:font-paragraph lg:text-2xl ">
          {findStation?.[0].name}
        </h1>
        <h2 className="">{findStation?.[0].address}</h2>
        <br />
        <h2>Puissance de charge :</h2>
        <ul>
          {findStation?.map((m) => (
            <li key={m.power}>
              {" "}
              {m.power} Kwh (x{m.nb_power})
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row justify-center absolute inset-x-0 bottom-2 ">
        <button
          type="button"
          className="bg-accentColor text-white px-2 py-1 rounded m-2"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="button"
          className="bg-accentColor text-white px-2 py-1 rounded m-2"
          onClick={onBook}
        >
          Reserver
        </button>
      </div>
    </div>
  );
}
