import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import errorMessage from "../assets/data/errorMessage.json";
import type { UserProps } from "../assets/definition/lib";

export default function ModalLogin() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit: SubmitHandler<UserProps> = (userData) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Bienvenu sur Geocode ");
        } else {
          toast.warning("Erreur connexion");
        }
      })
      .catch((errors) => console.error(errors));
  };

  return (
    <>
      <fieldset className="text-center font-paragraph bg-lightColor w-5/6 mx-auto my-12 rounded-2xl relative z-[9500] lg:w-36 lg:top-40">
        <h2 className="pt-4 text-interestColor font-bold text-2xl">Login</h2>
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
            className="border-interestColor mx-16 border px-6   rounded-3xl bg-interestColor text-white py-1"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </fieldset>
    </>
  );
}
