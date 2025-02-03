import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

export default function UpdateStationsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/admin");
  };

  const handleFileChange = async (event: React.ChangeEvent) => {
    event.preventDefault();
    setMessage("Mise à jour en cours...");
    setLoading(true);
    const target = event.target as HTMLInputElement;
    const formData = new FormData();
    if (target.files?.length) {
      formData.append("file", target.files[0]);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/uploadStations`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(" ❌ Erreur : la mise à jour à échoué");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-72 lg:w-[500px] p-2.5 border flex align-center flex-col flex-1 border-gray-300 rounded shadow-md bg-[rgba(0, 0, 0, 0.1)] bg-[rgba(240,248,255,0.1)] absolute left-[50%] top-2 lg:top-40 -translate-x-1/2">
        <h1 className="text-2xl ">Mise à jour des bornes de recharge</h1>
        <h2 className="text-base italic">
          Le fichiers sont disponibles sur{" "}
          <a
            className="text-blue-500 font-paragraph"
            href="https://www.data.gouv.fr/fr/datasets/fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques/"
            target="blank"
          >
            ce lien
          </a>
        </h2>
      </div>
      <div className="w-72 lg:w-[500px] p-2.5 border border-gray-300 rounded shadow-md bg-[rgba(0, 0, 0, 0.1)] bg-[rgba(240,248,255,0.1)] absolute  left-[50%] top-2 lg:top-72 -translate-x-1/2">
        <input
          className="block w-full font-paragraph text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-[#525B5A] dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          size={40}
          onChange={handleFileChange}
        />
      </div>
      <div className="w-72 lg:w-[500px] p-2.5 font-paragraph flex flex-row items-center absolute left-[50%] top-2 lg:top-[340px] -translate-x-1/2">
        <PulseLoader
          color="#21A89A"
          loading={loading}
          margin={2}
          size={8}
          speedMultiplier={1}
        />
        {message === "" ? "" : message}
      </div>
      <div>
        <button
          type="button"
          onClick={handleOnClick}
          className="py-2.5 px-5 me-2 mb-2 font-paragraph text-lg font-medium text-white focus:outline-none rounded-full dark:bg-[#525B5A] absolute  left-[50%] top-2 lg:top-[470px] -translate-x-1/2"
        >
          Retour
        </button>
      </div>
    </>
  );
}
