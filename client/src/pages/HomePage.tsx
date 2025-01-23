import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Maps from "../components/Maps";

import type { ContactModaleProps } from "../assets/definition/lib";

import Search from "../components/Search";
import type { searchApi } from "../types/searchApi";

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

  /*     type ContactModalProps = {
      children: (string | boolean | searchApi | ((boolean: boolean) => void))[];
      showContactModal: boolean;
      setShowContactModal: (show: boolean) => void;
    } */

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
