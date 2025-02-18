import type { MouseEventHandler } from "react";
export default function ConfirmModal({
  onClose,
  confirm,
  slot,
}: { onClose: MouseEventHandler; confirm: MouseEventHandler; slot: string }) {
  return (
    <>
      <div className="font-paragraph fixed inset-0 bg-opacity-50 bg-black z-[4000]" />
      <div className="w-full absolute bg-gray-100 border border-gray-600 rounded-lg bottom-[35%] lg:w-[360px] h-56 z-[4010] lg:left-[50%] top-[40%] lg:top-[30%] lg:-translate-x-1/2">
        <div className="m-4">
          <div className="flex items-start justify-start">
            <img
              className="h-10 object-scale-down border-gray-600"
              src={"./src/assets/images/image-question-2.png"}
              alt="{image}"
            />
            <span>
              <h1 className="m-1 font-paragraph text-2xl">Confirmation</h1>
            </span>
          </div>

          <hr />
          <h2 className="m-3 font-paragraph text-lg">
            Confirmez-vous votre reservation pour aujourd'hui à {slot} ?
          </h2>
        </div>
        <div className="m-4 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-interestColor 1 font-bold text-white px-8 py-2 rounded-3xl m-4"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={confirm}
            className="bg-interestColor 1 font-bold text-white px-8 py-2 rounded-3xl m-4"
          >
            Valider
          </button>
        </div>
      </div>
    </>
  );
}
