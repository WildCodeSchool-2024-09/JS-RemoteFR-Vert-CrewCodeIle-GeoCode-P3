import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import data from "../assets/data/adminCars.json";

import type { AdminVehiculeProps } from "../assets/definition/lib";
import AdminEditCar from "../components/AdminEditCar";

type AdminModaleProps = {
  isEditCarModale: boolean;
  setIsEditCarModale: (boolean: boolean) => void;
  isAddCarModale: boolean;
  setIsAddCarModale: (boolean: boolean) => void;
};

export default function AdminAddBrandPage() {
  const {
    isEditCarModale,
    setIsEditCarModale,
    isAddCarModale,
    setIsAddCarModale,
  }: AdminModaleProps = useOutletContext();

  // State of modale confirm delete
  /*   const [isConfirmDeleteModale, setIsConfirmDeleteModale] = useState(false); */

  // State for store all brands and models
  const [brandsAndModelsList, setBrandsAndModelsList] = useState<
    AdminVehiculeProps[] | []
  >([]);

  // State for store the selected brands and his model
  const [actualBrandAndModel, setActualBrandAndModel] =
    useState<AdminVehiculeProps | null>(null);

  // State and Button for switch desabled
  const [isDisabled, setIsDisabled] = useState<number | null>(null);

  // Get brand and models tables
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/brands-and-models`)
      .then((res) => res.json())
      .then((data) => {
        setBrandsAndModelsList(data);
      });
  }, []);

  // Button edit brand and models tables
  const handleChangeVehicle = async (data: AdminVehiculeProps) => {
    // Add each id
    const addBrandId = {
      ...data,
      id_model: actualBrandAndModel?.id_model,
      id_socket: actualBrandAndModel?.id_socket,
      id_brand: actualBrandAndModel?.id_brand,
    };

    // Verify if model, brand or socket exist
    const isExistingBrand = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.brand === addBrandId.brand,
    );
    const isExistingModel = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.model === addBrandId.model,
    );
    const isExistingSocket = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.socket === addBrandId.socket,
    );

    const updatedData: Partial<AdminVehiculeProps> = {};
    // If the brand exist not exist, update updateData
    if (!isExistingBrand) {
      updatedData.brand = addBrandId.brand;
    }
    // If the brand exist not exist, update updateData
    if (!isExistingModel) {
      updatedData.model = addBrandId.model;
    }
    // If the brand exist not exist, update updateData
    if (!isExistingSocket) {
      updatedData.socket = addBrandId.socket;
    }
    // If the object has no props return and lauch a toast
    if (Object.keys(updatedData).length === 0) {
      toast.warning(
        "Aucune mise à jour nécessaire, aucune propriété modifiée.",
      );
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/brands-and-models/${addBrandId?.id_model}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addBrandId),
        },
      );

      if (response.ok) {
        toast.success("Mise à jour effectuée");
        const updatedList = brandsAndModelsList.map((e: AdminVehiculeProps) => {
          if (
            e.id_brand === addBrandId.id_brand &&
            e.id_model === addBrandId.id_model &&
            e.id_socket === addBrandId.id_socket
          ) {
            return {
              ...e,
              brand: addBrandId.brand,
              model: addBrandId.model,
              socket: addBrandId.socket,
            };
          }
          if (e.id_brand === addBrandId.id_brand) {
            return { ...e, brand: addBrandId.brand };
          }
          if (e.id_model === addBrandId.id_model) {
            return { ...e, model: addBrandId.model };
          }
          if (e.id_socket === addBrandId.id_socket) {
            return { ...e, socket: addBrandId.socket };
          }
          return e;
        });
        // Update state
        setBrandsAndModelsList(updatedList);
        setIsEditCarModale(false);
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  // On click add a new brand and/or model and/or socket

  // On click selected row was save on state
  const handleClick = (e: AdminVehiculeProps) => {
    setActualBrandAndModel(e);
  };

  return (
    <main className="flex flex-col w-full gap-2 items-center lg:border-darkColor pb-6">
      <h2 className="text-2xl text-center mb-2 font-title text-darkColor mt-4 lg:text-4xl">
        {data.adminListModelBrand}
      </h2>
      <article className="overflow-y-auto border-4 w-full border-darkColor grid grid-cols-12">
        <h3 className="col-span-4 text-center font-title py-2 text-darkColor text-lg border-solid border-darkColor border-r-4 lg:text-2xl">
          {data.brand}
        </h3>
        <h3 className="col-span-5 text-center font-title py-2 text-darkColor text-lg border-r-4 border-darkColor lg:text-2xl">
          {data.model}
        </h3>
        <h3 className="text-center col-span-3 font-title py-2 text-darkColor border-r-4 text-lg border-darkColor lg:text-2xl">
          {data.socket}
        </h3>
        {brandsAndModelsList?.map((e: AdminVehiculeProps) => (
          <button
            type="button"
            key={e.id_model}
            className={`col-span-12 h-12 text-sm grid grid-cols-12 text-darkColor hover:text-lightColor ${actualBrandAndModel === e ? "bg-accentColor hover:bg-interestColor" : "bg-lightColor hover:bg-darkColor"} ${isEditCarModale || isAddCarModale ? "bg-opacity-25 pointer-events-none" : "bg-lightColor"} `}
            onClick={() => {
              handleClick(e);
              setIsDisabled(isDisabled === e.id_model ? null : e.id_model);
              setIsEditCarModale(true);
            }}
          >
            <p className="border-solid col-span-4 h-full font-paragraph text-center border-darkColor border-r-4 border-t-4">
              {e.brand}
            </p>
            <p className="text-sm col-span-5 border-darkColor h-full border-r-4 border-t-4 text-center break-words">
              {e.model}
            </p>
            <p className="border-darkColor h-full col-span-3 border-t-4 border-r-4 text-center">
              {e.socket}
            </p>
          </button>
        ))}
        <button
          type="button"
          className={`absolute left-2 bottom-5 text-center bg-interestColor w-1/3 h-12 font-paragraph text-lightColor rounded-lg hover:scale-105 active:bg-accentColor active:text-darkColor vsm:text-xl ${!isAddCarModale && !isEditCarModale ? "z-10" : "z-2"}`}
          onClick={() => setIsAddCarModale(!isAddCarModale)}
        >
          {data.addButton}
        </button>

        {/* <section className="absolute w-full  flex gap-1 ">
          <button
            type="button"
            className={`w-1/3 font-paragraph text-lightColor bg-orange-500 rounded-lg hover:scale-105 active:bg-orange-200 active:text-darkColor transition-opacity duration-1000 vsm:text-xl ${actualBrandAndModel ? "opacity-100" : "opacity-0"}`}
          >
            {data.modifyButton}
          </button>
          <button
            type="button"
            className={`w-1/3 font-paragraph text-lightColor bg-warningColor rounded-lg hover:scale-105 active:bg-red-300 active:text-lightColor transition-opacity duration-1000 vsm:text-xl ${actualBrandAndModel ? "opacity-100" : "opacity-0"}`}
          >
            {data.deleteButton}
          </button>
        </section> */}
      </article>
      <AdminEditCar
        isEditCarModale={isEditCarModale}
        setIsEditCarModale={setIsEditCarModale}
        actualBrandAndModel={actualBrandAndModel}
        handleChangeVehicle={handleChangeVehicle}
      />
      <AdminEditCar
        isEditCarModale={isAddCarModale}
        setIsEditCarModale={setIsAddCarModale}
        actualBrandAndModel={null}
        handleChangeVehicle={handleChangeVehicle}
      />
    </main>
  );
}
