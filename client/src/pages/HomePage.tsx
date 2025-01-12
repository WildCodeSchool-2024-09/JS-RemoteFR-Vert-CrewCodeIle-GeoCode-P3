import { useState } from "react";
import Maps from "../components/Maps";
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

  return (
    <>
      <Search setSelectedPosition={setSelectedPosition} />
      <Maps selectedPosition={selectedPosition} />
    </>
  );
}
