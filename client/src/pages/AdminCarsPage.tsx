import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import data from "../assets/data/adminContact.json";

export default function AdminVehiclePage() {
  // State of modale edit
  const [isDeleteCarModale, setIsDeleteCarModale] = useState(false);

  // State of modale edit
  const [isAddCarModale, setIsAddCarModale] = useState(false);

  return (
    <>
      <main
        className={`h-fit w-full p-2 xl:p-4 ${isDeleteCarModale || isAddCarModale ? "bg-opacity-30 bg-black" : "bg-lightColor"}`}
      >
        <nav>
          <Link
            to="/admin"
            className="inline-block w-1/3 h-10 text-center mr-2 mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
          >
            {data.adminHomeButton}
          </Link>
        </nav>
        <article className="flex gap-8">
          <Outlet
            context={{
              isDeleteCarModale,
              setIsDeleteCarModale,
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
