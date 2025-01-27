import data from "../assets/data/adminContact.json";

import type { ContactFormProps } from "../assets/definition/lib";

type AdminMessagesListProps = {
  filteredData: ContactFormProps[] | null;
  isContactMessagesOpen: boolean;
  setIsContactMessagesOpen: (bool: boolean) => void;
  setActualMessage: (e: ContactFormProps) => void;
};

export default function AdminMessagesList({
  filteredData,
  isContactMessagesOpen,
  setIsContactMessagesOpen,
  setActualMessage,
}: AdminMessagesListProps) {
  if (isContactMessagesOpen) return;
  return (
    <>
      <ul
        className={`grid grid-cols-2 w-11/12 border-solid border-darkColor border-4  ${!isContactMessagesOpen ? "inline" : "hidden"}`}
      >
        <h3 className="text-center border-solid border-darkColor border-r-4">
          {data.userName}
        </h3>
        <h3 className="text-center">{data.isTreated}</h3>

        {filteredData?.map((e) => (
          <li key={e.id} className="col-span-2 grid grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setActualMessage(e);
                setIsContactMessagesOpen(true);
              }}
              className="border-solid border-darkColor border-r-4 border-t-4"
            >
              {`${e.firstname} ${e.lastname}`}
            </button>
            <button
              type="button"
              className="border-solid border-darkColor border-t-4"
            >
              is treated
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
