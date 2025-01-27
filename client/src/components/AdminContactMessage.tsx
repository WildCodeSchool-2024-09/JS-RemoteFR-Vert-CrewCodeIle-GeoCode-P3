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

  return (
    <>
      <article className="w-11/12">
        <button type="button">is treated</button>
        <h3>
          {data.user} {actualMessage?.firstname} {actualMessage?.lastname}
        </h3>
        <p>
          {data.userEmail} {actualMessage?.email}
        </p>
        <p>
          {data.userSubject} {actualMessage?.subject}
        </p>
        <p>{data.userMessage}</p>
        <p className="break-words">{actualMessage?.message}</p>
      </article>
    </>
  );
}
