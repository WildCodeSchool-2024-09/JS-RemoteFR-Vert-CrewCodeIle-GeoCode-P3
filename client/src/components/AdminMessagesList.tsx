import data from "../assets/data/adminContact.json";

/* import type { Dispatch, SetStateAction } from "react"; */
import type { ContactFormProps } from "../assets/definition/lib";

type AdminMessagesListProps = {
  handleSwitchIsTreated: (index: number, id: number) => void;
  usersMessages: ContactFormProps[] | null;
  isContactMessagesOpen: boolean;
  setIsContactMessagesOpen: (bool: boolean) => void;
  setActualMessage: (e: ContactFormProps) => void;
};

export default function AdminMessagesList({
  handleSwitchIsTreated,
  usersMessages,
  isContactMessagesOpen,
  setIsContactMessagesOpen,
  setActualMessage,
}: AdminMessagesListProps) {
  if (isContactMessagesOpen) return;

  return (
    <>
      <h2
        className={"text-2xl text-center mb-2 font-title text-darkColor mt-4"}
      >
        {data.title}
      </h2>
      <ul
        className={`grid grid-cols-3 border-darkColor border-4 ${!isContactMessagesOpen ? "inline" : "hidden"}`}
      >
        <h3 className="text-center font-title text-darkColor text-lg border-solid border-darkColor border-r-4">
          {data.userName}
        </h3>{" "}
        <h3 className="text-center font-title text-darkColor text-lg border-r-4 border-darkColor">
          {data.date}
        </h3>
        <h3 className="text-center font-title text-darkColor text-lg">
          {data.isTreated}
        </h3>
        {usersMessages?.map((e, i) => (
          <li key={e.id} className="col-span-3 grid grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setActualMessage(e);
                setIsContactMessagesOpen(true);
              }}
              className="border-solid font-paragraph text-sm text-darkColor border-darkColor border-r-4 border-t-4 hover:text-lightColor hover:bg-darkColor active:bg-interestColor"
            >
              {`${e.firstname} ${e.lastname}`}
            </button>
            <p className="border-darkColor border-r-4 border-t-4 text-center text-darkColor text-sm">
              {e.date.split("T")[0].split("-").reverse().join("/")}
            </p>
            <button
              type="button"
              className={`border-darkColor border-t-4 bg-center bg-contain bg-no-repeat ${e.is_treated === 1 ? "bg-treated" : "bg-notTreated"}`}
              onClick={() => {
                handleSwitchIsTreated(i, e.id);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
