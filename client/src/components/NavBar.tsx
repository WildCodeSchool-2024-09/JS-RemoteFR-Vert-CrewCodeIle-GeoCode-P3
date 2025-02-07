import { useState } from "react";
import { createPortal } from "react-dom";
import data from "../assets/data/navbar.json";
import type { ContactModaleProps } from "../assets/definition/lib";
import carIcon from "../assets/images/car.png";
import contactIcon from "../assets/images/contact.png";
import logo from "../assets/images/logo.png";
import mapIcon from "../assets/images/map.png";
import userIcon from "../assets/images/user.png";

import { useAuth } from "../context/userContext";
import ModalProfil from "./ModalProfil";
import ModalUserVehicule from "./ModalUserVehicule";

export default function NavBar({
  showContactModale,
  setShowContactModale,
}: ContactModaleProps) {
  // Data of the navbar
  const navBarData = data;
  const navBarIcons = [mapIcon, userIcon, carIcon, contactIcon];
  const [showProfilModal, setShowProfilModal] = useState<boolean>(false);

  const handleClickModalProfil = () => setShowProfilModal(false);
  const { userInfo } = useAuth();
  const [openVehiculeModal, setOpenVehiculeModal] = useState(false);

  return (
    <>
      <nav className="flex h-10 justify-center z-[1000] fixed bottom-4 w-full lg:top-0 lg:bottom-auto lg:justify-between lg:bg-accentColor lg:h-28 lg:z-[1020]">
        <img src={logo} alt="logo" className="hidden lg:inline" />
        <ul className="h-full flex items-center justify-around w-11/12 rounded-full shadow-md shadow-darkColor bg-darkColor lg:bg-transparent lg:shadow-none lg:w-1/2">
          {navBarData.map((e, i) => (
            <li key={e.id}>
              <button
                type="button"
                className={
                  e.name === navBarData[0].name
                    ? "flex lg:hidden"
                    : "flex lg:justify-center lg:bg-interestColor lg:py-3 lg:min-w-28 lg:max-w-28 lg:rounded-full lg:shadow-md lg:shadow-darkColor lg:font-title lg:text-lightColor lg:active:bg-darkColor"
                }
                onClick={() => {
                  if (userInfo && e.name === navBarData[1].name) {
                    setShowProfilModal(!showProfilModal);
                  } else if (e.name === navBarData[3].name) {
                    setShowContactModale(!showContactModale);
                  } else if (userInfo && e.name === navBarData[2].name) {
                    setOpenVehiculeModal(!openVehiculeModal);
                  }
                }}
              >
                <img
                  alt={e.name}
                  src={navBarIcons[i]}
                  className="h-8 lg:hidden"
                />
                <p className="hidden lg:inline-block">{e.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {showProfilModal &&
        createPortal(
          <ModalProfil
            showProfilModal={showProfilModal}
            closeModal={handleClickModalProfil}
          />,
          document.body,
        )}
      {openVehiculeModal &&
        createPortal(
          <ModalUserVehicule closeModal={() => setOpenVehiculeModal(false)} />,
          document.body,
        )}
    </>
  );
}
