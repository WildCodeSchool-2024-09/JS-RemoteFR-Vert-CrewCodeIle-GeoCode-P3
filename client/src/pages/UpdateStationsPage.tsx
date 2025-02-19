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
    <section className="flex flex-col gap-4 h-screen justify-center items-center lg:justify-start lg:mt-28">
      <div className="w-[360px] lg:w-[500px] p-2.5 border flex flex-col border-gray-300 rounded shadow-md bg-light">
        <h1 className="font-paragraph text-[18px] lg:font-paragraph lg:text-2xl ">
          Mise à jour des bornes de recharge
        </h1>
        <h2 className="font-paragraph text-[14px] lg:font-paragraph lg:text-base italic">
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
      <div className="w-[360px] lg:w-[500px] p-2.5 border border-gray-300 rounded shadow-md bg-[rgba(0, 0, 0, 0.1)] bg-light">
        <input
          className="block w-full font-paragraph text-sm lg:font-paragraph lg:text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-[#525B5A] dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          size={40}
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-10 lg:w-[500px] p-2.5 font-paragraph flex flex-row justify-center items-center">
        <PulseLoader
          color="#21A89A"
          loading={loading}
          margin={2}
          size={8}
          speedMultiplier={1}
        />
        <p className="text-center">{message === "" ? "" : message}</p>
      </div>
      <button
        type="button"
        onClick={handleOnClick}
        className="inline-block mr-2 w-1/2 lg:w-1/6 mb-2 p-1 font-paragraph border-solid border-2 text-darkColor border-darkColor rounded-lg hover:scale-105 active:bg-darkColor active:text-lightColor vsm:text-xl vsm:border-2"
      >
        Retour
      </button>
    </section>
  );
}
