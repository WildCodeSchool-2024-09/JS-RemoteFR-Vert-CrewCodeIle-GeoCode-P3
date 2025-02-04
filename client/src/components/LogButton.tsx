import { Power, UserRound } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import ModalLogin from "./ModalLogin";

export default function Logbutton() {
  const { logout, userInfo } = useAuth();

  const [openModalLogin, setOpenModalLogin] = useState(false);

  const handleClickModalLogin = () => {
    setOpenModalLogin(!openModalLogin);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();

    navigate("/home");
  };

  return (
    <>
      {openModalLogin &&
        createPortal(
          <ModalLogin closeModal={handleClickModalLogin} />,
          document.body,
        )}
      <section className=" z-[600]  absolute top-6 left-[47vh]">
        {!userInfo ? (
          <button
            className="bg-interestColor rounded-full p-1"
            type="button"
            onClick={handleClickModalLogin}
          >
            <UserRound size={36} color="white" />
          </button>
        ) : (
          <button
            className="bg-interestColor rounded-full p-1"
            type="button"
            onClick={handleLogout}
          >
            <Power size={36} color="white" />
          </button>
        )}
      </section>
    </>
  );
}
