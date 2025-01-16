/**
 * This component allows the user to manually locate themselves
 *
 */

import { useEffect, useState } from "react";
import type { searchApi } from "../types/searchApi";

export default function Search(majPosition: {
  setSelectedPosition: (value: searchApi) => void;
}) {
  const { setSelectedPosition } = majPosition;

  const [query, setQuery] = useState(""); // user inputs
  const [resultsApi, setResultsApi] = useState<searchApi[]>([]); // Api return results
  // To stop the call to the API when the user has clicked to select an address from the drop-down list (true)
  const [searchDone, setSearchDone] = useState(false);

  const handleKeyUp = (event: { key: string }) => {
    event.key === "Enter";
  };

  useEffect(() => {
    if (!searchDone) {
      //
      if (query.length > 2) {
        // at least 3 characters are required before the call Api
        // timer to delay the API call (0.5 s)
        const timeDelay = setTimeout(() => {
          //call Apî "codes postaux"
          fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              query: `${query}`,
            }),
          })
            .then((Response) => Response.json())
            .then((data) => setResultsApi(data.features))
            .catch((error) => console.error(error));
        }, 500);
        return () => {
          // clean timer count
          clearTimeout(timeDelay);
        };
      }
    }
  }, [query, searchDone]);

  // Used to filter data based on user input.
  // It is then injected into "handleSearch" via "SetResults"
  const filterData = (element: string) => {
    return resultsApi?.filter((item) =>
      item.properties.label
        .toLowerCase()
        .includes(element.trim().toLowerCase()),
    );
  };

  // extracts the API results, the addresses matching the user input
  // to generate the dropdown list items
  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;

    if (searchDone) {
      setSearchDone(false); //
    } else {
      setQuery(value);
      if (value.length > 2) {
        setResultsApi(value.trim() === "" ? [] : filterData(value));
      }
    }
  };

  // Handle user click on a suggestion from the drop-down list.
  // When the user chooses an address from the list,
  // we must stop new calls to the API
  const handleElementClick = (element: searchApi) => {
    if (element != null) {
      setQuery(element.properties.label);
      setResultsApi([]); // erase Api results
      setSearchDone(true); // stop new calls to the API
      setSelectedPosition(element);
    }
  };
  return (
    <>
      <div className="w-72 lg:w-[500px] p-2.5 border border-gray-300 rounded shadow-md bg-[rgba(0, 0, 0, 0.1)] bg-[rgba(240,248,255,0.1)] absolute z-[9000] left-[50%] top-2 lg:top-36 -translate-x-1/2">
        <input
          type="search"
          value={query}
          className="bg-[url('../../public/icon-loupe.svg')] bg-[center length:20px_20px] bg-no-repeat px-3 py-2 pl-7 w-full h-8 text-lg border-none rounded-md shadow-sm"
          onChange={handleSearch}
          placeholder="Rechercher un lieu..."
        />

        <ul className="max-h-[75vh] overflow-y-auto list-none p-0 m-0 absolute">
          {query.length > 2 &&
            resultsApi?.map((item, index) => (
              <li
                className="py-2.5 w-[260px] lg:w-[478px] border-b-solid border-b-gray-300 cursor-pointer relative z-[1000] bg-white hover:bg-[#E5E9E7] border-b last:border-b-0"
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                onClick={() => handleElementClick(item)}
                onKeyUp={handleKeyUp}
              >
                {item.properties.label}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
