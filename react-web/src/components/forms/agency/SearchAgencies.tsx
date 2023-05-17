import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_AGENCIES_BY_NAME_QUERY } from "../../../graphql/agency";

let debounceTimeout;
export const SearchAgencies = ({setShowCreateAgency, setFieldValue }) => {
  const [agencyNameQuery, setAgencyNameQuery] = useState("");

  const {
    loading: agenciesLoading,
    error: _agenciesError,
    data: { searchAgencies: agencies } = {},
  } = useQuery(SEARCH_AGENCIES_BY_NAME_QUERY, {
    skip: !agencyNameQuery,
    variables: { query: agencyNameQuery },
  });

  const handleSearch = (query) => {
    clearTimeout(debounceTimeout);
    setAgencyNameQuery(query);
    debounceTimeout = setTimeout(() => {
      return;
    }, 1000); // tiempo en milisegundos
  };

  const handleCreate = () => {
    setAgencyNameQuery("");
    setShowCreateAgency(true);
  };

  return (
    <>
      <div className="relative">
        <label
            htmlFor="search_agency"
            className="block text-sm font-medium text-gray-800"
        >
          Agencia que represento
        </label>
        <div className="flex rounded-md">

          <input
            className="mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm
          bg-transparent outline-none border focus:border-indigo-600"
            type="text"
            id={"search_agency"}
            placeholder="Buscar agencias (Ej: miautohoy.com)"
            value={agencyNameQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="absolute z-10 w-full bg-white rounded-b-md shadow-lg border-gray-400 text-sm text-gray-700">
          {agencyNameQuery ? (
            <>
              <ul className="border-gray-400 text-sm text-gray-700">
                {/* Listing search results */}
                {agenciesLoading ? (
                  <></>
                ) : (
                  agencies &&
                  agencies.map((agency, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          setFieldValue('user_agency_id', agency.id);
                          setAgencyNameQuery("");
                        }}
                      >
                        {agency.name}
                      </button>
                    </li>
                  ))
                )}
                <li key={"_"}>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={handleCreate}
                  >
                    Crear nueva agencia
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
