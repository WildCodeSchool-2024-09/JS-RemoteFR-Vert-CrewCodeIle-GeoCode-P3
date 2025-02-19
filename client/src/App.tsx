import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import LogButton from "./components/LogButton";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/userContext";

export default function App() {
  // Use a state: if the state is true, the modale is open then its false the modale is close
  const [showContactModale, setShowContactModale] = useState<boolean>(false);

  const { connected, login } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/checkauth`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        connected(data.authentification);
        login(data.email);
      });
  }, [connected, login]);

  return (
    <>
      <NavBar
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
      />
      <Outlet context={{ showContactModale, setShowContactModale }} />
      <LogButton />
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
