import { type MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Marker } from "../assets/definition/lib";
import type { Book } from "../assets/definition/lib";

import slots from "../assets/data/slots.json";
import convertHoursMinutesToSlot from "../services/convertHoursMinutesToSlot";

export default function ModalStationBook({
  onClose,
  stationId,
  cost,
}: {
  onClose: MouseEventHandler;
  stationId: string;
  cost: number;
}) {
  const id = stationId;
  const id_book = stationId;

  const [findStation, setFindStation] = useState<Marker[]>();
  const [book, setBook] = useState<Book[]>();

  // slots reserved and valid after this moment
  const availableSlots = book?.map((b) => b.slot);

  // returns the index of the first slot of the moment (eg: index 22 => 11h)
  const slotNow = convertHoursMinutesToSlot();

  // time slots that will be available and displayed for booking
  const slotsToDisplay = slots.filter(
    (s) => s.slot > slotNow && !availableSlots?.includes(s.slot),
  );

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

  // loading book from database
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/book/${id_book}`)
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setBook(data);
        } else {
          toast.warning(
            "Oups ! Impossible d'afficher les stations de recharge...",
          );
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  }, [id_book]);

  // save in book database
  const handleClick = (slot_id: number) => {
    if (
      confirm(
        `Confirmez-vous votre reservation pour aujourd'hui à ${slots[slot_id].label} ?`,
      )
    ) {
      fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/book`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user_id: 2,
          station_id: stationId,
          slot: slot_id,
        }),
      })
        .then((response) => response.json())
        .then((data: Book[]) => {
          if (data !== null) {
            toast.success("Votre reservation et enregistré ");
          } else {
            toast.warning(
              "Oups ! Impossible d'enregistrer votre réservation...",
            );
          }
        })
        .catch((error) =>
          toast.error("Oups ! Une erreur s'est produite", error),
        );
    }
  };

  console.info("Book : ", book);

  return (
    <div className="w-full flex flex-col shadow-md bg-gray-50 border border-gray-600 rounded-lg absolute lg:w-[360px] lg:top-[30%] top-[20%] lg:left-10 lg:bottom-10 bottom-1 z-[3000]">
      <div className="m-2">
        <h1 className="font-paragraph lg:text-xl ">{findStation?.[0].name}</h1>
        <h2 className="">{findStation?.[0].address}</h2>
        <hr />
        <h2>Puissance de charge :</h2>
        <ul>
          {findStation?.map((m) => (
            <li className="flex flex-row" key={m.power}>
              {" "}
              {m.power} Kwh (x{m.nb_power})
            </li>
          ))}
        </ul>
      </div>
      <div className="m-1  bottom-12 overflow-auto">
        <h2 className="font-paragraph text-sm">
          Coût de la reservation (limitée à 30mn) :{" "}
          <span className="bg-accentColor text-white text-base">
            {(cost && cost) || 15} €
          </span>
        </h2>
        <h2>Créneaux de reservation :</h2>
        <hr />
        {slotsToDisplay.length > 0 ? (
          slotsToDisplay?.map((s) => (
            <button
              className="bg-gray-500 text-white px-1 py-1 rounded m-1  focus:bg-lime-400 focus:text-black"
              key={s.slot}
              type="button"
              onClick={() => handleClick(s.slot)}
            >
              {" "}
              {s.label}
            </button>
          ))
        ) : (
          <h1 className="font-paragraph lg:text-base text-red-600">
            Désole ! Aucun créneau disponible ...
          </h1>
        )}
      </div>
      <div className="flex items-center justify-center absolute inset-x-0 bottom-2">
        <button
          type="button"
          className="bg-accentColor text-white px-2 py-1 rounded m-2"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
