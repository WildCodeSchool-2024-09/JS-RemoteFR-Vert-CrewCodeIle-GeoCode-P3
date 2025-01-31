import data from "../assets/data/adminContact.json";

import type { AdminMessagesListProps } from "../assets/definition/lib";

export default function AdminMessagesList({
  handleSwitchIsTreated,
  isContactMessagesModale,
  setIsContactMessagesModale,
  setActualMessage,
  usersMessages,
}: AdminMessagesListProps) {
  if (isContactMessagesModale) return;

  return (
    <section className="w-full h-fit lg:border-darkColor pb-6 lg:border-4 lg:flex lg:flex-col lg:w-1/2 lg:items-center xl:h-fit">
      <h2
        className={
          "text-2xl text-center mb-2 font-title text-darkColor mt-4 lg:text-4xl"
        }
      >
        {data.title}
      </h2>
      <ul
        className={`overflow-y-auto grid grid-cols-3 border-darkColor border-4 lg:w-11/12 ${!isContactMessagesModale ? "inline" : "hidden"}`}
      >
        <h3 className="text-center font-title text-darkColor text-lg border-solid border-darkColor border-r-4 lg:text-2xl">
          {data.userName}
        </h3>{" "}
        <h3 className="text-center font-title text-darkColor text-lg border-r-4 border-darkColor lg:text-2xl">
          {data.date}
        </h3>
        <h3 className="text-center font-title text-darkColor text-lg lg:text-2xl">
          {data.isTreated}
        </h3>
        {usersMessages?.map((e) => (
          <li key={e.id} className="h-12 col-span-3 grid grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setActualMessage(e);
                if (window.innerWidth < 1024) setIsContactMessagesModale(true);
              }}
              className="border-solid font-paragraph text-center text-darkColor border-darkColor border-r-4 border-t-4 hover:text-lightColor hover:bg-darkColor active:bg-interestColor"
            >
              {`${e.firstname} ${e.lastname}`}
            </button>
            <p className="inline pt-3 border-darkColor border-r-4 border-t-4 text-center text-darkColor text-sm">
              {e.date.split("T")[0].split("-").reverse().join("/")}
            </p>
            <button
              type="button"
              className="border-darkColor border-t-4 bg-center bg-contain bg-no-repeat text-lg hover:bg-darkColor active:bg-interestColor"
              onClick={() => {
                handleSwitchIsTreated(e.id);
              }}
            >
              {e.is_treated === 1 ? (
                <p className="text-green-600 hover:text-lightColor">
                  {data.treated}
                </p>
              ) : (
                <p className="text-orange-500 hover:text-lightColor">
                  {data.notTreated}
                </p>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
