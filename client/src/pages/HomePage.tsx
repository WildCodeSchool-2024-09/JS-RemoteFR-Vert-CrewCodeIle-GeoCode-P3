import { useOutletContext } from "react-router-dom";
import Maps from "../components/Maps";

import type { ContactModaleProps } from "../assets/definition/lib";

export default function HomePage() {
  const { showContactModale, setShowContactModale }: ContactModaleProps =
    useOutletContext();

  return (
    <>
      <Maps
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
      />
    </>
  );
}
