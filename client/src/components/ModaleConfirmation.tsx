type ModaleConfirmation = {
  showConfirmationContactModale: boolean;
  setShowConfirmationContactModale: (boolean: boolean) => void;
  setShowContactModale: (boolean: boolean) => void;
};

export default function ModaleConfirmation({
  showConfirmationContactModale,
  setShowConfirmationContactModale,
  setShowContactModale,
}: ModaleConfirmation) {
  //If the state is false the modale is close
  if (!showConfirmationContactModale) return;

  const closeAllModale = () => {
    setShowContactModale(false);
    setShowConfirmationContactModale(false);
  };
  return (
    <article className="fixed z-[1030] p-4 bg-lightColor w-9/12 h-1/2 top-1/3 flex flex-col justify-around items-center rounded-lg sm:w-1/2 sm:h-1/3 lg:w-1/3">
      <p className=" text-darkColor font-paragraph mt-4 text-2xl text-center md:text-3xl">
        Message envoyé ! Merci de votre retour !
      </p>
      <button
        className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-darkColor font-paragraph rounded-full bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor w-1/2 h-1/6 lg:w-1/3 2xl:h-12"
        type="button"
        onClick={closeAllModale}
      >
        Retour
      </button>
    </article>
  );
}
