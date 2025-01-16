export default function ModalRegistrationValidate() {
  return (
    <section
      className="h-60 flex justify-center items-center text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl 
    z-[10000] fixed top-32 left-8  -translate-y-1/2 -translate-x1/2  lg:w-72 lg:absolute lg:left-[42%] lg:-translate-y-1/2 lg: lg:top-72"
    >
      <article>
        <h2>INSCRIPTION VALIDEE</h2>
        <p className="mb-4">Bonne route !</p>
        <button
          className="border-interestColor mx-20 border px-6  rounded-3xl bg-interestColor text-white py-1 "
          type="button"
        >
          OK
        </button>
      </article>
    </section>
  );
}
