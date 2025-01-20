import { useEffect, useState } from "react";
import type { UserProps } from "../assets/definition/lib";

export default function ModalProfil() {
  const [userInfo, setUserInfo] = useState<UserProps[]>();

  const id = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profil/${id}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  console.info(userInfo);

  return (
    <>
      {userInfo && (
        <section className="z-[1005] absolute top-44 h-3/4 bg-lightColor w-full">
          <figure className="border-white border-8 rounded-full text-center w-36 h-36 mx-auto relative bottom-16">
            <img
              className="rounded-full bg-lightColor "
              src={userInfo[0].photo}
              alt="profil utilisateur"
            />
          </figure>
          <article className="ml-4 text-interestColor">
            <h2 className="mb-4">Nom</h2>
            <h2 className="mb-4">Prénom</h2>
            <h2 className="mb-4">Date de naissance</h2>
            <h2 className="mb-4">Ville</h2>
            <h2 className="mb-4">Code postal</h2>
            <h2 className="mb-4">Nombre de véhicule</h2>
          </article>
        </section>
      )}
    </>
  );
}
