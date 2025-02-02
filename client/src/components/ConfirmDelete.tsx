import data from "../assets/data/adminContact.json";

import type {
  AdminUserProps,
  ContactFormProps,
} from "../assets/definition/lib";

export default function ConfirmDelete({
  handleDeleteMessage,
  isConfirmDeleteModale,
  setIsConfirmDeleteModale,
  actualMessage,
}: {
  handleDeleteMessage: (id: number) => void;
  isConfirmDeleteModale: boolean;
  setIsConfirmDeleteModale: (bool: boolean) => void;
  actualMessage: ContactFormProps | AdminUserProps | null;
}) {
  if (!isConfirmDeleteModale) return;

  return (
    <section className="flex flex-col items-center justify-around p-5 absolute top-1/2 -translate-y-2/3 -translate-x-1/2 left-1/2 bg-lightColor w-9/12 h-1/2 rounded-lg vsm:h-1/3 lg:w-1/3 xl:justify-center xl:gap-4 2xl:w-1/5">
      <h3 className="text-xl font-paragraph text-darkColor text-center xl:mb-8">
        {data.confirmationMessage}
      </h3>
      <button
        type="button"
        className="font-paragraph border-solid border-2 text-warningColor border-warningColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor w-8/12 h-8"
        onClick={() => {
          if (typeof actualMessage?.id === "number") {
            handleDeleteMessage(actualMessage?.id);
          }
        }}
      >
        {data.deleteButton}
      </button>
      <button
        type="button"
        className="font-paragraph border-solid border-2 text-green-600 border-green-600 rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor w-8/12 h-8"
        onClick={() => setIsConfirmDeleteModale(false)}
      >
        {data.returnButton}
      </button>
    </section>
  );
}
