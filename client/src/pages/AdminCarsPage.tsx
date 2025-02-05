import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import dataMenu from "../assets/data/adminCars.json";
import data from "../assets/data/adminContact.json";

export default function AdminVehiclePage() {
  // State of modale edit
  const [isEditCarModale, setIsEditCarModale] = useState(false);

  // State of modale edit
  const [isAddCarModale, setIsAddCarModale] = useState(false);

  return (
    <>
      <main
        className={` overflow-scroll h-[100vh] w-full p-2 xl:p-4 ${isEditCarModale || isAddCarModale ? "bg-opacity-30 bg-black" : "bg-lightColor"}`}
      >
        <nav>
          <Link
            to="/admin"
            className="inline-block w-full text-center mr-2 mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {data.adminHomeButton}
          </Link>
          <Link
            to="/admin/cars/brand-model"
            className="inline-block mr-2 w-full text-center mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {dataMenu.brandsAndModels}
          </Link>
          <Link
            to="/admin/cars/user-cars"
            className="inline-block mr-2 w-full text-center p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {dataMenu.userCars}
          </Link>
        </nav>
        <article className="flex gap-8">
          <Outlet
            context={{
              isEditCarModale,
              setIsEditCarModale,
              isAddCarModale,
              setIsAddCarModale,
            }}
          />
        </article>
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </main>
    </>
  );
}
