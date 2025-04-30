import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { ContactModaleProps } from "../assets/definition/lib";
import type { searchApi } from "../assets/definition/lib";
import Maps from "../components/Maps";
import Search from "../components/Search";

export default function HomePage() {
  const defaultPosition: searchApi = {
    geometry: {
      coordinates: [2.3522, 48.8566],
    },
    properties: {
      label: "",
    },
  };

  const [selectedPosition, setSelectedPosition] =
    useState<searchApi>(defaultPosition);

  const { showContactModale, setShowContactModale }: ContactModaleProps =
    useOutletContext();

  return (
    <>
      <Search setSelectedPosition={setSelectedPosition} />
      <Maps
        showContactModale={showContactModale}
        setShowContactModale={setShowContactModale}
        selectedPosition={selectedPosition}
      />
    </>
  );
}
