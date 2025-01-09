import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type inputProps = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  city: string;
  zipCode: number;
  vehicle: number;
  password: string;
  confirm: string;
};

export default function RegistrationPage() {
  const [formInput, setFormInput] = useState<inputProps>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<inputProps>();

  const onSubmit: SubmitHandler<inputProps> = (data) => setFormInput(data);
  console.info(formInput);

  // regex firstname / lastname / city : accepte Maj & min accepté, accent fr, tiret, au moins 1 occurence doit etre présente
  const nameValidation = /^[A-Za-z\é\è\ê\ï-]+$/g;

  // regex password : Au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial, min length 8
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const errorMessage = {
    name: "Caractères non valides : 09 _@$*'[{]}",

    confirmPassword: "Les mots de passe ne correspondent pas",
  };

  const styleLabel = "inline-block w-full";
  const styleInput = "border  w-full rounded-md ";

  return (
    <>
      <fieldset className="text-center font-paragraph bg-lightColor w-4/5 mx-auto my-12 z-[10000]">
        <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>

        <h3 className="text-interestColor">Informations personnelles</h3>

        <form
          className=" space-y-3 border mt-2 font-paragraph font-bold p-3 rounded-xl  "
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
            Email*
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
            Date de naissance*
            <input
              className=" border block w-full text-center font-light"
              type="date"
              {...register("birthday", { required: "Champ requis" })}
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
            Code postal*
            <input
              className={styleInput}
              type="number"
              {...register("zipCode", {
                required: "Champ requis",
                minLength: 5,
              })}
            />
            <p className="text-red-800">{errors.zipCode?.message}</p>
          </label>
          <label className={styleLabel}>
            Nombre de véhicules*
            <input
              className={styleInput}
              type="number"
              {...register("vehicle", { required: true })}
            />
          </label>
          <label className={styleLabel}>
            Mot de pass*
            <input
              className={styleInput}
              type="password"
              {...register("password", {
                required: true,
                pattern: passwordValidation,
              })}
            />
          </label>
          <label className={styleLabel}>
            Confirmation du mot de pass*
            <input
              className={styleInput}
              type="password"
              {...register("confirm", {
                required: true,
                validate: (value) => {
                  if (value !== watch("password")) {
                    return errorMessage.confirmPassword;
                  }
                },
              })}
            />
            <p className="text-red-800">{errors.confirm?.message}</p>
          </label>
          <input className={styleInput} type="submit" />
        </form>
      </fieldset>
    </>
  );
}
