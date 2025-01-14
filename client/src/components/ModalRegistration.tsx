import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import messageError from "../assets/data/errorMessage.json";

import { useNavigate } from "react-router-dom";
import type { ErrorMessageProps, InputProps } from "../assets/definition/lib";

export default function ModalRegistration() {
  //State stockage des données du formulaire
  const [formInput, setFormInput] = useState<InputProps>();
  //Json message erreur formulaire
  const errorMessage: ErrorMessageProps = messageError;

  const navigate = useNavigate();
  //Récupération des données du formulaire && Navigation vers 2eme partie formulaire

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    setFormInput(data);
    navigate("/formulaire/vehicule", { state: data });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputProps>();

  console.info(formInput);

  //Styles label & input form
  const styleLabel = "inline-block w-full font-paragraph";
  const styleInput = "border  w-full rounded-md font-normal font-paragraph";

  return (
    <>
      <fieldset className="text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl relative z-[10000] lg:w-36 ">
        <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>

        <form
          className=" text-left space-y-3 border  font-bold p-3 rounded-xl z-[10000] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-interestColor text-center font-normal">
            Informations personnelles
          </h3>
          <label className={styleLabel}>
            Prénom* :
            <input
              className={styleInput}
              type="text"
              {...register("firstName", {
                required: "Champ requis",
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï-]+$/,
                  message: errorMessage.firstName,
                },
              })}
            />
            <p className="text-red-800">{errors.firstName?.message}</p>
          </label>
          <label className={styleLabel}>
            Nom* :
            <input
              className={styleInput}
              type="text"
              {...register("lastName", {
                required: "Champ requis",
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
                  message: errorMessage.lastName,
                },
              })}
            />
            <p className="text-red-800">{errors.lastName?.message}</p>
          </label>
          <label className={styleLabel}>
            Email* :
            <input
              className={styleInput}
              type="email"
              placeholder="email@mail.com"
              {...register("email", {
                required: "Champ requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                  message: errorMessage.email,
                },
              })}
            />
            <p className="text-red-800">{errors.email?.message}</p>
          </label>
          <label className={styleLabel}>
            Date de naissance* :
            <input
              className=" rounded-md border block w-full text-center font-light"
              type="date"
              {...register("birthday", {
                required: "Champ requis",
                validate: (value) => {
                  const birthday = new Date(value);
                  const now = new Date(Date.now());
                  if (birthday.getFullYear() + 18 > now.getFullYear()) {
                    return errorMessage.confirmAge;
                  }
                },
              })}
            />
            <p className="text-red-800">{errors.birthday?.message}</p>
          </label>
          <label className={styleLabel}>
            Ville*
            <input
              className={styleInput}
              type="text"
              {...register("city", {
                required: "Champ requis",
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
                  message: "Caractères non valides : 09 _@$*'[{]}",
                },
              })}
            />
            <p className="text-red-800">{errors.city?.message}</p>
          </label>
          <label className={styleLabel}>
            Code postal* :
            <input
              className={styleInput}
              type="number"
              {...register("zipCode", {
                required: "Champ requis",
                minLength: 5,
                maxLength: 5,
              })}
            />
            <p className="text-red-800">{errors.zipCode?.message}</p>
          </label>
          <label className={styleLabel}>
            Mot de passe*
            <input
              className={styleInput}
              type="password"
              {...register("password", {
                required: "Champ requis",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Le mot de passe doit contenir une Majuscule, une minuscule, un chiffre et un caractère spécial",
                },
              })}
            />
            <p className="text-red-800">{errors.password?.message}</p>
          </label>
          <label className={styleLabel}>
            Confirmation du mot de passe*
            <input
              className={styleInput}
              type="password"
              {...register("confirm", {
                required: "Champ requis",
                validate: (value) => {
                  if (value !== watch("password")) {
                    return errorMessage.confirmPassword;
                  }
                },
              })}
            />
            <p className="text-red-800">{errors.confirm?.message}</p>
          </label>
          <button
            className="border-interestColor mx-20 border px-6  rounded-3xl bg-interestColor text-white py-1"
            type="submit"
          >
            Suivant
          </button>
        </form>
      </fieldset>
    </>
  );
}
