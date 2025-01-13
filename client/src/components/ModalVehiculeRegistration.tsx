import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import type { InputProps } from "../assets/definition/lib";

export default function ModalVehiculeRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();
  const onSubmit: SubmitHandler<InputProps> = (data) => {
    setFormInputVehicule(data);
  };
  const location = useLocation();
  const formData = location.state;

  const [formInputVehiule, setFormInputVehicule] = useState<InputProps>();
  const styleLabel = "inline-block w-full font-paragraph";
  const styleInput = "border  w-full rounded-md font-normal font-paragraph";
  console.info(formData);
  console.info(formInputVehiule);
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
          <label className={styleLabel}>
            Constructeur* :
            <select
              className={styleInput}
              {...register("brand", { required: true })}
            >
              <option>choix 1</option>
            </select>
            <p className="text-red-800">{errors.confirm?.message}</p>
          </label>
          <label className={styleLabel}>
            Modèle* :
            <select
              className={styleInput}
              {...register("model", { required: true })}
            >
              {" "}
              <option>choix 1</option>
            </select>
            <p className="text-red-800">{errors.confirm?.message}</p>
          </label>
          <label className={styleLabel}>
            Type de prise* :
            <select
              className={styleInput}
              {...register("socket", { required: true })}
            >
              <option>choix 1</option>
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
