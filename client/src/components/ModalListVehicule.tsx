import { useEffect, useState } from "react";
import type { UserVehiculeProps } from "../assets/definition/lib";

export default function ModalListVehicule() {
  const [userVehicules, setUserVehicules] = useState<UserVehiculeProps[]>();
  const id = 15;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicule/${id}`)
      .then((res) => res.json())
      .then((data) => setUserVehicules(data));
  }, []);

  return (
    <>
      <section className=" w-[50vh] mx-auto border border-interestColor">
        <table>
          <thead>
            <tr>
              <th>Voiture</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Prise</th>
            </tr>
          </thead>
          <tbody>
            {userVehicules
              ? userVehicules.map((u) => {
                  return (
                    <tr key={u.id}>
                      <td>{u.brand}</td>
                      <td>{u.model}</td>
                      <td>{u.socket}</td>
                    </tr>
                  );
                })
              : "Aucun véhicule trouvé"}
          </tbody>
        </table>
      </section>
    </>
  );
}
