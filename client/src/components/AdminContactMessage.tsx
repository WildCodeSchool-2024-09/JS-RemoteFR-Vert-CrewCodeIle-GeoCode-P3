import data from "../assets/data/adminContact.json";

import type { ContactFormProps } from "../assets/definition/lib";

export default function ContactMessages({
  handleSwitchIsTreated,
  isContactMessagesModale,
  isConfirmDeleteModale,
  setIsConfirmDeleteModale,
  actualMessage,
}: {
  handleSwitchIsTreated: (id: number) => void;
  isContactMessagesModale: boolean;
  isConfirmDeleteModale: boolean;
  setIsConfirmDeleteModale: (bool: boolean) => void;
  actualMessage: ContactFormProps | null;
}) {
  // If screen is larger than 1024 px the modale is off
  if (window.innerWidth < 1024) {
    if (!isContactMessagesModale) return;
  }
  // If the admin didn't click on a user in the admin message list nothing append
  if (!actualMessage) {
    return;
  }

  // Format the date
  const formatedDate = actualMessage?.date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  const getDate = actualMessage && new Date(actualMessage?.date);
  const getHour = getDate?.getHours().toString();
  const getMin = getDate?.getMinutes().toString().padStart(2, "0");
  const formatedHours = `${getHour}h${getMin}min`;

  return (
    <>
      <section className="w-full grid grid-cols-3 h-[90vh] p-2 gap-1 md:h-fit lg:w-[45vw] lg:border-4 lg:border-darkColor lg:absolute lg:right-6 lg:px-4 lg:pb-4 xl:h-fit 2xl:w-[48vw]">
        <h2
          className={
            "hidden text-2xl text-center mb-2 font-title text-darkColor mt-4 col-span-3 lg:inline lg:text-4xl"
          }
        >
          {data.detailMessage}
        </h2>
        <p className="col-span-3 font-paragraph text-darkColor text-sm mb-4">
          {data.sendAt} {formatedDate} à {formatedHours}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          <strong>{data.user}</strong> {actualMessage?.firstname}{" "}
          {actualMessage?.lastname}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          <strong>{data.isTreated} :</strong>
          <button
            type="button"
            className={`font-paragraph ml-2 w-1/3 text-darkColor border-solid border-2 rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor
            h-8 ${actualMessage?.is_treated === 1 ? "border-green-600" : "border-orange-500"}`}
            onClick={() => {
              if (actualMessage?.id) handleSwitchIsTreated(actualMessage.id);
            }}
          >
            {actualMessage?.is_treated === 1 ? (
              <p className="text-green-600">{data.treated}</p>
            ) : (
              <p className="text-orange-500">{data.notTreated}</p>
            )}
          </button>
          {actualMessage?.is_treated === 1 && (
            <button
              type="button"
              className="h-8 w-1/3 ml-2 font-paragraph border-solid border-2 text-warningColor border-warningColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor"
              onClick={() => setIsConfirmDeleteModale(true)}
            >
              {data.deleteButton}
            </button>
          )}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          <strong>{data.userEmail} </strong>
          {actualMessage?.email}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          <strong>{data.userSubject} </strong>
          {actualMessage?.subject}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          <strong>{data.userMessage}</strong>
        </p>
        <p
          className={`overflow-y-auto break-words col-span-3 h-48 font-paragraph text-paragraph text-sm w-full bg-gray-50 p-1 vsm:h-80 vmd:h-96 lg:h-64 2xl:h-[60vh] ${
            !isConfirmDeleteModale
              ? "opacity-100 bg-gray-50"
              : "bg-opacity-30 pointer-events-none bg-black"
          }`}
        >
          {actualMessage?.message}
        </p>
      </section>
    </>
  );
}
