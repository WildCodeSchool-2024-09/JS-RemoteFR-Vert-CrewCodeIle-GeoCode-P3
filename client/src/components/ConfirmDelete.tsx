import data from "../assets/data/adminContact.json";

import type {
  AdminVehiculeProps,
  ContactFormProps,
} from "../assets/definition/lib";

type AdminDeleteProps = {
  handleDelete: (id: number) => void;
  isConfirmDeleteModale: boolean;
  setIsConfirmDeleteModale: (bool: boolean) => void;
  actualValue: Partial<AdminVehiculeProps> | ContactFormProps | null;
};

export default function ConfirmDelete({
  handleDelete,
  isConfirmDeleteModale,
  setIsConfirmDeleteModale,
  actualValue,
}: AdminDeleteProps) {
  if (!isConfirmDeleteModale) return;

  const idToDelete = actualValue?.id_model || actualValue?.id;

  return (
    <section className="z-10 fixed flex flex-col items-center justify-around p-5 top-1/2 -translate-y-2/3 -translate-x-1/2 left-1/2 bg-lightColor w-9/12 h-1/2 rounded-lg vsm:h-1/3 lg:w-1/3 xl:justify-center xl:gap-4 2xl:w-1/5">
      <h3 className="text-xl font-paragraph text-darkColor text-center xl:mb-8">
        {data.confirmationMessage}
      </h3>
      <button
        type="button"
        className="font-paragraph border-solid border-2 text-warningColor border-warningColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor w-8/12 h-8"
        onClick={() => {
          if (idToDelete) handleDelete(idToDelete);
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
