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

  // disconnect button
  const handleDisconnect = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      toast.error("une erreur est survenue.");
    }
  };

  return (
    <main className="bg-lightColor">
      <nav className="flex justify-between p-2">
        <h2 className="py-4 text-xl font-title text-center text-darkColor vsm:text-3xl md:text-4xl md:text-left md:ml-4">
          Bonjour Admin
        </h2>
        <button
          type="button"
          className="bg-disconnectDark bg-contain py-4 px-3.5 w-16 h-16 border-darkColor border-2 rounded-lg active:bg-darkColor active:bg-disconnectLight"
          onClick={handleDisconnect}
        />
      </nav>
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
    </main>
  );
}
