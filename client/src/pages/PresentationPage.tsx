import { Link } from "react-router-dom";
import presentationText from "../assets/data/presentation.json";
import logo from "../assets/images/logo.png";
import type { PresentationProps } from "../assets/lib/definition";

export default function PresentationPage() {
  const presentation: PresentationProps = presentationText;
  return (
    <>
      <section className="bg-lightColor h-screen 2xl:w-80 2xl:h-full 2xl:mt-36 2xl:ml-12">
        <img
          className="w-56 m-auto mb-12 pt-20 2xl:pt-12 "
          src={logo}
          alt="Geocode"
        />

        <p className="text-center mt-4 mb-16 ml-2 mr-2 font-paragraph">
          {presentation.presentation}
        </p>
        <div className="pb-12 m-auto w-fit ">
          <Link
            to={presentation.link}
            className="border-2 rounded-full p-3 bg-interestColor font-paragraph text-white"
          >
            {presentation.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}
