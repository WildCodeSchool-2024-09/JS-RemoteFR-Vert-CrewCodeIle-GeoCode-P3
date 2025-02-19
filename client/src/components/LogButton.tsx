import { Power, UserRound } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/userContext";
import ModalLogin from "./ModalLogin";

export default function Logbutton() {
  const { isConnected, clearUser } = useAuth();

  const [openModalLogin, setOpenModalLogin] = useState(false);

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        clearUser(data.authentification);
      });
  };

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
      <section className=" z-[600] absolute top-4 right-[2vw] xl:z-[1600] xl:top-36 xl:left-[96vw] ">
        {!isConnected ? (
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
