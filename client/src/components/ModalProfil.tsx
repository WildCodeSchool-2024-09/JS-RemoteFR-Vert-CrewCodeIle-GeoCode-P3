import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { UserProps } from "../assets/definition/lib";

export default function ModalProfil({
  closeModal,
  showProfilModal,
}: { closeModal: () => void; showProfilModal: boolean }) {
  const [userInfo, setUserInfo] = useState<UserProps[]>();

  const id = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

  const [editForm, setEditForm] = useState(true);

  const handleClickEdit = () => setEditForm(!editForm);

  const { register, handleSubmit } = useForm<UserProps>();
  const { register: registerPhoto, handleSubmit: handleSubmitPhoto } =
    useForm<UserProps>();

  const onSubmitEditUserInfo: SubmitHandler<UserProps> = (userData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${id}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err))
      .then(() => setEditForm(true));
  };

  const onSubmitUploadPhoto: SubmitHandler<UserProps> = (userPhoto) => {
    const { photo } = userPhoto;
    const formData = new FormData();
    formData.append("photo", photo[0]);
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/upload/${id}`, {
      method: "put",
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  return (
    <>
      {userInfo && (
        <section
          className={`${showProfilModal ? "animate-openModal" : "animate-closeModal"} absolute bottom-0 bg-lightColor w-full z-[1005]`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="fixed inset-0  backdrop-blur-sm"
          />

          {/* Menu burger */}
          <nav className=" w-fit">
            <button
              onClick={handleClickMenu}
              type="button"
              className="relative group"
            >
              <div className="ml-4 mt-4 relative flex overflow-hidden items-center justify-center rounded-2xl w-[50px] h-[50px]  bg-interestColor ">
                <div className="flex flex-col justify-between w-[20px] h-[20px]  origin-center overflow-hidden">
                  <div
                    className={`${openBurgerMenu ? "transform transition-all duration-300 origin-left group-focus:rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:rotate[42deg]"} bg-lightColor h-[2px] w-7 `}
                  />
                  <div
                    className={`${openBurgerMenu ? " rounded transform transition-all duration-300 group-focus:-translate-x-10" : "transform transition-all duration-300 group-focus:-translate-x10"} bg-lightColor h-[2px] w-7`}
                  />
                  <div
                    className={`${openBurgerMenu ? "transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:-rotate[42deg]"} bg-lightColor h-[2px] w-7 `}
                  />
                </div>
              </div>
            </button>
            {openBurgerMenu && (
              <ul
                className={`${openBurgerMenu ? "animate-openMenu" : "animate-closeMenu"} absolute left-4 font-paragraph z-[1300]  mt-1 rounded-lg`}
              >
                <li className=" border border-lightColor bg-interestColor px-4 rounded-lg py-2 text-white hover:bg-interestColor active:bg-interestColor/50  focus:bg-interestColor/70">
                  <button onClick={handleClickEdit} type="button">
                    Modifier mon profil
                  </button>
                </li>
                <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                  Mes réservations
                </li>
              </ul>
            )}
          </nav>

          {/* photo utilisateur et modification photo */}
          <article className=" w-fit mx-auto relative bottom-32 flex-col justify-center">
            <form onSubmit={handleSubmitPhoto(onSubmitUploadPhoto)}>
              {!editForm && (
                <>
                  <input
                    className="absolute  w-20 text-xs left-32"
                    type="file"
                    {...registerPhoto("photo")}
                  />
                  <button type="submit">Envoi</button>
                </>
              )}
            </form>
            <figure className="border-white border-8 rounded-full  w-36 h-36 mx-auto  ">
              <img
                className="rounded-full h-32 w-auto bg-lightColor "
                src={userInfo[0].photo}
                alt="profil utilisateur"
              />
            </figure>
            <h2 className="mt-4  text-4xl w-72 border text-center font-title ">
              Bonjour {userInfo[0].firstName}
            </h2>
          </article>

          <article>
            <form
              className="ml-4 font-paragraph relative bottom-20 text-xl grid grid-cols-2"
              onSubmit={handleSubmit(onSubmitEditUserInfo)}
            >
              <label htmlFor="firstName" className="mb-4  text-interestColor">
                Prénom
              </label>
              <input
                className={`text-black ml-8 bg-lightColor h-6 ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                type="text"
                readOnly={editForm}
                disabled={editForm}
                defaultValue={userInfo[0].firstName}
                {...register("firstName")}
              />

              <label htmlFor="lastName" className="mb-4  text-interestColor">
                Nom
              </label>
              <input
                className={`text-black ml-8 bg-lightColor h-6 ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                type="text"
                readOnly={editForm}
                disabled={editForm}
                defaultValue={userInfo[0].lastName}
                {...register("lastName")}
              />

              <label htmlFor="birthday" className="mb-4  text-interestColor">
                Date de naissance
              </label>
              <input
                className={`text-black ml-8 bg-lightColor h-6 ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                type="text"
                readOnly={editForm}
                disabled={editForm}
                defaultValue={userInfo[0].birthday.toString()}
                {...register("birthday")}
              />

              <label htmlFor="city" className="mb-4  text-interestColor">
                Ville
              </label>
              <input
                className={`text-black ml-8 bg-lightColor h-6 ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                type="text"
                readOnly={editForm}
                disabled={editForm}
                defaultValue={userInfo[0].city}
                {...register("city")}
              />

              <label htmlFor="zipCode" className="mb-4  text-interestColor">
                Code postal
              </label>
              <input
                className={`text-black ml-8 bg-lightColor h-6 ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                type="text"
                readOnly={editForm}
                disabled={editForm}
                defaultValue={userInfo[0].zipCode}
                {...register("zipCode")}
              />

              {!editForm && (
                <button
                  className="border-interestColor absolute -bottom-8 translate-x-3/4 mx-auto border px-6  rounded-3xl bg-interestColor text-white py-1 mt-4"
                  type="submit"
                >
                  Modifier
                </button>
              )}
            </form>
          </article>
        </section>
      )}
    </>
  );
}
