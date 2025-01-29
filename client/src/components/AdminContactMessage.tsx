import data from "../assets/data/adminContact.json";

import type { ContactFormProps } from "../assets/definition/lib";

export default function ContactMessages({
  isContactMessagesOpen,
  actualMessage,
}: {
  isContactMessagesOpen: boolean;
  actualMessage: ContactFormProps | null;
}) {
  if (!isContactMessagesOpen) return;

  // Format the date
  const getDate = actualMessage && new Date(actualMessage?.date);
  const getYear = getDate?.getFullYear();
  const getMonth =
    getDate && (getDate?.getMonth() + 1).toString().padStart(2, "0");
  const getDay = getDate?.getDate().toString().padStart(2, "0");
  const getHour = getDate?.getHours().toString();
  const getMin = getDate?.getMinutes().toString().padStart(2, "0");
  const formatedDate = `${getDay}/${getMonth}/${getYear}`;
  const formatedHours = `${getHour}h${getMin}min`;

  return (
    <>
      <article className="w-full grid grid-cols-3 p-2  gap-1">
        <p className="col-span-3 font-paragraph text-darkColor text-sm mb-4">
          {data.sendAt} {formatedDate} à {formatedHours}
        </p>
        <h3 className="col-span-3 font-paragraph text-darkColor text-lg">
          {data.user} {actualMessage?.firstname} {actualMessage?.lastname}
        </h3>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          {data.userEmail} {actualMessage?.email}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          {data.userSubject} {actualMessage?.subject}
        </p>
        <p className="col-span-3 font-paragraph text-darkColor text-lg">
          {data.userMessage}
        </p>
        <p className="break-words col-span-3 h-40 font-paragraph text-paragraph text-sm w-full bg-gray-50 p-1">
          {actualMessage?.message}
        </p>
        <button
          type="button"
          className="mt-4 h-10 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor"
        >
          is treated
        </button>
        <button
          type="button"
          className="mt-4 h-10 col-start-3 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor"
        >
          delete
        </button>
      </article>
    </>
  );
}
