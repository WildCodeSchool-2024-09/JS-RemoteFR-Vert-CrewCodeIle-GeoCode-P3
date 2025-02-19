import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminLayer() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/checkauth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Veuillez vous reconnecter.");
        }
        return res.json();
      })
      .then((data) => {
        const { checkRole } = data;
        if (!checkRole || !checkRole[0] || checkRole[0].role !== "admin") {
          navigate("/home");
          return;
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
