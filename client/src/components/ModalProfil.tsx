import { useEffect, useState } from "react";
import type { UserProps } from "../assets/definition/lib";

export default function ModalProfil({
  closeModal,
  showProfilModal,
}: { closeModal: () => void; showProfilModal: boolean }) {
  const [userInfo, setUserInfo] = useState<UserProps[]>();

  const id = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profil/${id}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  console.info(userInfo);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

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
          <article className=" w-fit">
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
                <li className="border border-lightColor bg-interestColor px-4 rounded-lg py-2 text-white">
                  Modifier mon profil
                </li>
                <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                  Mes réservations
                </li>
              </ul>
            )}
          </article>
          <article className=" w-fit mx-auto relative bottom-32 flex-col justify-center">
            <figure className="border-white border-8 rounded-full  w-36 h-36 mx-auto  ">
              <img
                className="rounded-full bg-lightColor "
                src={userInfo[0].photo}
                alt="profil utilisateur"
              />
            </figure>
            <h2 className="mt-4  text-4xl w-72 border text-center font-title ">
              Bonjour {userInfo[0].firstName}
            </h2>
          </article>
          <article className="ml-4 font-paragraph relative bottom-20 text-xl grid grid-cols-2">
            <h2 className="mb-4  text-interestColor">Nom</h2>
            <h3 className="ml-8">{userInfo[0].lastName}</h3>

            <h2 className="mb-4  text-interestColor">Prénom</h2>
            <h3 className="ml-8">{userInfo[0].firstName}</h3>

            <h2 className="mb-4  text-interestColor">Date de naissance</h2>
            <h3 className="ml-8">""</h3>

            <h2 className="mb-4  text-interestColor">Ville</h2>

            <h3 className="ml-8">{userInfo[0].city}</h3>

            <h2 className="mb-4  text-interestColor">Code postal</h2>
            <h3 className="ml-8">{userInfo[0].zipCode}</h3>
          </article>
        </section>
      )}
    </>
  );
}
