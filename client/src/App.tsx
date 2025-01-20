import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";

export default function App() {
  const [showProfilModal, setShowProfilModal] = useState<boolean>(false);

  return (
    <>
      <NavBar
        showProfilModal={showProfilModal}
        setShowProfilModal={setShowProfilModal}
      />
      <Outlet context={{ showProfilModal, setShowProfilModal }} />
    </>
  );
}
