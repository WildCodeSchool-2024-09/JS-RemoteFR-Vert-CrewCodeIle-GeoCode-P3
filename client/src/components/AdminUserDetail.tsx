import { useForm } from "react-hook-form";

import data from "../assets/data/adminUsersList.json";
import messageError from "../assets/data/errorMessage.json";
import userIcon from "../assets/images/user.png";

import type { AdminUserDetailProps } from "../assets/definition/lib";

import type {
  AdminUserProps,
  ErrorMessageProps,
} from "../assets/definition/lib";

export default function AdminUserDetail({
  actualUser,
  isUsersDetailsModale,
  setIsConfirmDeleteModale,
  handleChangeActualUser,
  isDisabled,
  setIsDisabled,
}: AdminUserDetailProps) {
  // If screen is larger than 1024 px the modale is off
  if (window.innerWidth < 1024) {
    if (!isUsersDetailsModale) return;
  }

  // If the admin didn't click on a user on the user list nothing append
  if (!actualUser) {
    return;
  }
  // Button for switch desabled
  const handleChangeForm = () => {
    setIsDisabled(!isDisabled);
  };

  // Json error message form
  const errorMessage: ErrorMessageProps = messageError;
  const defaultValues = {
    firstName: actualUser.firstName,
    lastName: actualUser.lastName,
    birthday: actualUser.birthday,
    city: actualUser.city,
    zipCode: actualUser.zipCode,
  };

  // Method from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUserProps>({ defaultValues });

  return (
    <fieldset>
      <form
        onSubmit={handleSubmit(handleChangeActualUser)}
        className="py-1 px-1 w-full grid gap-2 grid-cols-6 h-fit border-4 border-darkColor vmd:px-4 lg:w-[45vw]  lg:px-4 lg:pb-4 xl:h-fit 2xl:w-[48vw]"
      >
        <input
          type="text"
          {...register("firstName", {
            required: errorMessage.required,
            pattern: {
              value: /^[A-Za-z\é\è\ê\ï-]+$/,
              message: errorMessage.firstName,
            },
          })}
          defaultValue={actualUser?.firstName}
          disabled={isDisabled}
          className="text-2xl break-words col-span-3 text-right rounded font-title text-darkColor vmd:text-3xl "
        />
        <input
          type="text"
          defaultValue={actualUser?.lastName}
          {...register("lastName", {
            required: errorMessage.required,
            pattern: {
              value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
              message: errorMessage.lastName,
            },
          })}
          disabled={isDisabled}
          className="text-2xl break-words col-span-3 text-left rounded font-title text-darkColor vmd:text-3xl"
        />
        <p className="text-red-800 col-span-6">{errors.firstName?.message}</p>
        <p className="text-red-800 col-span-6">{errors.lastName?.message}</p>
        <img
          src={userIcon}
          alt="userIcon"
          className="rounded-full col-span-6 relative left-1/2 -translate-x-1/2 bg-darkColor w-fit vsm:mb-4"
        />
        <section className="col-span-6 grid-cols-2 grid vmd:grid-cols-7">
          <label
            htmlFor={data.birthdate}
            className="text-sm font-paragraph text-interestColor font-bold vmd:text-base vmd:col-span-3"
          >
            {data.birthdate}
          </label>
          <input
            type="text"
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
            defaultValue={actualUser.birthday}
            disabled={isDisabled}
            className="font-paragraph rounded text-darkColor vmd:col-span-4 break-words"
          />
          <p className="text-red-800 col-span-6">{errors.birthday?.message}</p>
        </section>
        <section className="col-span-6 grid-cols-2 grid vmd:grid-cols-7">
          <h4 className="text-sm font-paragraph text-interestColor font-bold vmd:text-base vmd:col-span-3">
            {data.yearOld}
          </h4>
          <p className="font-paragraph text-darkColor rounded vmd:col-span-4 break-words">
            {actualUser.age}
          </p>
        </section>
        <section className="col-span-6 grid-cols-2 grid vmd:grid-cols-7">
          <label
            htmlFor={data.mail}
            className="text-sm font-paragraph text-interestColor font-bold vmd:text-base vmd:col-span-3"
          >
            {data.mail}
          </label>
          <input
            type="text"
            {...register("email", {
              required: errorMessage.required,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                message: errorMessage.email,
              },
            })}
            defaultValue={actualUser.email}
            disabled={isDisabled}
            className="font-paragraph rounded text-darkColor break-words col-span-4"
          />
          <p className="text-red-800 col-span-6">{errors.email?.message}</p>
        </section>
        <section className="col-span-6 grid-cols-2 grid vmd:grid-cols-7">
          <label
            htmlFor={data.city}
            className="text-sm font-paragraph text-interestColor font-bold vmd:text-base vmd:col-span-3"
          >
            {data.city}
          </label>
          <input
            type="text"
            {...register("city", {
              required: errorMessage.required,
              pattern: {
                value: /^[A-Za-z\é\è\ê\ï\s-]+$/,
                message: errorMessage.city,
              },
            })}
            defaultValue={actualUser.city}
            disabled={isDisabled}
            className="font-paragraph rounded text-darkColor vmd:col-span-4 break-words"
          />
          <p className="text-red-800 col-span-6">{errors.city?.message}</p>
        </section>
        <section className="col-span-6 grid-cols-2 grid vmd:grid-cols-7">
          <label
            htmlFor={data.zipcode}
            className="text-sm font-paragraph text-interestColor font-bold vmd:text-base vmd:col-span-3"
          >
            {data.zipcode}
          </label>
          <input
            type="text"
            {...register("zipCode", {
              required: errorMessage.required,
              minLength: 5,
              maxLength: 5,
            })}
            defaultValue={actualUser.zipCode}
            disabled={isDisabled}
            className="font-paragraph rounded text-darkColor vmd:col-span-4 break-words"
          />
          <p className="text-red-800 col-span-6">{errors.zipCode?.message}</p>
        </section>
        <button
          type="button"
          className={`col-span-3 mt-4 ml-4 p-1 border-2 text-darkColor border-darkColor font-paragraph rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl ${!isDisabled ? "hidden" : "inline"}`}
          onClick={handleChangeForm}
        >
          {data.modificationButton}
        </button>
        <button
          type="submit"
          className={`col-span-3 mt-4 ml-4 p-1 text-green-600 border-green-600 border-2 font-paragraph rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl ${isDisabled ? "hidden" : "inline"}`}
        >
          {data.okButton}
        </button>
        <button
          type="button"
          className="col-span-3 mt-4 mr-4 col-start-4 p-1 text-warningColor border-warningColor border-2 font-paragraph rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl"
          onClick={() => setIsConfirmDeleteModale(true)}
        >
          {data.deleteButton}
        </button>
      </form>
      <article className="p-1 my-8 w-full text-center h-fit border-4 border-darkColor vmd:px-4 lg:w-[45vw]  lg:px-4 lg:pb-4 xl:h-fit 2xl:w-[48vw]">
        <h4 className="text-2xl break-words col-span-3 text-center rounded font-title text-darkColor vmd:text-3xl ">
          {data.userVehicle}
        </h4>
        <section className="text-md text-darkColor font-paragraph mt-8 grid gap-2 grid-cols-3 border-4 border-darkColor">
          <p>{actualUser.brand_label}</p>
          <p className="h-12 border-r-4 border-darkColor border-l-4">
            {actualUser.model_label}
          </p>
          <p>{actualUser.socket_label}</p>
        </section>
      </article>
    </fieldset>
  );
}
