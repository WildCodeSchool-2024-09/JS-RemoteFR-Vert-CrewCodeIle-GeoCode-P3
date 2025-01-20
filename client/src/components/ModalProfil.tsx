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
            <figcaption className="mt-4 text-2xl w-48 text-center ">
              Bonjour {userInfo[0].firstName}
            </figcaption>
          </figure>
          <article className="ml-4">
            <div className="flex">
              <h2 className="mb-4  text-interestColor">Nom</h2>
              <h3 className="ml-8">{userInfo[0].lastName}</h3>
            </div>
            <div className="flex">
              <h2 className="mb-4  text-interestColor">Prénom</h2>
              <h3 className="ml-8">{userInfo[0].firstName}</h3>
            </div>
            <div className="flex">
              <h2 className="mb-4  text-interestColor">Date de naissance</h2>
              <h3 className="ml-8">""</h3>
            </div>
            <div className="flex">
              <h2 className="mb-4  text-interestColor">Ville</h2>

              <h3 className="ml-8">{userInfo[0].city}</h3>
            </div>
            <div className="flex">
              <h2 className="mb-4  text-interestColor">Code postal</h2>
              <h3 className="ml-8">{userInfo[0].zipCode}</h3>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
