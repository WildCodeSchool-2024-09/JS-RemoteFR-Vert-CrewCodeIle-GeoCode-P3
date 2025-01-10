import type {
  ContactFormProps,
  ContactModaleProps,
} from "../assets/definition/lib";

import { useState } from "react";
import { useForm } from "react-hook-form";
import data from "../assets/data/dropdownmenu.json";

export default function ({
  showContactModale,
  setShowContactModale,
}: ContactModaleProps) {
  // Logique du si la valeur est false n'apparait pas
  if (!showContactModale) return null;

  // Appel du useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastname: "",
      firstname: "",
      mail: "",
      subject: "",
      message: "",
    },
  });

  // Declaration d'un état pour recuperer les données entrée dans le formulaire
  const [submitContact, setSubmitContact] = useState<ContactFormProps | null>(
    null,
  );
  console.info(submitContact);
  return (
    <section className="relative p-4 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1010] vsm:fixed">
      <form
        onSubmit={handleSubmit((data) => setSubmitContact(data))}
        className={`bg-lightColor p-6 grid grid-cols-2 gap-1 rounded-lg shadow-lg w-full max-w-sm transition-all duration-500 ease-out ${showContactModale ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"}
          absolute bottom-0 left-1/2 transform -translate-x-1/2`}
      >
        <h2 className="text-xl font-title text-center text-darkColor col-span-2 mb-2">
          Contactez-nous
        </h2>
        <label
          htmlFor="lastname"
          className="text-l font-paragraph text-darkColor"
        >
          Nom:
        </label>
        <input
          type="text"
          {...register("lastname", {
            required: "Ce champ est requis.",
            minLength: {
              value: 3,
              message: "Le minimum de caractères est de 3.",
            },
            maxLength: {
              value: 20,
              message: "Trop de caractères.",
            },
            pattern: {
              value: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/g,
              message: "Le nom est invalide.",
            },
          })}
          placeholder="Nom de famille"
          className={`w-full border ${errors.lastname ? "border-red-800" : "border-gray-300"} rounded`}
        />
        <p className="text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.lastname?.message}
        </p>
        <label
          htmlFor="fistname"
          className="text-l font-paragraph text-darkColor"
        >
          Prénom:
        </label>
        <input
          type="text"
          {...register("firstname", {
            required: "Ce champ est requis.",
            minLength: {
              value: 3,
              message: "Le minimum de caractères est de 3.",
            },
            maxLength: {
              value: 20,
              message: "Trop de caractères.",
            },
            pattern: {
              value: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-]+$/g,
              message: "Le prénom est invalide.",
            },
          })}
          placeholder="Prénom"
          className={`w-full border ${errors.lastname ? "border-red-800" : "border-gray-300"} rounded`}
        />
        <p className="text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.firstname?.message}
        </p>
        <label htmlFor="mail" className="text-l font-paragraph text-darkColor">
          Email:
        </label>
        <input
          type="mail"
          {...register("mail", {
            required: "Ce champ est requis.",
            minLength: {
              value: 7,
              message: "Le minimum de caractères est de 3.",
            },
            maxLength: {
              value: 30,
              message: "Trop de caractères.",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
              message: "L'email est invalide.",
            },
          })}
          placeholder="mail"
          className={`w-full border ${errors.lastname ? "border-red-800" : "border-gray-300"} rounded`}
        />
        <p className="text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.mail?.message}
        </p>
        <label
          htmlFor="subject"
          className="text-l font-paragraph text-darkColor"
        >
          Sujet:
        </label>
        <select {...register("subject")} className="mb-2 text-darkColor">
          {data.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="message"
          className="text-l font-paragraph col-span-2 text-darkColor"
        >
          Message:
        </label>
        <textarea
          {...register("message", {
            required: "Ce champ est requis.",
            minLength: {
              value: 30,
              message: "Le minimum de caractères est de 30.",
            },
            maxLength: {
              value: 1000,
              message: "Trop de caractères.",
            },
            pattern: {
              value: /^[a-zA-Z0-9àÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s\.\,?!:;]+$/g,
              message: "Le message est invalide.",
            },
          })}
          placeholder="message"
          className={`h-28 mb-4 col-span-2 w-full border ${errors.lastname ? "border-red-800" : "border-gray-300"} rounded`}
        />
        <p className="text-center col-span-2 text-sm text-red-800 font-paragraph">
          {errors.message?.message}
        </p>
        <button
          type="submit"
          className="px-4 py-2 font-paragraph rounded-full bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor"
        >
          Envoyer
        </button>
        <button
          type="button"
          onClick={() => setShowContactModale(!showContactModale)}
          className="px-4 py-2 font-paragraph rounded-full bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor"
        >
          Fermer
        </button>
      </form>
    </section>
  );
}
