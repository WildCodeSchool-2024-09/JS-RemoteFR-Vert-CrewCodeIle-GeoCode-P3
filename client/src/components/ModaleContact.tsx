import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import data from "../assets/data/dropdownmenu.json";
import type {
  ContactFormProps,
  ContactModaleProps,
} from "../assets/definition/lib";
import ModaleConfirmation from "./ModaleConfirmation";

export default function ({
  showContactModale,
  setShowContactModale,
}: ContactModaleProps) {
  // Call useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      lastname: "",
      firstname: "",
      email: "",
      subject: "Informations",
      message: "",
    },
  });

  // Use a callback for save the handle focus
  const handleFocus = useCallback((e: FocusEvent) => {
    // The element I focus, all input in this case
    const inputField = e.target as HTMLElement;
    // The treatment I want to execute, a scroll in this case, with smooth behavior, and on the center of the input
    setTimeout(() => {
      inputField.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  }, []);

  useEffect(() => {
    // I select all the input of the modale
    const inputs = document.querySelectorAll("input, select, textarea");

    // I add an event listener
    for (const input of inputs) {
      input.addEventListener("focus", handleFocus as EventListener);
    }

    // I remove the listener when the component dismount
    return () => {
      for (const input of inputs) {
        input.removeEventListener("focus", handleFocus as EventListener);
      }
    };
  }, [handleFocus]);

  // Use a state for open the modal of confirmation
  const [showConfirmationContactModale, setShowConfirmationContactModale] =
    useState<boolean>(false);

  // Add to database
  const onSubmitForm = (dataForm: ContactFormProps) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then(() => {
        setShowConfirmationContactModale(true);
        reset({});
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  };

  return (
    <section
      id="contact-header"
      className={`h-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[1010] transition-all duration-1000 ${
        showContactModale
          ? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0 overflow-auto"
          : "opacity-0 pointer-events-none overflow-clip"
      } ${showConfirmationContactModale ? "fixed" : "absolute"}`}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={`top-5 h-[150vw] overflow-hidden bg-lightColor absolute gap-2 p-6 pb-16 pt-3 grid grid-cols-3 w-11/12 grid-rows-40 rounded-lg shadow-lg transform duration-1000 ease-in-out vsm:h-[175vw] vmd:h-[180vw] sm:h-[110vw] sm:top-28 sm:w-4/6 lg:w-1/3 lg:h-[72vw] lg:left-8 lg:top-1/4 xl:h-[60vw] ${showContactModale ? "translate-y-0" : "translate-y-full"} ${
          showConfirmationContactModale && "hidden"
        }`}
      >
        <h2 className="text-3xl font-title text-center text-darkColor col-span-3 row-span-5 vmd:p-2 vmd:text-4xl">
          Contactez-nous
        </h2>
        <label
          htmlFor="lastname"
          className="text-l font-paragraph h-fit text-darkColor"
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
          placeholder="Doe"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit col-span-2 w-full border ${errors.lastname ? "border-red-800 border-2" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3">
          {errors.lastname?.message}
        </p>
        <label
          htmlFor="fistname"
          className="text-l font-paragraph h-fit text-darkColor"
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
          placeholder="John"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit w-full col-span-2 border ${errors.firstname ? "border-red-800 border-2" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3">
          {errors.firstname?.message}
        </p>
        <label
          htmlFor="email"
          className="text-l h-fit font-paragraph text-darkColor"
        >
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Ce champ est requis.",
            minLength: {
              value: 7,
              message: "Le minimum de caractères est de 7.",
            },
            maxLength: {
              value: 50,
              message: "Trop de caractères.",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
              message: "L'email est invalide.",
            },
          })}
          placeholder="john-doe@mail.com"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit col-span-2 w-full border ${errors.email ? "border-red-800 border-2" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3">
          {errors.email?.message}
        </p>
        <label
          htmlFor="subject"
          className="text-l font-paragraph h-fit text-darkColor vsm:row-span-4"
        >
          Sujet:
        </label>
        <select
          {...register("subject")}
          id="subject"
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit w-full col-span-2 row-span-3 text-darkColor"
        >
          {data.map((e) => (
            <option
              key={e.id}
              value={e.name}
              className="focus-visible:outline-dashed font-paragraph text-sm"
            >
              {e.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="message"
          className="text-l font-paragraph col-span-3 row-span-3 text-darkColor vsm:row-span-2"
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
          placeholder="Entrez votre message ici"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor resize-none row-span-7 h-20 col-span-3 vsm:row-span-10 vsm:h-36 vmd:h-44 sm:h-48 xl:row-span-12 xl:h-52 ${errors.message ? "border-red-800 border-2" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 pt-2 row-span-4 text-sm text-red-800 font-paragraph sm:row-span-2">
          {errors.message?.message}
        </p>
        <button
          type="submit"
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-darkColor row-span-5 font-paragraph rounded-full bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor sm:row-span-4 lg:row-span-3"
        >
          Envoyer
        </button>
        <button
          type="button"
          onClick={() => setShowContactModale(!showContactModale)}
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-darkColor row-span-5 font-paragraph rounded-full col-start-3 bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor sm:row-span-4 lg:row-span-3"
        >
          Fermer
        </button>
      </form>
      <ModaleConfirmation
        showConfirmationContactModale={showConfirmationContactModale}
        setShowConfirmationContactModale={setShowConfirmationContactModale}
        setShowContactModale={setShowContactModale}
      />
    </section>
  );
}
