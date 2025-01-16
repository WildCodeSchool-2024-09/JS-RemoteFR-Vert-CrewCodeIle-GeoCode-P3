import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import messageError from "../assets/data/errorMessage.json";
import { type SubmitHandler, useForm } from "react-hook-form";

import type {
  BrandProps,
  ErrorMessageProps,
  ModelProps,
  SocketProps,
  VehiculeProps,
} from "../assets/definition/lib";
import ModalRegistrationValidate from "./ModalRegistrationValidate";

export default function ModalVehiculeRegistration() {
  // Method from react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VehiculeProps>();

  //To recover information from form & send them to data base
  const onSubmitVehicule: SubmitHandler<VehiculeProps> = (vehiculeData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register/vehicule`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(vehiculeData),
    }).then((response) => response.json());
    setShowValidateModal(true);
  };

  //Recover ID from brand & model to passed them to fetch
  const id = watch("brand");
  const idSocket = watch("model");

  // Fetch brand from DB & stock them with state
  const [dataBrand, setDatabrand] = useState<BrandProps[]>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register`).then((res) =>
      res.json().then((data: ModelProps[]) => setDatabrand(data)),
    );
  }, []);

  // Fetch model from DB where modelId = brandId & stock model with state
  const [dataModel, setDataModel] = useState<ModelProps[]>();
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/register/${id}`).then((res) =>
        res.json().then((data: ModelProps[]) => setDataModel(data)),
      );
    }
  }, [id]);
  // Fetch model from DB where modelId = brandId & stock socket with state
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

  //Open modal "Register validate"
  const [showValidateModal, setShowValidateModal] = useState(false);

  //Json error message form
  const errorMessage: ErrorMessageProps = messageError;

  return (
    <>
      {showValidateModal &&
        createPortal(<ModalRegistrationValidate />, document.body)}
      <div
        className={`${showValidateModal ? "opacity-0" : "opacity-100"} fixed z-[9600] top-1/3 mx-auto -translate-y-1/2 -translate-x1/2`}
      >
        <fieldset className="text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl relative z-[10000] lg:w-36 ">
          <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>
          <form
            className=" text-left space-y-3 border  font-bold p-3 rounded-xl z-[10000] "
            onSubmit={handleSubmit(onSubmitVehicule)}
          >
            <h3 className="text-interestColor text-center font-normal">
              Informations véhicule
            </h3>
            <label className="inline-block w-full font-paragraph">
              Constructeur* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("brand", { required: errorMessage.required })}
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
              <p className="text-red-800">{errors.brand?.message}</p>
            </label>
            <label className="inline-block w-full font-paragraph">
              Modèle* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("model", { required: errorMessage.required })}
              >
                <option value={0}>Selectionnez un construteur</option>
                {dataModel
                  ? dataModel.map((m) => (
                      <option value={m.socket_id} key={m.id}>
                        {m.label}
                      </option>
                    ))
                  : "-"}
              </select>
              <p className="text-red-800">{errors.model?.message}</p>
            </label>
            <label className="inline-block w-full font-paragraph">
              Type de prise* :
              <select
                className="border  w-full rounded-md font-normal font-paragraph"
                {...register("socket", { required: errorMessage.required })}
              >
                <option value={0}>Selectionnez un construteur</option>
                {dataSocket && (
                  <option value={dataSocket.id}>{dataSocket.label}</option>
                )}
              </select>
            </label>
            <p className="text-red-800">{errors.socket?.message}</p>
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
