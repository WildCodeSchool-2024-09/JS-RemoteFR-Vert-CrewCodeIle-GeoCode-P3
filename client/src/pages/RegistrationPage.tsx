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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-36">
        <label>
          Prénom
          <input
            {...register("firstName", { required: "This is requiered" })}
          />
          <p className="text-red-800">{errors.firstName?.message}</p>
        </label>
        <label>
          Nom
          <input {...register("lastName", { required: "This is requiered" })} />
          <p className="text-red-800">{errors.firstName?.message}</p>
        </label>
        <label>
          Email
          <input {...register("email", { required: "This is requiered" })} />
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
