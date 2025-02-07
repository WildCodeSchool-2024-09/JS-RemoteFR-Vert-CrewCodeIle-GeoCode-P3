import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminUserDetail from "../components/AdminUserDetail";
import AdminUsersList from "../components/AdminUsersList";
import ConfirmDelete from "../components/ConfirmDelete";

import adminContactData from "../assets/data/adminContact.json";

import type { AdminUserProps } from "../assets/definition/lib";

export default function AdminUsersPage() {
  // State of modale users list
  const [isUsersDetailsModale, setIsUsersDetailsModale] = useState(false);

  // State of modale ConfirmDelete
  const [isConfirmDeleteModale, setIsConfirmDeleteModale] = useState(false);

  // State for store all users
  const [usersList, setUsersList] = useState<AdminUserProps[] | []>([]);

  // State for store the selected user
  const [actualUser, setActualUser] = useState<AdminUserProps | null>(null);

  // State and Button for switch desabled
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // Get all messages from user table
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/user`)
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data);
      });
  }, []);

  // Button for modify a user
  const handleChangeActualUser = async (userData: AdminUserProps) => {
    const addUserDataId = {
      ...userData,
      id: actualUser?.user_id,
    };

    // format the date
    const [day, month, year] = addUserDataId.birthday.split("/");
    const formatDate = new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );

    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    const addDateToUserDate = {
      ...addUserDataId,
      birthday: isoDate,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/user/${addDateToUserDate?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addDateToUserDate),
        },
      );

      if (response.ok) {
        // Calculate new age
        const currentDate = new Date(Date.now());
        const birthDate = new Date(formatDate);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        // Set the new age to useData
        const updatedUserData = {
          ...addUserDataId,
          age: `${age} ans`,
        };
        // Update the states
        setActualUser(updatedUserData);
        const updatedUserList = usersList.map((user) => {
          if (user.user_id === updatedUserData.id) {
            return { ...user, ...updatedUserData }; // Merge the updated user
          }
          return user;
        });

        setUsersList(updatedUserList);
        setIsDisabled(!isDisabled);
        setIsUsersDetailsModale(false);
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  // Button for delete a user
  const handleDeleteUser = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/user/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUsersList((prevState) => prevState.filter((e) => e.user_id !== id));
        setActualUser(null);
        setIsUsersDetailsModale(false);
        setIsConfirmDeleteModale(false);
      }
    });
  };

  return (
    <>
      <main
        className={`overflow-scroll items-center h-[100vh] w-full p-2 xl:p-4 ${
          !isConfirmDeleteModale
            ? "opacity-100 bg-lightColor "
            : "bg-opacity-25 pointer-events-none bg-black inset-0"
        }`}
      >
        <nav>
          <Link
            to="/admin"
            className="inline-block mr-2 mb-2 p-1 font-paragraph border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl"
          >
            {adminContactData.adminHomeButton}
          </Link>
          <button
            type="button"
            className={`p-1 font-paragraph border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl ${isUsersDetailsModale ? "inline" : "hidden"}`}
            onClick={() => setIsUsersDetailsModale(false)}
          >
            {adminContactData.returnButton}
          </button>
        </nav>
        <article className="flex gap-8">
          <AdminUsersList
            usersList={usersList}
            setIsUsersDetailsModale={setIsUsersDetailsModale}
            isUsersDetailsModale={isUsersDetailsModale}
            setAcualUser={setActualUser}
          />
          <AdminUserDetail
            handleChangeActualUser={handleChangeActualUser}
            actualUser={actualUser && actualUser}
            usersList={usersList}
            isUsersDetailsModale={isUsersDetailsModale}
            setIsConfirmDeleteModale={setIsConfirmDeleteModale}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        </article>
      </main>
      <ConfirmDelete
        handleDelete={handleDeleteUser}
        isConfirmDeleteModale={isConfirmDeleteModale}
        setIsConfirmDeleteModale={setIsConfirmDeleteModale}
        actualValue={actualUser && actualUser}
      />
    </>
  );
}
