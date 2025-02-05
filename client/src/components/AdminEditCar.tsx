import { useEffect } from "react";
import { useForm } from "react-hook-form";

import data from "../assets/data/adminCars.json";
import errorMessage from "../assets/data/errorMessage.json";

import type { AdminVehiculeProps } from "../assets/definition/lib";

export default function AdminEditCar({
  isEditCarModale,
  setIsEditCarModale,
  actualBrandAndModel,
  handleChangeVehicle,
}: {
  isEditCarModale: boolean;
  setIsEditCarModale: (bool: boolean) => void;
  actualBrandAndModel: AdminVehiculeProps | null;
  handleChangeVehicle: (admin: AdminVehiculeProps) => void;
}) {
  const isEdit = actualBrandAndModel;
  // Call useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminVehiculeProps>({
    defaultValues: isEdit
      ? {
          brand: actualBrandAndModel?.brand,
          model: actualBrandAndModel?.model,
          socket: actualBrandAndModel?.socket,
        }
      : {},
  });

  useEffect(() => {
    if (actualBrandAndModel) {
      reset({
        brand: actualBrandAndModel.brand,
        model: actualBrandAndModel.model,
        socket: actualBrandAndModel.socket,
      });
    }
  }, [actualBrandAndModel, reset]);

  const onSubmitAndReset = (data: AdminVehiculeProps) => {
    handleChangeVehicle(data);
    reset();
  };

  return (
    <article
      className={`grid grid-cols-3 p-2 bottom-8 z-10 absolute w-11/12 h-3/4 rounded-lg bg-lightColor transform duration-1000 ease-in-out ${isEditCarModale ? "translate-y-0 " : "translate-y-full opacity-0 z-0"}`}
    >
      <form
        onSubmit={handleSubmit(onSubmitAndReset)}
        className="col-span-3 h-full grid grid-cols-2 p-2 gap-2 text-darkColor"
      >
        <button
          type="button"
          onClick={() => setIsEditCarModale(!isEditCarModale)}
          className="h-10 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
        >
          {data.returnButton}
        </button>
        <h2 className="text-center font-title text-xl mb-2 col-span-2 ">
          {isEdit === null ? data.newBrand : data.editBrand}
        </h2>
        <p className="pointer-events-none text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.brand} className="font-paragraph text-lg h-8">
          {data.brand}:
        </label>
        <input
          id={data.brand}
          className="rounded h-8"
          defaultValue={isEdit === null ? "" : actualBrandAndModel?.brand}
          {...register("brand", {
            required: errorMessage.required,
            minLength: {
              value: 3,
              message: errorMessage.minChar,
            },
            maxLength: {
              value: 50,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-Z0-9àÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/g,
              message: errorMessage.lastName,
            },
          })}
        />
        <p className="pointer-events-none text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.model} className="font-paragraph text-lg h-8">
          {data.model}:
        </label>
        <input
          id={data.model}
          className="rounded h-8"
          defaultValue={isEdit === null ? "" : actualBrandAndModel?.model}
          {...register("model", {
            required: errorMessage.required,
            minLength: {
              value: 3,
              message: errorMessage.minChar,
            },
            maxLength: {
              value: 50,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-Z0-9àÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç.-\s]+$/g,
              message: errorMessage.lastName,
            },
          })}
        />
        <p className="pointer-events-none text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.socket} className="font-paragraph text-lg h-8">
          {data.socket}:
        </label>
        <input
          id={data.socket}
          className="rounded h-8"
          defaultValue={isEdit === null ? "" : actualBrandAndModel?.socket}
          {...register("socket", {
            required: errorMessage.required,
            minLength: {
              value: 3,
              message: errorMessage.minChar,
            },
            maxLength: {
              value: 20,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-Z0-9àÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/g,
              message: errorMessage.lastName,
            },
          })}
        />
        <button
          type="submit"
          className={`font-paragraph h-10 mt-5 text-lightColor bg-green-600 rounded-lg hover:scale-105 active:bg-green-200 active:text-darkColor vsm:text-xl ${isEdit !== null ? "hidden" : "inline"}`}
        >
          {data.modifyButton}
        </button>
        <button
          type="submit"
          className={`font-paragraph h-10 mt-5 text-lightColor bg-orange-500 rounded-lg hover:scale-105 active:bg-orange-200 active:text-darkColor vsm:text-xl ${isEdit === null ? "hidden" : "inline"}`}
        >
          {data.modifyButton}
        </button>
        <button
          type="button"
          className="font-paragraph h-10 mt-5 text-lightColor bg-warningColor rounded-lg hover:scale-105 active:bg-red-300 active:text-lightColor vsm:text-xl"
        >
          {data.deleteButton}
        </button>
      </form>
    </article>
  );
}
