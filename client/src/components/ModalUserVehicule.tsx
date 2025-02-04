import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type {
  BrandProps,
  ModelProps,
  SocketProps,
  UserVehiculeProps,
  VehiculeProps,
} from "../assets/definition/lib";

export default function ModalUserVehicule() {
  const { register, watch, handleSubmit } = useForm<VehiculeProps>();
  const [vehiculeInfo, setVehiculeInfo] = useState<UserVehiculeProps[]>();

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

  const id = 15;
  const onSubmit: SubmitHandler<VehiculeProps> = async (dataVehicule) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/update/vehicule/:${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //Authorization : `Bearer ${auth.token}
        },
        body: JSON.stringify(dataVehicule),
      },
    );

    if (response.status === 201) {
      const data = await response.json();
      toast.success(data.message);
      setEditVehicule(!editVehicule);
    }
  };

  const [editVehicule, setEditVehicule] = useState(true);
  const handleClickEdit = () => {
    setEditVehicule(!editVehicule);
    setOpenBurgerMenu(!openBurgerMenu);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicule/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      //Authorization : `Bearer ${auth.token}
    })
      .then((res) => res.json())
      .then((data) => setVehiculeInfo(data));
  }, []);

  const idBrand = watch("brand");
  const idSocket = watch("model");

  // Fetch brand from DB & stock them with state
  const [dataBrand, setDatabrand] = useState<BrandProps[]>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register`).then((res) =>
      res.json().then((data: ModelProps[]) => setDatabrand(data)),
    );
  }, []);

  // Fetch model from DB where model_id = brand(id) & stock model with state
  const [dataModel, setDataModel] = useState<ModelProps[]>();
  useEffect(() => {
    if (idBrand) {
      fetch(`${import.meta.env.VITE_API_URL}/api/register/${idBrand}`).then(
        (res) => res.json().then((data: ModelProps[]) => setDataModel(data)),
      );
    }
  }, [idBrand]);

  // Fetch model from DB where socket_id = socket(id) & stock socket with state
  const [dataSocket, setDataSocket] = useState<SocketProps>();
  useEffect(() => {
    if (idSocket) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/register/socket/${idSocket}`,
      ).then((res) =>
        res.json().then((data: SocketProps) => setDataSocket(data)),
      );
    }
  }, [idSocket]);

  console.info(dataBrand);
  console.info(dataModel);
  console.info(dataSocket);

  return (
    <>
      <section
        className={`h-[65vh] rounded-xl sm:pb-8 sm:w-4/6 sm:h-3/4 md:h-3/4 md:translate-x-1/4 lg:h-3/4 xl:top-auto xl:translate-x-8 xl:bottom-2 xl:h-3/4 2xl:w-1/4 ${
          vehiculeInfo ? "animate-openModal" : "animate-closeModal"
        } absolute bottom-0 bg-lightColor w-full z-[999]`}
      >
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
                  Modifier un véhicule
                </button>
              </li>
              <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                <button type="button">Ajouter une véhicule</button>
              </li>
              <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                <button type="button">Supprimer une véhicule</button>
              </li>
              <li className="border border-lightColor  bg-interestColor px-4 rounded-lg py-2 text-white">
                <button type="button">Modifier la photo</button>
              </li>
            </ul>
          )}
        </nav>
        <figure className="w-fit mx-auto relative bottom-12">
          <img src="" alt="vehicule" />
        </figure>
        <section className=" border border-red-700 w-5/6 mx-auto my-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="font-paragraph grid grid-cols-2  "
          >
            <label htmlFor="brand" className="my-4 text-interestColor">
              Marque
            </label>
            <div className="relative top-4">
              <input
                className="inline-block bg-inherit "
                type="text"
                readOnly={editVehicule}
                disabled={editVehicule}
                defaultValue={vehiculeInfo ? vehiculeInfo[0].brand : ""}
              />
              {!editVehicule && (
                <select
                  className="border  w-full rounded-md font-normal font-paragraph absolute top-0"
                  {...register("brand")}
                >
                  <option value={0}>Selectionnez un construteur</option>
                  {dataBrand
                    ? dataBrand.map((a) => (
                        <option value={a.id} key={a.label}>
                          {a.label}
                        </option>
                      ))
                    : "-"}
                </select>
              )}
            </div>
            <label htmlFor="model" className="my-4 text-interestColor">
              Modèle
            </label>
            <div className="relative top-4">
              <input
                className="inline-block bg-inherit "
                type="text"
                readOnly={editVehicule}
                disabled={editVehicule}
                defaultValue={vehiculeInfo ? vehiculeInfo[0].model : ""}
              />
              {!editVehicule && (
                <select
                  className="border  w-full rounded-md font-normal font-paragraph absolute top-0"
                  {...register("model")}
                >
                  <option value={0}>Selectionnez un modèle</option>
                  {dataModel
                    ? dataModel.map((m) => (
                        <option value={m.socket_id} key={m.id}>
                          {m.label}
                        </option>
                      ))
                    : "-"}
                </select>
              )}
            </div>
            <label htmlFor="socket" className="my-4 text-interestColor">
              Type de prise
            </label>
            <div className="relative top-4">
              <input
                className="inline-block bg-inherit"
                type="text"
                readOnly={editVehicule}
                disabled={editVehicule}
                defaultValue={vehiculeInfo ? vehiculeInfo[0].socket : ""}
              />
              {!editVehicule && (
                <select
                  className="border  w-full rounded-md font-normal font-paragraph absolute top-0"
                  {...register("socket")}
                >
                  <option value={0}>Selectionnez un type de prise</option>
                  {dataSocket && (
                    <option value={dataSocket.id}>{dataSocket.label}</option>
                  )}
                </select>
              )}
            </div>
            {!editVehicule && (
              <button
                className="border-interestColor mx-20 border px-6  rounded-3xl bg-interestColor text-white py-1"
                type="submit"
              >
                Modifier
              </button>
            )}
          </form>
        </section>
      </section>
    </>
  );
}
