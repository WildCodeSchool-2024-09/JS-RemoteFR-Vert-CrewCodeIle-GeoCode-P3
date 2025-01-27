import { Pencil } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { UserProps } from "../assets/definition/lib";
import { formatedDAte } from "../assets/helpers/FormatedDate";
import ModalBooking from "./ModalBooking";
import { toast } from "react-toastify";

export default function ModalProfil({
  closeModal,
  showProfilModal,
}: { closeModal: () => void; showProfilModal: boolean }) {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const handleClickBooking = () => setOpenBookingModal(!openBookingModal);

  //Stock in a state userInfo from fecth table user
  const [userInfo, setUserInfo] = useState<UserProps[]>();

  const id = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  //State to open burgerMenu : modify profil & see booking
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

  //state to modify form, readOnly switch true to false
  const [editForm, setEditForm] = useState(true);
  const handleClickEdit = () => setEditForm(!editForm);

  //useForm from react hook form : register to take modification user information & register photo about profile photo
  const { register, handleSubmit } = useForm<UserProps>();
  const { register: registerPhoto, handleSubmit: handleSubmitPhoto } =
    useForm<UserProps>();

  //Update user modification to the database
  const onSubmitEditUserInfo: SubmitHandler<UserProps> = (userData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Profil mis à jour");
        } else {
          toast.warning(
            "Une erreur est survenue, veuillez rééssayer ultérieurement",
          );
        }
      })
      .catch((err) => console.error(err))
      .then(() => setEditForm(true));
  };

  //Update user photo to the database
  const onSubmitUploadPhoto: SubmitHandler<UserProps> = (userPhoto) => {
    const { photo } = userPhoto;
    const formData = new FormData();
    formData.append("photo", photo[0]);

    console.info(formData);
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/upload/${id}`, {
      method: "put",
      // headers: { Authorization: `Bearer ${auth.token}` },
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Photo modifiée, actualisez la page");
        } else {
          toast.warning("Format non valide ou taille maximale atteinte (10mo)");
        }
      })
      .catch((err) => console.error(err))
      .then(() => setEditForm(true));
  };

  return (
    <>
      {userInfo && (
        <>
          {/* button to close modale when I clic out of the modal */}
          <button
            type="button"
            onClick={closeModal}
            className="fixed inset-0 z-[990] backdrop-blur-sm "
          />
          <section
            className={` rounded-lg vsm:pb-8  sm:w-4/6 vsm:h-3/4  md:h-3/4 md:translate-x-1/4 lg:h-3/4 xl:top-auto xl:translate-x-8 xl:bottom-2 xl:h-3/4 2xl:w-1/4 ${showProfilModal ? "animate-openModal" : "animate-closeModal"} absolute bottom-0 bg-lightColor w-full z-[999]`}
          >
            {/* Menu burger */}
            <nav className=" w-fit">
              <button
                onClick={handleClickMenu}
                type="button"
                className="relative group"
              >
                <div className="ml-4 mt-4 relative flex overflow-hidden items-center justify-center rounded-2xl w-[50px] h-[50px]  bg-interestColor lg:h-24 lg:w-24 xl:w-[50px] xl:h-[50px]">
                  <div className="flex flex-col justify-between w-[20px] h-[20px]  origin-center overflow-hidden lg:w-12 xl:w-[20px] xl:h-[20px] ">
                    <div
                      className={`bg-lightColor h-[2px] w-7 lg:w-12 xl:h-[2px] ${openBurgerMenu ? "transform transition-all duration-300 origin-left group-focus:rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:rotate[42deg]"}  `}
                    />
                    <div
                      className={`bg-lightColor h-[2px] w-7 lg:w-12 xl:h-[2px] ${openBurgerMenu ? " rounded transform transition-all duration-300 group-focus:-translate-x-10 lg:group-focus:-translate-x-20 xl:group-focus:-translate-x-20" : "transform transition-all duration-300 group-focus:-translate-x10"} `}
                    />
                    <div
                      className={` bg-lightColor h-[2px] w-7 lg:w-12 xl:h-[2px] ${openBurgerMenu ? "transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:-rotate[42deg]"} `}
                    />
                  </div>
                </div>
              </button>
              {openBurgerMenu && (
                <ul
                  className={`${openBurgerMenu ? "animate-openMenu" : "animate-closeMenu"} absolute left-4 font-paragraph z-[1300]  mt-1 rounded-lg lg:text-3xl xl:text-2xl`}
                >
                  <li className=" border border-lightColor bg-interestColor px-4 rounded-lg py-2 text-white hover:bg-interestColor active:bg-interestColor/50  focus:bg-interestColor/70">
                    <button onClick={handleClickEdit} type="button">
                      Modifier mon profil
                    </button>
                  </li>
                  <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                    <button type="button" onClick={handleClickBooking}>
                      Mes réservations
                    </button>
                  </li>
                </ul>
              )}
            </nav>

            {/* User photo & upload new photo */}
            <article className=" w-fit mx-auto relative bottom-32 flex-col justify-center lg:bottom-64 xl:bottom-36  xl:w-48 xl:h-96">
              <figure className="border-white border-8 rounded-full  w-36 h-36 mx-auto lg:w-64 lg:h-64 xl:w-44 xl:h-44">
                <img
                  className={`lg:w-auto lg:h-60 xl:w-40 xl:h-40  ${editForm ? "opacity-100 " : "  opacity-50  "} rounded-full h-32 w-auto `}
                  src={`${import.meta.env.VITE_API_URL}/upload/${userInfo[0].photo}`}
                  alt="profil utilisateur"
                />
                <form onSubmit={handleSubmitPhoto(onSubmitUploadPhoto)}>
                  {!editForm && (
                    <>
                      <label
                        htmlFor="photo"
                        className="relative bottom-24 left-12 lg:bottom-40 lg:left-24 xl:bottom-24 xl:left-16 "
                      >
                        <Pencil
                          color="black"
                          strokeWidth={3}
                          size={36}
                          className="lg:size-16 xl:size-10"
                        />
                      </label>
                      <input
                        id="photo"
                        className="hidden "
                        type="file"
                        {...registerPhoto("photo")}
                      />
                      <button
                        className="relative bottom-24 left-7 border-interestColor w- border px-6  rounded-3xl bg-interestColor text-white py-1 mt-4 lg:bottom-36 lg:left-16 xl:bottom-24 xl:left-10 "
                        type="submit"
                      >
                        <SendHorizontal className="lg:size-12 xl:size-6" />
                      </button>
                    </>
                  )}
                </form>
              </figure>

              <h2 className="mt-4  text-4xl w-72  text-center font-title lg:text-6xl lg:w-[50vw] lg:mt-16 xl:text-4xl xl:-translate-x-[5vw] xl:w-[20vw] border">
                Bonjour {userInfo[0].firstName}
              </h2>
            </article>

            {/* display user info & modify them  */}
            <article>
              <form
                className="ml-4 pl-2 font-paragraph relative bottom-20 text-xl grid grid-cols-2 md:pl-10 lg:text-4xl lg:bottom-44 xl:text-2xl xl:pl-8"
                onSubmit={handleSubmit(onSubmitEditUserInfo)}
              >
                <label htmlFor="firstName" className="mb-4  text-interestColor">
                  Prénom
                </label>
                <input
                  className={`text-black ml-8 bg-lightColor  h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
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
                  className={`text-black ml-8 bg-lightColor h-6  lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2"}`}
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
                  className={`text-black ml-8 bg-lightColor h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                  type="text"
                  readOnly={editForm}
                  disabled={editForm}
                  defaultValue={formatedDAte(new Date(userInfo[0].birthday))}
                  {...register("birthday")}
                />

                <label htmlFor="city" className="mb-4  text-interestColor">
                  Ville
                </label>
                <input
                  className={`text-black ml-8 bg-lightColor h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
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
                  className={`text-black ml-8 bg-lightColor h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-orange-500 pl-2 "}`}
                  type="text"
                  readOnly={editForm}
                  disabled={editForm}
                  defaultValue={userInfo[0].zipCode}
                  {...register("zipCode")}
                />

                {!editForm && (
                  <button
                    className="border-interestColor absolute -bottom-8 translate-x-[30vw] mx-auto border px-6 md:translate-x-[23vw] md:-bottom-16 rounded-3xl bg-interestColor text-white py-1 mt-4 lg:-bottom-24 xl:translate-x-[8vw]"
                    type="submit"
                  >
                    Modifier
                  </button>
                )}
              </form>
            </article>
            {openBookingModal &&
              createPortal(
                <ModalBooking closeModal={() => setOpenBookingModal(false)} />,
                document.body,
              )}
          </section>
        </>
      )}
    </>
  );
}
