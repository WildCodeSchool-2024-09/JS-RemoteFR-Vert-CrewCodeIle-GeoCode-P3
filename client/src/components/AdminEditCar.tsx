import { useEffect } from "react";
import { useForm } from "react-hook-form";

import data from "../assets/data/adminCars.json";
import errorMessage from "../assets/data/errorMessage.json";

import type { AdminVehiculeProps } from "../assets/definition/lib";

export default function AdminEditCar({
  isAddCarModale,
  setIsAddCarModale,
  actualBrandAndModel,
  handleAddVehicle,
  isDeleteCarModale,
  setIsDeleteCarModale,
  setIsConfirmDeleteModale,
  isConfirmDeleteModale,
}: {
  isAddCarModale: boolean;
  setIsAddCarModale: (bool: boolean) => void;
  isDeleteCarModale: boolean;
  setIsDeleteCarModale: (bool: boolean) => void;
  actualBrandAndModel: Partial<AdminVehiculeProps> | null;
  handleAddVehicle: (admin: AdminVehiculeProps) => void;
  setIsConfirmDeleteModale: (bool: boolean) => void;
  isConfirmDeleteModale: boolean;
}) {
  const defaultValues = {
    brand: actualBrandAndModel?.brand || "",
    model: actualBrandAndModel?.model || "",
    socket: actualBrandAndModel?.socket || "",
  };

  // Call useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminVehiculeProps>({ defaultValues });

  useEffect(() => {
    if (actualBrandAndModel) {
      reset({
        brand: actualBrandAndModel.brand || "",
        model: actualBrandAndModel.model || "",
        socket: actualBrandAndModel.socket || "",
      });
    }
  }, [actualBrandAndModel, reset]);

  const onSubmitAndReset = (data: AdminVehiculeProps) => {
    handleAddVehicle(data);
    reset({
      brand: "",
      model: "",
      socket: "",
    });
  };

  const array = [];
  if (actualBrandAndModel) {
    array.push(actualBrandAndModel);
  }
  return (
    <article
      className={`py-16 grid grid-cols-3 p-2 z-10 absolute w-11/12 h-[130vw] rounded-lg transform duration-1000 ease-in-out bg-lightColor ${isAddCarModale || isDeleteCarModale ? "translate-x-0 " : "translate-x-full opacity-0 z-0"} ${isConfirmDeleteModale ? "opacity-0" : ""} sm:h-[90vw] md:h-[50vw] md:w-1/2 md:right-2`}
    >
      <form
        onSubmit={handleSubmit(onSubmitAndReset)}
        className="col-span-3 h-full grid grid-cols-3 p-2 gap-2 text-darkColor"
      >
        {isAddCarModale && (
          <button
            type="button"
            onClick={() => {
              setIsAddCarModale(!isAddCarModale);
              reset({
                brand: "",
                model: "",
                socket: "",
              });
            }}
            className="absolute top-2 h-12 w-20 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {data.returnButton}
          </button>
        )}
        {isDeleteCarModale && (
          <button
            type="button"
            onClick={() => {
              setIsDeleteCarModale(!isDeleteCarModale);
              reset({
                brand: "",
                model: "",
                socket: "",
              });
            }}
            className="absolute top-2 h-12 w-20 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {data.returnButton}
          </button>
        )}
        <h2 className="col-span-3 text-center font-title text-xl mb-2">
          {isAddCarModale ? data.newCar : data.deleteModel}
        </h2>
        <p className="pointer-events-none text-center col-span-3 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.brand} className="font-paragraph text-lg h-8">
          {data.brand}:
        </label>
        <input
          type="text"
          id={data.brand}
          defaultValue={actualBrandAndModel?.brand || ""}
          disabled={isDeleteCarModale}
          className="rounded h-8 col-span-2"
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
        <p className="pointer-events-none text-center col-span-3 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.model} className="font-paragraph text-lg h-8">
          {data.model}:
        </label>
        <input
          type="text"
          id={data.model}
          defaultValue={actualBrandAndModel?.model || ""}
          disabled={isDeleteCarModale}
          className="rounded h-8 col-span-2"
          {...register("model", {
            required: errorMessage.required,
            minLength: {
              value: 2,
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
        <p className="pointer-events-none text-center col-span-3 text-sm text-red-800 font-paragraph">
          {errors.brand?.message}
        </p>
        <label htmlFor={data.socket} className="font-paragraph text-lg h-8">
          {data.socket}:
        </label>
        <input
          type="text"
          id={data.socket}
          defaultValue={actualBrandAndModel?.socket || ""}
          disabled={isDeleteCarModale}
          className="rounded h-8 col-span-2"
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
        {isAddCarModale && (
          <button
            type="submit"
            className="col-start-2 font-paragraph h-10 mt-5 text-lightColor bg-green-600 rounded-lg hover:scale-105 active:bg-green-200 active:text-darkColor vsm:text-xl"
          >
            {data.addButton}
          </button>
        )}
        {isDeleteCarModale && (
          <button
            type="button"
            className="col-start-2 font-paragraph h-10 mt-5 text-lightColor bg-warningColor rounded-lg hover:scale-105 active:bg-red-300 active:text-darkColor vsm:text-xl"
            onClick={() => setIsConfirmDeleteModale(true)}
          >
            {data.deleteButton}
          </button>
        )}
      </form>
    </article>
  );
}
