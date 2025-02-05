import { useEffect, useState } from "react";
import type { UserVehiculeProps } from "../assets/definition/lib";

export default function ModalListVehicule({
  setVehiculeId,
  closeModal,
}: { setVehiculeId: (s: number) => void; closeModal: () => void }) {
  const [userVehicules, setUserVehicules] = useState<UserVehiculeProps[]>();
  const id = 15;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/all/vehicule/${id}`)
      .then((res) => res.json())
      .then((data) => setUserVehicules(data));
  }, []);

  const handleClickSelectCar = (id: number) => {
    setVehiculeId(id);
    closeModal();
  };

  return (
    <>
      <section className=" w-[54vh] mx-2 border border-interestColor absolute top-52 bg-lightColor z-[2000] ">
        <table>
          <thead>
            <tr className="h-16 lg:text-2xl">
              <th className="border-2 w-1/4 border-interestColor ">Marque</th>
              <th className="border-2 w-1/4 border-interestColor ">Modèle</th>
              <th className="border-2 w-1/4 border-interestColor ">Prise</th>
              <th className="border-2 w-1/4 border-interestColor ">
                Seléctionner
              </th>
            </tr>
          </thead>
          <tbody>
            {userVehicules ? (
              userVehicules.map((u) => {
                return (
                  <tr
                    className="border-2 border-interestColor text-center"
                    key={u.id}
                  >
                    <td className="border-2 border-interestColor ">
                      {u.brand}
                    </td>
                    <td className="border-2 border-interestColor ">
                      {u.model}
                    </td>
                    <td className="border-2 border-interestColor ">
                      {u.socket}
                    </td>
                    <td className="border-2 border-interestColor ">
                      <button
                        className="border-interestColor  mx-3 my-1 border px-2 mt-2 rounded-3xl bg-interestColor text-white py-1"
                        onClick={() => handleClickSelectCar(u.id)}
                        type="button"
                      >
                        Choisir
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan={3} className="lg:text-4xl">
                    Aucun véhicule trouvé
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
