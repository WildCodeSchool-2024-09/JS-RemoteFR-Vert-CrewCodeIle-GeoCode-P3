import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import type {
  InputProps,
  BrandProps,
  ModelProps,
  ErrorMessageProps,
  SocketProps,
} from "../assets/lib/definition";
import messageError from "../assets/data/errorMessage.json";
import socket from "../assets/data/socket.json";

export default function RegistrationPage() {
  //State stockage des données du formulaire
  const [formInput, setFormInput] = useState<InputProps>();
  //Json message erreur formulaire
  const errorMessage: ErrorMessageProps = messageError;
  //Json type de prise vehicules
  const socketType: SocketProps[] = socket;
  //Récupération des données du formulaire
  const onSubmit: SubmitHandler<InputProps> = (data) => setFormInput(data);
  // regex firstname / lastname / city : accepte Maj & min accepté, accent fr, tiret, au moins 1 occurence doit etre présente
  const nameValidation = /^[A-Za-z\é\è\ê\ï-]+$/g;
  // regex password : Au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial, min length 8
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  //API marques véhicule
  const apiBrand = useLoaderData() as BrandProps[];
  //API model véhicule
  const [model, setModel] = useState<ModelProps>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_MODEL}`)
      .then((res) => res.json())
      .then((data) => setModel(data));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputProps>();

  console.info(formInput);

  //Styles label & input formulaire
  const styleLabel = "inline-block w-full";
  const styleInput = "border  w-full rounded-md";

  return (
    <>
      <fieldset className="text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl z-[10000]">
        <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>

        <h3 className="text-interestColor">Informations personnelles</h3>

        <form
          className=" text-left space-y-3 border mt-2 font-bold p-3 rounded-xl z-[10000] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styleLabel}>
            Prénom* :
            <input
              className={styleInput}
              type="text"
              {...register("firstName", {
                required: "Champ requis",
                pattern: {
                  value: nameValidation,
                  message: errorMessage.name,
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
                  value: nameValidation,
                  message: "Caractères non valides : 09 _@$*'[{]}",
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
              {...register("email", {
                required: "Champ requis",
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
                  value: nameValidation,
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
            Nombre de véhicules* :
            <input
              className={styleInput}
              type="number"
              {...register("vehicle", { required: "Champ requis" })}
            />
          </label>
          <label className={styleLabel}>
            Constructeur* :
            <select
              className={styleInput}
              {...register("brand", { required: true })}
            >
              {apiBrand.map((a) => (
                <option key={a.codigo} value={a.nome}>
                  {a.nome}
                </option>
              ))}
            </select>
          </label>
          <label className={styleLabel}>
            Modèle* :
            <select
              className={styleInput}
              {...register("model", { required: true })}
            >
              {model
                ? model.modelos.map((a) => (
                    <option key={a.codigo} value={a.nome}>
                      {a.nome}
                    </option>
                  ))
                : model}
            </select>
          </label>
          <label className={styleLabel}>
            Type de prise* :
            <select
              className={styleInput}
              {...register("socket", { required: true })}
            >
              {socketType.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styleLabel}>
            Mot de passe*
            <input
              className={styleInput}
              type="password"
              {...register("password", {
                required: "Champ requis",
                pattern: passwordValidation,
              })}
            />
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
            className="border-interestColor border px-6  rounded-3xl bg-interestColor text-white py-1"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </fieldset>
    </>
  );
}
