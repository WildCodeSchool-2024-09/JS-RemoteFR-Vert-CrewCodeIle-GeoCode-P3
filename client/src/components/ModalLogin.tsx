import { useState } from "react";
import { createPortal } from "react-dom";
import { type SubmitHandler, useForm } from "react-hook-form";

import errorMessage from "../assets/data/errorMessage.json";
import type { UserProps } from "../assets/definition/lib";

import { toast } from "react-toastify";
import { useAuth } from "../context/userContext";
import ModalRegistration from "./ModalRegistration";

export default function ModalLogin({ closeModal }: { closeModal: () => void }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserProps>();

  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleClickRegister = () => {
    setOpenRegisterModal(!openRegisterModal);
  };

  const { login } = useAuth();

  const onSubmit: SubmitHandler<UserProps> = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.status === 201) {
      const data = await response.json();
      login(data.user);
      closeModal();
      toast.success(data.message);
    } else {
      toast.warning("Mot de pass ou identifiant incorect");
    }
  };

  return (
    <>
      {openRegisterModal &&
        createPortal(
          <ModalRegistration
            closeModalRegister={handleClickRegister}
            openRegisterModal={openRegisterModal}
          />,
          document.body,
        )}
      {!openRegisterModal && (
        <>
          <button
            onClick={closeModal}
            className="fixed inset-0 backdrop-blur-sm"
            type="button"
          />
          <fieldset className="text-center font-paragraph  bg-lightColor w-64 mx-auto my-12 rounded-2xl absolute top-0 left-6 z-[2000] md:w-56 lg:w-36 lg:top-40 ] ">
            <h2 className="pt-4 text-interestColor font-bold text-2xl  ">
              Login
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" text-left space-y-3 border  font-bold p-3 rounded-xl z-[10000] "
            >
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
                  })}
                />
                <p className="text-red-800">{errors.email?.message}</p>
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
              <button
                onClick={handleClickRegister}
                type="button"
                className="font-normal text-sm w-[80vw]"
              >
                Vous n'avez pas encore de compte ?
              </button>
              <button
                className="border-interestColor translate-x-1/2 border px-6  rounded-3xl bg-interestColor text-white py-1"
                type="submit"
              >
                Se connecter
              </button>
            </form>
          </fieldset>
        </>
      )}
    </>
  );
}
