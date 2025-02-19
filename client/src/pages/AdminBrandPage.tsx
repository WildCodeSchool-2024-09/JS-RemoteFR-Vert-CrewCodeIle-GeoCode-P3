import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import type { AdminVehiculeProps } from "../assets/definition/lib";
import AdminEditCar from "../components/AdminEditCar";
import ConfirmDelete from "../components/ConfirmDelete";

import data from "../assets/data/adminCars.json";

type AdminModaleProps = {
  isDeleteCarModale: boolean;
  setIsDeleteCarModale: (boolean: boolean) => void;
  isAddCarModale: boolean;
  setIsAddCarModale: (boolean: boolean) => void;
};

export default function AdminAddBrandPage() {
  const {
    isAddCarModale,
    setIsAddCarModale,
    isDeleteCarModale,
    setIsDeleteCarModale,
  } = useOutletContext<AdminModaleProps>();

  // State of modale confirm delete
  const [isConfirmDeleteModale, setIsConfirmDeleteModale] = useState(false);

  // State for store all brands and models
  const [brandsAndModelsList, setBrandsAndModelsList] = useState<
    AdminVehiculeProps[] | []
  >([]);

  // State for store the selected brands and his model
  const [actualBrandAndModel, setActualBrandAndModel] =
    useState<Partial<AdminVehiculeProps> | null>(null);

  // State and Button for switch desabled
  const [isDisabled, setIsDisabled] = useState<number | null>(null);
  actualBrandAndModel;
  // Get brand and models tables
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/brands-and-models`)
      .then((res) => res.json())
      .then((data) => {
        setBrandsAndModelsList(data);
      });
  }, []);

  // On click add a new brand, model and socket
  const handleAddVehicle = async (data: Partial<AdminVehiculeProps>) => {
    //Check if brand exist
    const isExistingBrand = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.brand === data.brand,
    );
    const isExistingModel = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.model === data.model,
    );
    const isExistingSocket = brandsAndModelsList.some(
      (e: AdminVehiculeProps) => e.socket === data.socket,
    );
    const isExistingVehicle: Partial<AdminVehiculeProps> = {};

    let updateVehicle = {};

    // Check if brand exist: if not exist push on isExistingVehicle, update id to -1 for check on database else set brand to null and add id_brand for check on database
    if (!isExistingBrand) {
      isExistingVehicle.brand = data?.brand;
      updateVehicle = { ...data, id_brand: -1 };
    } else {
      const foundBrand = brandsAndModelsList.find(
        (e) => e.brand === data.brand,
      );
      updateVehicle = {
        ...data,
        id_brand: foundBrand?.id_brand,
        brand: null,
      };
    }

    // Check if socket exist: if not exist push on isExistingVehicle, update id to -1 for check on database else set socket to null and add id_socket for check on database
    if (!isExistingSocket) {
      isExistingVehicle.socket = data?.socket;
      updateVehicle = { ...updateVehicle, id_socket: -1 };
    } else {
      const foundSocket = brandsAndModelsList.find(
        (e) => e.socket === data.socket,
      );
      updateVehicle = {
        ...updateVehicle,
        id_socket: foundSocket?.id_socket,
        socket: null,
      };
    }

    // Check if model exist: if not exist push on isExistingVehicle, update id to -1 for check on database else set model to null and add id_model for check on database
    if (!isExistingModel) {
      isExistingVehicle.model = data?.model;
      updateVehicle = { ...updateVehicle, id_model: -1 };
    } else {
      const foundModel = brandsAndModelsList.find(
        (e) => e.model === data.model,
      );
      updateVehicle = {
        ...updateVehicle,
        id_model: foundModel?.id_model,
        model: null,
      };
    }

    // If brand, model and socket exist lauch a toast and return
    if (Object.keys(isExistingVehicle).length === 0) {
      toast.warning("Ce vehicule existe déjà dans la base de données.");
      return;
    }

    try {
      // Add to database
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/brands-and-models/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateVehicle),
        },
      );

      // Get new id from database
      const insertId = await response.json();

      if (response.ok) {
        // Update updateVehicle
        const { id_brand, id_model, id_socket } = insertId;
        updateVehicle = {
          ...data,
          id_brand: id_brand,
          id_model: id_model,
          id_socket: id_socket,
        };
        // Add to new current updateList
        const updateList: AdminVehiculeProps[] = [
          ...brandsAndModelsList,
          updateVehicle as AdminVehiculeProps,
        ];
        // Set to actual list state
        setBrandsAndModelsList(updateList);
        setIsAddCarModale(false);
      }
    } catch (err) {
      toast.error("Une erreur est survenue.");
    }
  };

  // On click delete the model
  const handleDeleteVehicle = async (id: number) => {
    const findBrand = brandsAndModelsList.find((e) => e.id_model === id);

    // Array of all brands and models without current model, for uptade the state if promise success
    const brandsAndModelsListFiltered = brandsAndModelsList.filter(
      (e) => e.id_model !== id,
    );
    // List if the same brands of current model
    const brandsListFiltered = brandsAndModelsListFiltered.filter(
      (e) => e.id_brand === findBrand?.id_brand,
    );
    // List if the same sockets of current model
    const socketListFiltered = brandsAndModelsListFiltered.filter(
      (e) => e.id_socket === findBrand?.id_socket,
    );

    let vehicleToDelete = {};
    if (vehicleToDelete && brandsListFiltered.length > 0) {
      vehicleToDelete = {
        ...findBrand,
        // Set false, don't need to delete brand on database
        is_brand_delete: false,
      };
    } else {
      // Set true, need to delete brand on database
      vehicleToDelete = { ...findBrand, is_brand_delete: true };
    }
    if (socketListFiltered.length === 0) {
      // Set false, don't need to delete socket on database
      vehicleToDelete = { ...vehicleToDelete, is_socket_delete: true };
    } else {
      // Set true, need to delete socket on database
      vehicleToDelete = { ...vehicleToDelete, is_socket_delete: false };
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/brands-and-models/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleToDelete),
    })
      .then((res) => {
        if (res.status === 204) {
          setBrandsAndModelsList(brandsAndModelsListFiltered);
          setIsConfirmDeleteModale(false);
          setIsDeleteCarModale(false);
          toast.success("Véhicule supprimé");
        }
      })
      .catch(() => toast.error("Une erreur est survenue"));
  };

  // On click selected row was save on state
  const handleClick = (e: AdminVehiculeProps) => {
    setActualBrandAndModel(e);
  };

  return (
    <main className="overflow-auto pb-8 flex h-[100vh] flex-col w-full gap-2 items-center lg:border-darkColor">
      <h2 className="text-2xl text-center mb-2 font-title text-darkColor mt-4 lg:text-4xl">
        {data.adminListModelBrand}
      </h2>
      <article className="border-4 w-full border-darkColor grid grid-cols-12">
        <h3 className="col-span-4 text-center font-title py-2 text-darkColor text-lg border-solid border-darkColor border-r-4 lg:text-2xl">
          {data.brand}
        </h3>
        <h3 className="col-span-5 text-center font-title py-2 text-darkColor text-lg border-r-4 border-darkColor lg:text-2xl">
          {data.model}
        </h3>
        <h3 className="text-center col-span-3 font-title py-2 text-darkColor text-lg border-darkColor lg:text-2xl">
          {data.socket}
        </h3>
        {brandsAndModelsList?.map((e: AdminVehiculeProps, i) => (
          <button
            type="button"
            key={`${e.id_model}-${i}`}
            className={`col-span-12 h-12 text-sm grid grid-cols-12 text-darkColor hover:text-lightColor ${actualBrandAndModel === e ? "bg-accentColor hover:bg-interestColor" : "bg-lightColor hover:bg-darkColor"} ${isDeleteCarModale || isAddCarModale ? "bg-opacity-25 pointer-events-none" : "bg-lightColor"} `}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              handleClick(e);
              setIsDisabled(isDisabled === e.id_model ? null : e.id_model);
              setIsDeleteCarModale(true);
            }}
          >
            <p className="border-solid col-span-4 h-full font-paragraph text-center border-darkColor border-r-4 border-t-4">
              {e.brand}
            </p>
            <p className="text-sm col-span-5 border-darkColor h-full border-r-4 border-t-4 text-center break-words">
              {e.model}
            </p>
            <p className="border-darkColor h-full col-span-3 border-t-4 text-center">
              {e.socket}
            </p>
          </button>
        ))}
        <button
          type="button"
          className={`fixed z-10 right-2 top-2 text-center bg-interestColor w-1/3 h-10 font-paragraph text-lightColor rounded-lg hover:scale-105 active:bg-accentColor active:text-darkColor vsm:text-xl ${isAddCarModale || isDeleteCarModale ? "hidden" : "inline"}`}
          onClick={() => {
            setIsAddCarModale(!isAddCarModale);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {data.addButton}
        </button>{" "}
      </article>
      {brandsAndModelsList?.length === 0 && (
        <p className="text-center pt-4 font-paragraph text-darkColor text-xl">
          {data.noVehicle}
        </p>
      )}
      <AdminEditCar
        isAddCarModale={isAddCarModale}
        setIsAddCarModale={setIsAddCarModale}
        isDeleteCarModale={isDeleteCarModale}
        setIsDeleteCarModale={setIsDeleteCarModale}
        actualBrandAndModel={actualBrandAndModel}
        handleAddVehicle={handleAddVehicle}
        setIsConfirmDeleteModale={setIsConfirmDeleteModale}
        isConfirmDeleteModale={isConfirmDeleteModale}
      />
      <ConfirmDelete
        handleDelete={handleDeleteVehicle}
        isConfirmDeleteModale={isConfirmDeleteModale}
        setIsConfirmDeleteModale={setIsConfirmDeleteModale}
        actualValue={actualBrandAndModel && actualBrandAndModel}
      />
    </main>
  );
}
