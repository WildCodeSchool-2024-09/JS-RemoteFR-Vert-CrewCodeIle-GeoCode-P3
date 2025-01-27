import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import data from "../assets/data/adminContact.json";
import AdminContactMessages from "../components/AdminContactMessage";
import AdminMessagesList from "../components/AdminMessagesList";

import type { ContactFormProps } from "../assets/definition/lib";

export default function AdminContact() {
  // State for store all messages
  const [usersMessages, setUsersMessages] = useState<ContactFormProps[] | []>(
    [],
  );

  // State of detail messages window
  const [isContactMessagesOpen, setIsContactMessagesOpen] = useState(false);

  // State of the selected message
  const [actualMessage, setActualMessage] = useState<ContactFormProps | null>(
    null,
  );
  // State for store the
  // get all the contact table
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setUsersMessages(data);
      });
  }, []);

  // update the status of the message
  const { id } = useParams();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`).then(
      (response) => response.json(),
    );
  }, [id]);

  const treatedMessage = usersMessages.filter((e) => e.is_treated === 1);
  const notTreatedMessage = usersMessages.filter((e) => e.is_treated === 0);

  return (
    <>
      <article className="flex flex-col items-center">
        <h2>{data.title}</h2>
        <h3 className={`${!isContactMessagesOpen ? "inline" : "hidden"}`}>
          {data.notTreatedMessages}
        </h3>
        <AdminMessagesList
          filteredData={notTreatedMessage}
          isContactMessagesOpen={isContactMessagesOpen}
          setIsContactMessagesOpen={setIsContactMessagesOpen}
          setActualMessage={setActualMessage}
        />
        <p className={`${notTreatedMessage.length > 0 && "hidden"}`}>
          {data.noMessage}
        </p>
        <h3 className={`${!isContactMessagesOpen ? "inline" : "hidden"}`}>
          {data.treatedMessages}
        </h3>
        <AdminMessagesList
          filteredData={treatedMessage ? treatedMessage : []}
          isContactMessagesOpen={isContactMessagesOpen}
          setIsContactMessagesOpen={setIsContactMessagesOpen}
          setActualMessage={setActualMessage}
        />
        <p className={`${treatedMessage.length > 0 && "hidden"}`}>
          {data.noMessage}
        </p>
        <AdminContactMessages
          isContactMessagesOpen={isContactMessagesOpen}
          actualMessage={actualMessage && actualMessage}
        />
        <button
          type="button"
          onClick={() => setIsContactMessagesOpen(false)}
          className={`${isContactMessagesOpen ? "inline" : "hidden"}`}
        >
          {data.returnButton}
        </button>
        <Link to="/admin">{data.adminHomeButton}</Link>
      </article>
    </>
  );
}
