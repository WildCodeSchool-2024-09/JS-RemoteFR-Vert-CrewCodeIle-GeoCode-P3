import { useState } from "react";
import { Outlet } from "react-router-dom";
import ModaleContact from "./components/ModaleContact";
import NavBar from "./components/NavBar";

export default function App() {
  // Etat de la modale du formulaire de contact
  const [showContactModale, setShowContactModale] = useState<boolean>(false);

  return (
    <>
      <NavBar
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
      />
      <ModaleContact
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
      />
      <Outlet />
    </>
  );
}
