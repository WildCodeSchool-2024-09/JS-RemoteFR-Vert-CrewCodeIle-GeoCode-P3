import data from "../assets/data/adminUsersList.json";

import type {
  AdminUserProps,
  AdminUsersListProps,
} from "../assets/definition/lib";

export default function AdminUsersList({
  usersList,
  setIsUsersDetailsModale,
  isUsersDetailsModale,
  setAcualUser,
}: AdminUsersListProps) {
  if (isUsersDetailsModale) return;

  return (
    <article className="w-full h-[100vh] lg:border-darkColor pb-6 lg:border-4 lg:flex lg:flex-col lg:w-1/2 lg:items-center xl:h-fit">
      <h2 className="text-2xl text-center mb-2 font-title text-darkColor mt-4 lg:text-4xl">
        {data.usersList}
      </h2>
      <ul className="overflow-y-auto border-4 border-darkColor grid grid-cols-4 lg:w-11/12">
        <h3 className="text-center font-title py-8 text-darkColor text-lg border-solid border-darkColor border-r-4 md:py-12 lg:text-2xl">
          {data.userLastName}
        </h3>
        <h3 className="text-center font-title py-8 text-darkColor text-lg border-r-4 border-darkColor md:py-12 lg:text-2xl">
          {data.userFirstName}
        </h3>
        <h3 className="text-center font-title py-4 text-darkColor border-r-4 text-lg md:py-8 lg:py-12 lg:text-2xl">
          {data.zipcode}
        </h3>
        <h3 className="text-center font-title py-4 break-words text-darkColor border-l-4 border-darkColor text-lg md:py-8 lg:text-2xl">
          {data.birthdate}
        </h3>{" "}
        {usersList?.map((e: AdminUserProps) => (
          <li
            key={e.id}
            className="h-12 col-span-4 grid grid-cols-4 text-darkColor hover:text-lightColor hover:bg-darkColor active:bg-interestColor"
          >
            <button
              type="button"
              className="border-solid font-paragraph text-center border-darkColor border-r-4 border-t-4"
              onClick={() => {
                setAcualUser(e);
                if (window.innerWidth < 1024) setIsUsersDetailsModale(true);
              }}
            >
              {e.lastname}
            </button>
            <button
              type="button"
              className="inline border-darkColor border-r-4 border-t-4 text-center"
              onClick={() => {
                setAcualUser(e);
                if (window.innerWidth < 1024) setIsUsersDetailsModale(true);
              }}
            >
              {e.firstname}
            </button>
            <button
              type="button"
              className="border-darkColor border-t-4"
              onClick={() => {
                setAcualUser(e);
                if (window.innerWidth < 1024) setIsUsersDetailsModale(true);
              }}
            >
              {e.city}
            </button>
            <button
              type="button"
              className="border-darkColor border-t-4 border-l-4"
              onClick={() => {
                setAcualUser(e);
                if (window.innerWidth < 1024) setIsUsersDetailsModale(true);
              }}
            >
              {e.age}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
