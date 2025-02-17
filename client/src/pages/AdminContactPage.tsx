import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import data from "../assets/data/adminContact.json";
import AdminContactMessages from "../components/AdminContactMessage";
import AdminMessagesList from "../components/AdminMessagesList";
import ConfirmDelete from "../components/ConfirmDelete";

import type { ContactFormProps } from "../assets/definition/lib";

export default function AdminContact() {
  // State of modale AdminContactMessage
  const [isContactMessagesModale, setIsContactMessagesModale] = useState(false);

  // State of modale ConfirmDelete
  const [isConfirmDeleteModale, setIsConfirmDeleteModale] = useState(false);

  // State for store all messages
  const [usersMessages, setUsersMessages] = useState<ContactFormProps[] | []>(
    [],
  );

  // State for store the selected message
  const [actualMessage, setActualMessage] = useState<ContactFormProps | null>(
    null,
  );

  // Get all messages from contact table
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setUsersMessages(data);
      });
  }, []);

  // Button for switch is treated / is not treated
  const handleSwitchIsTreated = async (currentId: number) => {
    const currentMessage = usersMessages.find((e) => e.id === currentId);
    if (!currentMessage) return;

    // Switch treated / not treated
    currentMessage.is_treated = currentMessage.is_treated === 0 ? 1 : 0;

    const { id, is_treated } = currentMessage;
    const newStatus = { id, is_treated };

    try {
      // Add to database
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${currentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newStatus }),
        },
      );
      // Change states if database receive the status
      if (response.ok) {
        setUsersMessages((prevState) =>
          prevState.map((e) => (e.id === currentId ? { ...e, is_treated } : e)),
        );
        setActualMessage({ ...currentMessage });
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  // Button for delete the current message
  const handleDeleteMessage = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact/${actualMessage?.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setUsersMessages((prevState) => prevState.filter((e) => e.id !== id));
        setIsContactMessagesModale(false);
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
            : "bg-opacity-30 pointer-events-none bg-black"
        }`}
      >
        <nav>
          <Link
            to="/admin"
            className="inline-block mr-2 mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {data.adminHomeButton}
          </Link>
          <button
            type="button"
            onClick={() => setIsContactMessagesModale(false)}
            className={`p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2 ${isContactMessagesModale ? "inline" : "hidden"}`}
          >
            {data.returnButton}
          </button>
        </nav>
        <article className="flex gap-8">
          <AdminMessagesList
            handleSwitchIsTreated={handleSwitchIsTreated}
            isContactMessagesModale={isContactMessagesModale}
            setIsContactMessagesModale={setIsContactMessagesModale}
            setActualMessage={setActualMessage}
            usersMessages={usersMessages}
          />
          {usersMessages.length === 0 && (
            <p className="text-center pt-4 font-paragraph text-darkColor text-xl">
              {data.noMessage}
            </p>
          )}
          <AdminContactMessages
            handleSwitchIsTreated={handleSwitchIsTreated}
            isContactMessagesModale={isContactMessagesModale}
            isConfirmDeleteModale={isConfirmDeleteModale}
            setIsConfirmDeleteModale={setIsConfirmDeleteModale}
            actualMessage={actualMessage && actualMessage}
          />
        </article>
      </main>
      <ConfirmDelete
        handleDelete={handleDeleteMessage}
        isConfirmDeleteModale={isConfirmDeleteModale}
        setIsConfirmDeleteModale={setIsConfirmDeleteModale}
        actualValue={actualMessage && actualMessage}
      />
    </>
  );
}
