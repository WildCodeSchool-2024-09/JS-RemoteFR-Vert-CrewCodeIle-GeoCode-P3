import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import data from "../assets/data/dropdownmenucontact.json";
import errorMessage from "../assets/data/errorMessage.json";
import type {
  ContactFormProps,
  ContactModaleProps,
} from "../assets/definition/lib";
import ModaleValidateContact from "./ModaleValidateContact";

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
  } = useForm<ContactFormProps>({
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
    // The treatment I want to execute: a scroll in this case, with smooth behavior, and on the center of the input
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
      className={`h-full inset-0 overflow-auto bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[1010] transition-all duration-1000 ${
        showContactModale
          ? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
          : "opacity-0 pointer-events-none"
      } ${showConfirmationContactModale ? "fixed" : "absolute"}`}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={`top-6 h-[135vw] bg-lightColor absolute gap-2 px-6 py-3 grid grid-cols-3 w-11/12 grid-rows-40 rounded-lg shadow-lg transform duration-1000 ease-in-out vsm:h-[160vw] vsm:top-10 vsm:pb-8 vmd:top-16 sm:w-4/6 sm:h-[115vw] lg:h-[45vw] lg:left-8 lg:w-1/3 xl:top-auto xl:bottom-0 xl:h-4/5 2xl:w-1/4 ${showContactModale ? "translate-y-0" : "translate-y-full"} ${
          showConfirmationContactModale && "hidden"
        }`}
      >
        <h2 className="text-3xl font-title text-center text-darkColor col-span-3 row-span-5 vmd:p-2 2xl:text-4xl 2xl:pt-4">
          Contactez-nous
        </h2>
        <label
          htmlFor="lastname"
          className="text-l font-paragraph h-fit text-darkColor md:text-xl"
        >
          Nom:
        </label>
        <input
          type="text"
          {...register("lastname", {
            required: errorMessage.required,
            minLength: {
              value: 3,
              message: errorMessage.minChar,
            },
            maxLength: {
              value: 20,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/g,
              message: errorMessage.lastName,
            },
          })}
          placeholder="Doe"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit col-span-2 w-full border ${errors.lastname ? "border-red-800 border-2 2xl:border-4" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3 vmd:pt-3 sm:row-span-2 sm:pt-2 lg:row-span-3 lg:pt-3 xl:text-lg">
          {errors.lastname?.message}
        </p>
        <label
          htmlFor="fistname"
          className="text-l font-paragraph h-fit text-darkColor md:text-xl"
        >
          Prénom:
        </label>
        <input
          type="text"
          {...register("firstname", {
            required: errorMessage.required,
            minLength: {
              value: 3,
              message: errorMessage.minChar,
            },
            maxLength: {
              value: 20,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-]+$/g,
              message: errorMessage.firstName,
            },
          })}
          placeholder="John"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit w-full col-span-2 border ${errors.firstname ? "border-red-800 border-2 2xl:border-4" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3 vmd:pt-3 sm:row-span-2 sm:pt-2 lg:row-span-3 lg:pt-3 xl:text-lg">
          {errors.firstname?.message}
        </p>
        <label
          htmlFor="email"
          className="text-l font-paragraph h-fit text-darkColor md:text-xl"
        >
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: errorMessage.required,
            minLength: {
              value: 7,
              message: errorMessage.minCharEmail,
            },
            maxLength: {
              value: 50,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
              message: errorMessage.email,
            },
          })}
          placeholder="john-doe@mail.com"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit col-span-2 w-full border ${errors.email ? "border-red-800 border-2 2xl:border-4" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3 vmd:pt-3 sm:row-span-2 sm:pt-2 lg:row-span-3 lg:pt-3 xl:text-lg">
          {errors.email?.message}
        </p>
        <label
          htmlFor="subject"
          className="text-l font-paragraph h-fit text-darkColor md:text-xl"
        >
          Sujet:
        </label>
        <select
          {...register("subject", {
            required: errorMessage.required,
            validate: (value) => {
              const validSubjects = data.map((e) => e.name);
              if (!validSubjects.includes(value)) {
                return errorMessage.select;
              }
            },
          })}
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor h-fit w-full col-span-2 text-darkColor"
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
        <p className="pointer-events-none text-center col-span-3 row-span-4 pt-4 text-sm text-red-800 font-paragraph vsm:row-span-3 vmd:pt-3 sm:row-span-2 sm:pt-2 lg:row-span-3 lg:pt-3 xl:text-lg">
          {errors.subject?.message}
        </p>
        <label
          htmlFor="message"
          className="text-l font-paragraph col-span-3 row-span-3 text-darkColor vsm:row-span-2 md:text-xl lg:row-span-3"
        >
          Message:
        </label>
        <textarea
          {...register("message", {
            required: errorMessage.required,
            minLength: {
              value: 30,
              message: errorMessage.minCharMessage,
            },
            maxLength: {
              value: 1000,
              message: errorMessage.maxChar,
            },
            pattern: {
              value: /^[a-zA-Z0-9àÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s\.\,?!:;]+$/g,
              message: errorMessage.message,
            },
          })}
          placeholder="Entrez votre message ici"
          className={`focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-interestColor resize-none row-span-9 h-24 col-span-3 vsm:row-span-10 vsm:h-36 vmd:h-44 sm:row-span-12 sm:h-72 lg:h-32 lg:row-span-9 xl:h-36 2xl:h-40 2xl:row-span-7 ${errors.message ? "border-red-800 border-2 2xl:border-4" : "border-gray-300"} rounded`}
        />
        <p className="pointer-events-none text-center col-span-3 pt-3 row-span-4 text-sm text-red-800 font-paragraph vsm:pt-5 vmd:row-span-3 sm:pt-8 sm:row-span-4 lg:pt-5 xl:text-lg 2xl:pt-7">
          {errors.message?.message}
        </p>
        <button
          type="submit"
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-darkColor row-span-5 font-paragraph rounded-full bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor vmd:row-span-4 md:row-span-3 lg:row-span-5 2xl:row-span-4 2xl:text-xl"
        >
          Envoyer
        </button>
        <button
          type="button"
          onClick={() => setShowContactModale(!showContactModale)}
          className="focus-visible:outline-dashed focus-visible:outline-4 focus-visible:outline-darkColor row-span-5 font-paragraph rounded-full col-start-3 bg-interestColor text-white hover:bg-accentColor shadow-md shadow-darkColor active:bg-darkColor vmd:row-span-4  md:row-span-3 lg:row-span-5 2xl:row-span-4 2xl:text-xl"
        >
          Fermer
        </button>
      </form>
      <ModaleValidateContact
        showConfirmationContactModale={showConfirmationContactModale}
        setShowConfirmationContactModale={setShowConfirmationContactModale}
        setShowContactModale={setShowContactModale}
      />
    </section>
  );
}
