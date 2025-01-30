import { useEffect } from "react";
import { Link } from "react-router-dom";

import AdminUsersList from "../components/AdminUsersList";

import adminContactData from "../assets/data/adminContact.json";

/* import type { UserProps } from "../assets/definition/lib"; */

export default function AdminUsersPage() {
  // State for store all users
  /* const [usersList, setUsersList] = useState<UserProps[] | []>([]); */

  // Get all messages from user table
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`).then((res) =>
      res.json(),
    );
    /* .then((data) => {
        setUsersMessages(data);
      }); */
  }, []);

  return (
    <>
      <main className=" w-foverflow-scroll items-center h-[100vh] w-full p-2 xl:p-4 bg-lightColor">
        <nav>
          <Link
            to="/admin"
            className="inline-block mr-2 mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {adminContactData.adminHomeButton}
          </Link>
          <button
            type="button"
            className="p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {adminContactData.returnButton}
          </button>
        </nav>
        <article>
          <AdminUsersList />
          {/* <AdminUserMessage /> */}
        </article>
      </main>
      {/* <ConfirmDelete /> */}
    </>
  );
}
