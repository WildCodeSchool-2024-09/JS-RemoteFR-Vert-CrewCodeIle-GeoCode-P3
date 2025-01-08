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
    emailMiss: "Veuillez inclure @ dans l'adresse e-mail",
    invalidEmail: "Caractère spéciaux non valides : <*:[etc",
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-36">
        <label>
          Prénom
          <input
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
          Nom
          <input
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
          Email
          <input
            type="email"
            {...register("email", {
              required: "This is requiered",

              validate: {
                miss: (value) => value.includes("@") || errorMessage.emailMiss,
                invalid: (value) =>
                  emailValidation.test(value) || errorMessage.invalidEmail,
              },
            })}
          />
          <p className="text-red-800">{errors.email?.message}</p>
        </label>
        <label>
          Date de naissance
          <input {...register("birthday", { required: "This is requiered" })} />
        </label>
        <label>
          Ville
          <input {...register("city", { required: true })} />
        </label>
        <label>
          Code postal
          <input {...register("zipCode", { required: true })} />
        </label>
        <label>
          Nombre de véhicules
          <input {...register("vehicle", { required: true })} />
        </label>
        <label>
          Mot de pass
          <input {...register("password", { required: true })} />
        </label>
        <label>
          Confirmation du mot de pass
          <input {...register("confirmation", { required: true })} />
        </label>

        <input type="submit" />
      </form>
    </>
  );
}
