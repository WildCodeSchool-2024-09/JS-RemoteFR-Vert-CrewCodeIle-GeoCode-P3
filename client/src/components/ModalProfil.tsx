import { Calendar1, MapPinHouse, Pencil, User } from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { UserProps } from "../assets/definition/lib";
import { formatedDAte } from "../assets/helpers/formatedDate";
import { formatedName } from "../assets/helpers/formatedName";
import { useAuth } from "../context/userContext";
import ModalBooking from "./ModalBooking";

export default function ModalProfil({
  closeModal,
  showProfilModal,
}: { closeModal: () => void; showProfilModal: boolean }) {
  //Verify userInformation
  const { userInfo } = useAuth();
  const id = userInfo?.email as string;

  //Open table booking
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const handleClickBooking = () => setOpenBookingModal(!openBookingModal);

  const { register, handleSubmit } = useForm<UserProps>();

  //Stock in a state userData from fecth table user
  const [userData, setuserData] = useState<UserProps[]>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setuserData(data));
  }, [id]);

  //State to open burgerMenu : modify profil & see booking
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

  //state to modify form, readOnly switch true to false
  const [editForm, setEditForm] = useState(true);
  const handleClickEdit = () => {
    setEditForm(!editForm);
    setOpenBurgerMenu(false);
  };

  //Preview photo upload by user
  const [preview, setPreview] = useState<File[]>([]);
  const [urlImage, setUrlImage] = useState<string>();
  useEffect(() => {
    if (preview[0]) {
      const objectUrl = URL.createObjectURL(preview[0]);
      setUrlImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [preview[0]]);

  //Update user modification to the database
  const onSubmitEdituserData: SubmitHandler<UserProps> = async (userData) => {
    const { photo, ...rest } = userData;
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo[0]);
    }
    formData.append("user", JSON.stringify(rest));
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/${id}`,
      {
        method: "put",
        body: formData,
      },
    );
    const data = await response.json();
    if (response.status === 201) {
      setEditForm(true);
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }
  };

  return (
    <>
      {userData && (
        <>
          {/* button to close modale when I clic out of the modal */}
          <button
            type="button"
            onClick={closeModal}
            className="fixed inset-0 z-[990] backdrop-blur-sm "
          />
          <section
            className={`overflow-hidden h-[80vh] w-[99.5vw]  mx-auto rounded-xl xl:w-[25vw] xl:left-8 ${
              showProfilModal ? "animate-openModal" : "animate-closeModal"
            } absolute bottom-0 bg-lightColor w-full z-[999]`}
          >
            {/* Menu burger */}

            <article>
              <div className="flex items-center w-[90vw] mx-auto  gap-32 xl:w-[20vw] xl:mb-8 xl:gap-56">
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
                      className={`absolute left-4 font-paragraph z-[1300]  mt-1 rounded-lg xl:left-16 ${openBurgerMenu ? "animate-openMenu" : "animate-closeMenu"} `}
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

                <figure className="border-white border-8 rounded-full mt-4 w-24 h-24 mx-auto  relative flex-col justify-center   ">
                  <img
                    className={`  ${
                      editForm ? "opacity-100 " : "opacity-50"
                    } rounded-full h-20 w-auto `}
                    src={`${import.meta.env.VITE_API_URL}/upload/${userData[0]?.photo}`}
                    alt="profil utilisateur"
                  />
                  {urlImage && (
                    <img
                      className="absolute top-0 rounded-full w-20 h-20 "
                      src={urlImage}
                      alt="profil utilisateur"
                    />
                  )}
                </figure>
              </div>
              <div className="w-fit mx-auto mt-2">
                <h2 className=" text-interestColor text-2xl ml-4 w-72 z-[2000] text-center font-title xl:text-3xl xl:w-96 xl:mb-8">
                  Bonjour {userData[0]?.firstName}
                </h2>
              </div>
              {/* display user info & modify them  */}
              <form
                className="w-[90vw] mt-2 ml-4 pl-2 font-paragraph text-xl flex flex-col xl:w-[23vw] "
                onSubmit={handleSubmit(onSubmitEdituserData)}
              >
                <fieldset className="absolute">
                  {!editForm && (
                    <>
                      <label
                        htmlFor="photo"
                        className=" overflow-hidden absolute bottom-28 left-60 xl:left-[18vw] xl:bottom-40   "
                      >
                        <Pencil color="black" strokeWidth={3} size={28} />
                      </label>
                      <input
                        id="photo"
                        className="w-2 text-black ml-8 bg-lightColor opacity-0  pointer-events-none  h-6 "
                        type="file"
                        {...register("photo", {
                          onChange: (e) => {
                            setPreview(e.target.files);
                          },
                        })}
                      />
                    </>
                  )}
                </fieldset>
                <fieldset className="mt-8 flex items-center justify-around w-72 mx-auto border-b-2 border-white ">
                  <label
                    htmlFor="firstName"
                    className="mb-4  text-interestColor ml-2"
                  >
                    <User size={48} />
                  </label>
                  <div className=" relative bottom-2 w-44 pt-2">
                    <input
                      className={`text-black ml-8 bg-lightColor pl-0  w-32 h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-interestColor pl-2 mr-4"}`}
                      type="text"
                      readOnly={editForm}
                      disabled={editForm}
                      defaultValue={formatedName(userData[0].firstName)}
                      {...register("firstName")}
                    />
                    <input
                      className={`text-black ml-8 bg-lightColor pl-0 w-32 h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-interestColor pl-2 mr-4"}`}
                      type="text"
                      readOnly={editForm}
                      disabled={editForm}
                      defaultValue={userData[0].lastName.toUpperCase()}
                      {...register("lastName")}
                    />
                  </div>
                </fieldset>
                <fieldset className="flex items-center justify-around mt-2  w-72 mx-auto  border-b-2 border-white">
                  <label
                    htmlFor="birthday"
                    className="mb-4  text-interestColor ml-2"
                  >
                    <Calendar1 size={48} />
                  </label>
                  <div className="w-44 ">
                    <input
                      className={`text-black ml-8 bg-lightColor pl-0 w-32 h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-interestColor pl-2 mr-4 "}`}
                      type="text"
                      readOnly={editForm}
                      disabled={editForm}
                      defaultValue={formatedDAte(
                        new Date(userData[0]?.birthday),
                      )}
                      {...register("birthday")}
                    />
                  </div>
                </fieldset>
                <fieldset className="flex items-center justify-around  w-72 mx-auto border-b-2 mt-2 border-white   ">
                  <label
                    htmlFor="city"
                    className="mb-4  text-interestColor ml-2"
                  >
                    <MapPinHouse size={48} />
                  </label>
                  <div className="w-44 ">
                    <input
                      className={`text-black ml-8 bg-lightColor pl-0 w-32 h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-interestColor pl-2 mr-4"}`}
                      type="text"
                      readOnly={editForm}
                      disabled={editForm}
                      defaultValue={userData[0].city}
                      {...register("city")}
                    />
                    <input
                      className={`text-black ml-8 bg-lightColor pl-0 w-32 h-6 lg:h-fit ${editForm ? "border-none" : "border-2 rounded-md border-interestColor pl-2 mr-4"}`}
                      type="text"
                      readOnly={editForm}
                      disabled={editForm}
                      defaultValue={userData[0].zipCode}
                      {...register("zipCode")}
                    />
                  </div>
                </fieldset>
                {!editForm && (
                  <button
                    className="border-interestColor  mx-auto border px-6 md:translate-x-[23vw] md:-bottom-16 rounded-3xl bg-interestColor text-white py-1 mt-4 xl:translate-x-0 xl:mt-16 "
                    type="submit"
                  >
                    Modifier
                  </button>
                )}
              </form>
            </article>
          </section>
          {openBookingModal &&
            createPortal(
              <ModalBooking closeModal={() => setOpenBookingModal(false)} />,
              document.body,
            )}
        </>
      )}
    </>
  );
}
