import { Power } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import ModalLogin from "./ModalLogin";

export default function Logbutton() {
  const { logout } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const handleClickLog = () => setOpenLogin(!openLogin);
  const handleClickModalLogin = () => {
    setOpenModalLogin(!openModalLogin);
    setOpenLogin(false);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setOpenLogin(false);
    navigate("/home");
  };

  return (
    <>
      {openModalLogin &&
        createPortal(
          <ModalLogin closeModal={handleClickModalLogin} />,
          document.body,
        )}
      <section className=" z-[2000] w-full absolute top-8 left-2">
        <button
          className="bg-interestColor rounded-full p-1"
          onClick={handleClickLog}
          type="button"
        >
          <Power size={36} color="white" />
        </button>
        {openLogin && (
          <nav className="flex flex-col absolute border border-interestColor bg-interestColor text-white text-left py-2 px-2 rounded-lg left-2">
            <button
              className="border-b-2 pb-1"
              onClick={handleClickModalLogin}
              type="button"
            >
              se connecter
            </button>
            <button onClick={handleLogout} type="button">
              se deconnecter
            </button>
          </nav>
        )}
      </section>
    </>
  );
}
