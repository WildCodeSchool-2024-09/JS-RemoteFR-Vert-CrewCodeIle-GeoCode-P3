import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import type {
  BrandProps,
  InputProps,
  ModelProps,
  SocketProps,
} from "../assets/definition/lib";

export default function ModalVehiculeRegistration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputProps>();

  const onSubmit: SubmitHandler<InputProps> = (vehiculeData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register/vehicule`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(vehiculeData),
    }).then((response) => response.json());
  };

  // Stock brand from fecth
  const [dataBrand, setDatabrand] = useState<BrandProps[]>();
  // Stock model from fecth
  const [dataModel, setDataModel] = useState<ModelProps[]>();
  // Stock socket from fecth
  const [dataSocket, setDataSocket] = useState<SocketProps>();

  //Recover ID from brand & model to passed them to fetch
  const id = Number.parseInt(watch("brand"));
  const idSocket = Number.parseInt(watch("model"));

  // Fetch all brand from DB
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register`).then((res) =>
      res.json().then((data: ModelProps[]) => setDatabrand(data)),
    );
  }, []);

  // Fetch model from DB where modelId = brandId
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register/${id}`).then((res) =>
      res.json().then((data: ModelProps[]) => setDataModel(data)),
    );
  }, [id]);

  // Fetch socket from DB where socketId = modelId
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/register/socket/${idSocket}`,
    ).then((res) =>
      res.json().then((data: SocketProps) => setDataSocket(data)),
    );
  }, [idSocket]);

  return (
    <>
      <div className="fixed z-[9600] top-1/3 mx-auto -translate-y-1/2 -translate-x1/2">
        <fieldset className="text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl relative z-[10000] lg:w-36 ">
          <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>
          <form
            className=" text-left space-y-3 border  font-bold p-3 rounded-xl z-[10000] "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-interestColor text-center font-normal">
              Informations véhicule
            </h3>
            <label className="inline-block w-full font-paragraph">
              Constructeur* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("brand", { required: true })}
              >
                <option value={0}>Selectionnez un constructeur</option>
                {dataBrand
                  ? dataBrand.map((a) => (
                      <option value={a.id} key={a.label}>
                        {a.label}
                      </option>
                    ))
                  : "-"}
              </select>
              <p className="text-red-800">{errors.confirm?.message}</p>
            </label>
            <label className="inline-block w-full font-paragraph">
              Modèle* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("model", { required: true })}
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
              <p className="text-red-800">{errors.confirm?.message}</p>
            </label>
            <label className="inline-block w-full font-paragraph">
              Type de prise* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("socket", { required: true })}
              >
                {dataSocket && (
                  <option value={dataSocket.id}>{dataSocket.label}</option>
                )}
              </select>
            </label>
            <button
              className="border-interestColor mx-20 border px-6  rounded-3xl bg-interestColor text-white py-1"
              type="submit"
            >
              Envoyer
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
}
