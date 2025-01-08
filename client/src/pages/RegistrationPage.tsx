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
  confirmation: string;
};

export default function RegistrationPage() {
  const [formInput, setFormInput] = useState<inputProps>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputProps>();
  const onSubmit: SubmitHandler<inputProps> = (data) => setFormInput(data);
  console.info(formInput);

  const nameValidation = /^[A-Za-z\é\è\ê\ï-]+$/g;
  const emailValidation =
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const errorMessage = {
    name: "Caractères non valides : 09 _@$*'[{]}",

    invalidEmail: "Caractère spéciaux non valides : <*:[etc",
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-36">
        <label>
          Prénom*
          <input
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
        <label>
          Nom*
          <input
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
        <label>
          Email*
          <input
            type="email"
            {...register("email", {
              required: "Champ requis",
              pattern: emailValidation,
            })}
          />
          <p className="text-red-800">{errors.email?.message}</p>
        </label>
        <label>
          Date de naissance*
          <input
            type="date"
            {...register("birthday", { required: "Champ requis" })}
          />
          <p className="text-red-800">{errors.birthday?.message}</p>
        </label>
        <label>
          Ville*
          <input
            type="text"
            {...register("city", { required: "Champ requis" })}
          />
          <p className="text-red-800">{errors.city?.message}</p>
        </label>
        <label>
          Code postal*
          <input
            type="number"
            {...register("zipCode", { required: "Champ requis", minLength: 5 })}
          />
          <p className="text-red-800">{errors.zipCode?.message}</p>
        </label>
        <label>
          Nombre de véhicules*
          <input type="number" {...register("vehicle", { required: true })} />
        </label>
        <label>
          Mot de pass*
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <label>
          Confirmation du mot de pass*
          <input
            type="password"
            {...register("confirmation", { required: true })}
          />
        </label>

        <input type="submit" />
      </form>
    </>
  );
}
