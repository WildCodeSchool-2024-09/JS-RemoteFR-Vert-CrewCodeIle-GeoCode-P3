/**
 * This component allows the user to manually locate themselves
 *
 */

import { useEffect, useState } from "react";
import "./search.css";
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
          fetch("http://localhost:3310/api/search", {
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
      <div className="search-bar">
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Rechercher un lieu..."
        />

        <ul>
          {query.length > 2 &&
            resultsApi?.map((item, index) => (
              <li
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
