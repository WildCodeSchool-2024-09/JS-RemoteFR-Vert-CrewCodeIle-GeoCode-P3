import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useLocation } from "react-router-dom";
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
  const onSubmit: SubmitHandler<InputProps> = (data) => {
    setFormInputVehicule(data);
  };

  const location = useLocation();
  const userInformation = location.state;

  const [formInputVehiule, setFormInputVehicule] = useState<InputProps>();
  console.info(userInformation);
  console.info(formInputVehiule);

  const apiBrand = useLoaderData() as BrandProps[];

  const [dataModel, setDataModel] = useState<ModelProps[]>();
  const [dataSocket, setDataSocket] = useState<SocketProps[]>();
  const id = Number.parseInt(watch("brand"));
  const idSocket = Number.parseInt(watch("model"));

  console.info(idSocket);
  console.info(id);
  useEffect(() => {
    fetch(`http://localhost:3310/api/register/${id}`).then((res) =>
      res
        .json()
        .then((data: ModelProps[]) => setDataModel(data))
        .catch((error) => console.error(error)),
    );
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/register/socket/${idSocket}`).then((res) =>
      res.json().then((data: SocketProps[]) => setDataSocket(data)),
    );
  }, [idSocket]);

  return (
    <>
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
              <option>----</option>
              {apiBrand.map((a) => (
                <option value={a.id} key={a.label}>
                  {a.label}
                </option>
              ))}
            </select>
            <p className="text-red-800">{errors.confirm?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Modèle* :
            <select
              className="border  w-full rounded-md font-normal font-paragraph"
              {...register("model", { required: true })}
            >
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
              {dataSocket
                ? dataSocket.map((s) => (
                    <option value={s.id} key={s.id}>
                      {s.label}
                    </option>
                  ))
                : "-"}
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
    </>
  );
}
