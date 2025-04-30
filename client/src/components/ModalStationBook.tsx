import { type MouseEventHandler, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import type { MarkerType } from "../assets/definition/lib";
import type { Book } from "../assets/definition/lib";
import type { slotsType } from "../assets/definition/lib";
import convertHoursMinutesToSlot from "../services/convertHoursMinutesToSlot";
import generateSlots from "../services/generateSlots";
import ModalConfirm from "./ModalConfirm";
import ShowInfoStation from "./ShowInfoStation";

export default function ModalStationBook({
  onClose,
  stationId,
  cost,
  distance,
  userId,
}: {
  onClose: MouseEventHandler;
  stationId: string;
  cost: number;
  distance: number;
  userId: string | undefined;
}) {
  const id = stationId;
  const id_book = stationId;
  const TIME_SLOT_DEFAULT = 30;

  const [findStation, setFindStation] = useState<MarkerType[]>();
  const [book, setBook] = useState<Book[]>();
  const [openModal, setOpenModal] = useState(false);
  const [choiceSlot, setChoiceSlot] = useState(0);
  const [reload, setReload] = useState(false);

  // slots reserved and valid after this moment
  const availableSlots = book?.map((b) => b.slot);

  // returns the index of the first slot of the moment
  const slotNow = convertHoursMinutesToSlot(TIME_SLOT_DEFAULT);

  // definition of the duration of each slot (in minutes)
  const slots: slotsType[] = generateSlots(TIME_SLOT_DEFAULT);

  // time slots that will be available and displayed for booking
  const slotsToDisplay = slots.filter(
    (s) => s.slot > slotNow && !availableSlots?.includes(s.slot),
  );

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

  // loading book from database
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/book/${id_book}`)
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setBook(data);
          if (!reload) {
            //refresh the display of slots after a new reservation in the modal
            setReload(true);
          } else {
            setReload(false);
          }
        } else {
          toast.warning(
            "Oups ! Impossible d'afficher les stations de recharge...",
          );
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  }, [id_book, reload]);

  const handleClickBook = (slot_id: number) => {
    setChoiceSlot(slot_id);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  // save in book database
  const handleClickConfirm = (choiceSlot: number) => {
    setOpenModal(false);
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/marker/book`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        station_id: stationId,
        slot: choiceSlot,
        slotDuration: TIME_SLOT_DEFAULT,
      }),
    })
      .then((response) => response.json())
      .then((data: Book[]) => {
        if (data !== null) {
          toast.success("Votre reservation est bien enregistrée ");
        } else {
          toast.warning("Oups ! Impossible d'enregistrer votre réservation...");
        }
      })
      .catch((error) => toast.error("Oups ! Une erreur s'est produite", error));
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between shadow-md bg-gray-50 border border-gray-600 rounded-lg absolute lg:w-[360px] lg:top-[40%] top-[20%] lg:left-10 lg:bottom-10 bottom-0 z-[3000] overflow-hidden text-ellipsis">
        {/* display station information here */}
        <ShowInfoStation findStation={findStation} distance={distance} />

        <div className="m-1  bottom-12 overflow-auto">
          <h2 className="font-paragraph text-sm">
            {`Coût de la reservation (limitée à ${TIME_SLOT_DEFAULT}mn) `}:{" "}
            <span className="bg-accentColor text-white text-base">
              {(cost && cost) || 15} €
            </span>
          </h2>
          <h2>Créneaux de reservation :</h2>
          <hr />
          {slotsToDisplay.length > 0 ? (
            slotsToDisplay?.map((s) => (
              <button
                className="bg-transparent border-2 border-gray-600 text-black px-1 py-1 rounded m-1  focus:bg-accentColor focus:text-white"
                key={s.slot}
                type="button"
                onClick={() => {
                  setOpenModal(true);
                  handleClickBook(s.slot);
                }}
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
        <div className="flex justify-center">
          <button
            type="button"
            className=" bg-interestColor font-bold  text-white px-8 py-2 rounded-3xl m-4"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
      {openModal &&
        createPortal(
          <ModalConfirm
            onClose={handleClose}
            confirm={() => handleClickConfirm(choiceSlot)}
            slot={slots[choiceSlot].label}
          />,
          document.body,
        )}
    </>
  );
}
