import { Link } from "react-router-dom";
import carIconDark from "../assets/images/car-dark.png";
import carIcon from "../assets/images/car.png";
import plugIconDark from "../assets/images/charging-plug-dark.png";
import plugIcon from "../assets/images/charging-plug.png";
import contactIconDark from "../assets/images/contact-dark.png";
import contactIcon from "../assets/images/contact.png";
import statsIconDark from "../assets/images/stat-dark.png";
import statsIcon from "../assets/images/stat.png";
import updateIconDark from "../assets/images/update-dark.png";
import updateIcon from "../assets/images/update.png";
import usersIconDark from "../assets/images/users-dark.png";
import usersIcon from "../assets/images/users.png";

export default function AdminPage() {
  const adminData = [
    {
      id: 1,
      name: "Utilisateurs",
      icon: usersIcon,
      iconDark: usersIconDark,
      link: "/admin/users",
      buttonStyle: "row-span-2",
      imageStyle: "md:top-1/4 md:left-1/2 md:-translate-x-1/2",
      figcaptionStyle: "md:bottom-1/3",
    },
    {
      id: 2,
      name: "Mise à jour des bornes",
      icon: updateIcon,
      iconDark: updateIconDark,
      link: "/admin/update-charging-stations",
      buttonStyle: "col-span-2",
      imageStyle: "md:left-auto md:right-3 lg:right-1/4 lg:translate-x-1/2 ",
      figcaptionStyle: "",
    },
    {
      id: 3,
      name: "Nombre de bornes",
      icon: plugIcon,
      iconDark: plugIconDark,
      link: "/admin/charging-stations",
      buttonStyle: "",
      imageStyle: "md:top-6 md:left-1/2 md:-translate-x-1/2",
      figcaptionStyle: "md:bottom-6",
    },
    {
      id: 4,
      name: "Nombre de véhicules",
      icon: carIcon,
      iconDark: carIconDark,
      link: "/admin/cars/brand-model",
      buttonStyle: "row-span-2",
      imageStyle: "md:top-1/4 md:left-1/2 md:-translate-x-1/2",
      figcaptionStyle: "md:bottom-1/3",
    },
    {
      id: 5,
      name: "Messages",
      icon: contactIcon,
      iconDark: contactIconDark,
      link: "/admin/messages",
      buttonStyle: "",
      imageStyle: "md:top-6 md:left-1/2 md:-translate-x-1/2",
      figcaptionStyle: "md:bottom-6",
    },
    {
      id: 6,
      name: "Statistique",
      icon: statsIcon,
      iconDark: statsIconDark,
      link: "/admin/stats",
      buttonStyle: "",
      imageStyle: "md:top-6 md:left-1/2 md:-translate-x-1/2",
      figcaptionStyle: "md:bottom-6",
    },
  ];

  return (
    <article className="bg-lightColor h-[100vh] w-full absolute z-[1040] grid grid-cols-2 items-center pb-4">
      <h2 className="py-4 text-xl font-title text-center text-darkColor vsm:text-3xl md:text-4xl md:text-left md:ml-4">
        Bonjour Admin
      </h2>
      <section className="bg-lightColor pb-3 w-full h-[80vh] col-span-2 flex flex-col gap-3 items-center md:grid md:grid-cols-3 md:grid-rows-3 md:p-4 md:gap-4">
        {adminData.map((e) => (
          <Link
            key={e.id}
            to={e.link}
            className={`group relative w-11/12 h-1/6 bg-darkColor text-lightColor rounded-lg flex items-center justify-center border-darkColor border-2 hover:text-darkColor hover:bg-lightColor md:h-full md:w-full ${e.buttonStyle}`}
          >
            <figure className="flex items-center justify-center w-11/12 h-full gap-8">
              <img
                alt={e.name}
                src={e.icon}
                className={`absolute opacity-100 group-hover:opacity-0 transition-opacity duration-50 h-10 left-2 md:h-24 ${e.imageStyle}`}
              />
              <img
                alt={e.name}
                src={e.iconDark}
                className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-50 h-10 left-2 md:h-24 ${e.imageStyle}`}
              />
              <figcaption
                className={`w-11/12 absolute text-xl right-0 font-paragraph text-center md:pl-0 md:text-2xl md:w-full ${e.figcaptionStyle}`}
              >
                {e.name}
              </figcaption>
            </figure>
          </Link>
        ))}
      </section>
    </article>
  );
}
