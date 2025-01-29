import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import data from "../assets/data/adminContact.json";
import AdminContactMessages from "../components/AdminContactMessage";
import AdminMessagesList from "../components/AdminMessagesList";

import type { ContactFormProps } from "../assets/definition/lib";

export default function AdminContact() {
  // State for store all messages
  const [usersMessages, setUsersMessages] = useState<ContactFormProps[] | []>(
    [],
  );

  // State of detail message page
  const [isContactMessagesOpen, setIsContactMessagesOpen] = useState(false);

  // State of the selected message
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

  const handleSwitchIsTreated = async (
    currentIndex: number,
    currentId: number,
  ) => {
    // Get the current message
    const currentMessage = usersMessages[currentIndex];
    // Change the value of is_treated property
    currentMessage.is_treated = currentMessage.is_treated === 0 ? 1 : 0;
    const { id, is_treated } = currentMessage;
    // Create a object with only two property for express
    const newStatus = { id, is_treated };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${currentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Give the new status to express
          body: JSON.stringify({ newStatus }),
        },
      );

      if (response.ok) {
        // Update the local state
        setUsersMessages((prevState) =>
          prevState.map((item) =>
            item.id === currentId
              ? { ...item, is_treated: currentMessage.is_treated }
              : item,
          ),
        );
      }
    } catch (err) {
      console.error("Erreur de communication avec le serveur :", err);
    }
  };

  return (
    <>
      <article className="absolute gap-2 items-center z-[1040] bg-lightColor top-0 left-1/2 -translate-x-1/2 h-full w-full p-2">
        <Link
          to="/admin"
          className="inline-block mr-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor"
        >
          {data.adminHomeButton}
        </Link>
        <button
          type="button"
          onClick={() => setIsContactMessagesOpen(false)}
          className={`p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor ${isContactMessagesOpen ? "inline" : "hidden"}`}
        >
          {data.returnButton}
        </button>
        <AdminMessagesList
          handleSwitchIsTreated={handleSwitchIsTreated}
          usersMessages={usersMessages}
          isContactMessagesOpen={isContactMessagesOpen}
          setIsContactMessagesOpen={setIsContactMessagesOpen}
          setActualMessage={setActualMessage}
        />
        <p className={`${usersMessages.length > 0 && "hidden"}`}>
          {data.noMessage}
        </p>
        <AdminContactMessages
          isContactMessagesOpen={isContactMessagesOpen}
          actualMessage={actualMessage && actualMessage}
        />
      </article>
    </>
  );
}
