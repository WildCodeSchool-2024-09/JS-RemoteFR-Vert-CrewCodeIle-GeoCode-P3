import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { UserVehiculeProps } from "../assets/definition/lib";
// import { type SubmitHandler, useForm } from "react-hook-form";

export default function ModalUserVehicule() {
  const { register } = useForm();
  const [vehiculeInfo, setVehiculeInfo] = useState<UserVehiculeProps>();

  const [editForm, setEditForm] = useState(false);
  const handleClickEdit = () => setEditForm(!editForm);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

  const id = 15;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicule/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      //Authorization : `Bearer ${auth.toke}
    })
      .then((res) => res.json())
      .then((data) => setVehiculeInfo(data));
  }, []);
  console.info(vehiculeInfo);

  return (
    <>
      <section className="z-[2000] absolute">
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
              className={`absolute left-4 font-paragraph z-[1300]  mt-1 rounded-lg lg:text-3xl xl:text-xl ${openBurgerMenu ? "animate-openMenu" : "animate-closeMenu"} `}
            >
              <li className=" border border-lightColor bg-interestColor px-4 rounded-lg py-2 text-white hover:bg-interestColor active:bg-interestColor/50  focus:bg-interestColor/70">
                <button onClick={handleClickEdit} type="button">
                  Modifier mon profil
                </button>
              </li>
              <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                <button type="button">Ajouter une véhicule</button>
              </li>
              <button type="button">Modifier une véhicule</button>
              <button type="button">Supprimer une véhicule</button>
            </ul>
          )}
        </nav>
        <section>
          <form>
            <img src="" alt="vehicule" />
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              readOnly={editForm}
              disabled={editForm}
              defaultValue={vehiculeInfo ? vehiculeInfo.brand : ""}
            />
            <label htmlFor="model">Modèle</label>
            <input
              type="text"
              readOnly={editForm}
              disabled={editForm}
              defaultValue={vehiculeInfo ? vehiculeInfo.model : ""}
              {...register("model")}
            />
            <label htmlFor="socket">Type de prise</label>
            <input
              type="text"
              readOnly={editForm}
              disabled={editForm}
              defaultValue={vehiculeInfo ? vehiculeInfo.socket : ""}
              {...register("socket")}
            />
          </form>
        </section>
      </section>
    </>
  );
}
