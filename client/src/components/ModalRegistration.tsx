import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import messageError from "../assets/data/errorMessage.json";
import type {
  ErrorMessageProps,
  MailProps,
  UserProps,
} from "../assets/definition/lib";
import ModalVehiculeRegistration from "./ModalVehiculeRegistration";

export default function ModalRegistration({
  closeModalRegister,
  openRegisterModal,
}: { closeModalRegister: () => void; openRegisterModal: boolean }) {
  //Json error message form
  const errorMessage: ErrorMessageProps = messageError;

  //Open modal form vehicule information
  const [showVehiculeModal, setShowVehiculeModal] = useState(false);

  //To recover information from fetch on table user, to check if mail is already used
  const [userMail, setUserMail] = useState<MailProps[]>();
  const mailVerification = userMail?.map((u) => u.email);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register/mail`).then((res) =>
      res.json().then((data: []) => setUserMail(data)),
    );
  }, []);

  //To recover information from form & send them to data base
  const onSubmit: SubmitHandler<UserProps> = (userData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("userId", data.insertId);
      })
      .catch((err) => console.error(err));

    setShowVehiculeModal(true);
  };

  // Method from react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserProps>();

  return (
    <>
      {showVehiculeModal &&
        createPortal(
          <ModalVehiculeRegistration
            closeModalVehicule={() => setShowVehiculeModal(false)}
            closeModalRegister={closeModalRegister}
          />,
          document.body,
        )}
      <button
        type="button"
        onClick={closeModalRegister}
        className="fixed inset-0 backdrop-blur-sm"
      />
      <fieldset
        className={` text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl absolute top-0 left-7  z-[9500] lg:w-36 lg:top-40 ${openRegisterModal ? "animate-openModal" : "animate-closeModal"} ${showVehiculeModal ? "opacity-0" : "opacity-100"} `}
      >
        <h2 className="pt-4 text-interestColor font-bold">INSCRIPTION</h2>

        <form
          className=" text-left space-y-3 border  font-bold p-3 rounded-xl z-[10000] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-interestColor text-center font-normal">
            Informations personnelles
          </h3>
          <label className="inline-block w-full font-paragraph">
            Prénom* :
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="text"
              {...register("firstName", {
                required: errorMessage.required,
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï-]+$/,
                  message: errorMessage.firstName,
                },
              })}
            />
            <p className="text-red-800">{errors.firstName?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Nom* :
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="text"
              {...register("lastName", {
                required: errorMessage.required,
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
                  message: errorMessage.lastName,
                },
              })}
            />
            <p className="text-red-800">{errors.lastName?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Email* :
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="email"
              placeholder="email@mail.com"
              {...register("email", {
                required: errorMessage.required,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                  message: errorMessage.email,
                },
                validate: (value) => {
                  if (mailVerification?.includes(value)) {
                    return errorMessage.mailCheck;
                  }
                },
              })}
            />
            <p className="text-red-800">{errors.email?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Date de naissance* :
            <input
              className=" rounded-md border block w-full text-center font-light"
              type="date"
              {...register("birthday", {
                required: errorMessage.required,
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
          <label className="inline-block w-full font-paragraph">
            Ville*
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="text"
              {...register("city", {
                required: errorMessage.required,
                pattern: {
                  value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
                  message: errorMessage.city,
                },
              })}
            />
            <p className="text-red-800">{errors.city?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Code postal* :
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="number"
              {...register("zipCode", {
                required: errorMessage.required,
                minLength: 5,
                maxLength: 5,
              })}
            />
            <p className="text-red-800">{errors.zipCode?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Mot de passe*
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="password"
              {...register("password", {
                required: errorMessage.required,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: errorMessage.password,
                },
              })}
            />
            <p className="text-red-800">{errors.password?.message}</p>
          </label>
          <label className="inline-block w-full font-paragraph">
            Confirmation du mot de passe*
            <input
              className="border w-full rounded-md font-normal font-paragraph"
              type="password"
              {...register("confirm", {
                required: errorMessage.required,
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
