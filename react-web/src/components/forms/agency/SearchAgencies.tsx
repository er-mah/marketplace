import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@apollo/client";
import { SEARCH_AGENCIES_BY_NAME_QUERY } from "../../../graphql/agency";

let debounceTimeout;
export const SearchAgencies = () => {
  const [agencyNameQuery, setAgencyNameQuery] = useState("");

  const [agencyId, setAgencyId] = useState("");

  const {
    loading: agenciesLoading,
    error: agenciesError,
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
    setAgencyNameQuery("")
    // Lógica de creación aquí

    console.log("Creando nueva agencia");
  };

  return (
    <div className="relative">
      {JSON.stringify(agenciesError)}
      {JSON.stringify(agencyId)}
      <div className="flex rounded-md">
        <input
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-l-md"
          type="text"
          placeholder="Buscar agencias..."
          value={agencyNameQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="px-4 py-2 bg-gray-100 rounded-r-md">
          <MagnifyingGlassIcon className="h-5 w-5" onClick={handleSearch} />
        </button>
      </div>
      <div className="absolute z-10 w-full bg-white rounded-b-md shadow-lg">
        {agencyNameQuery ? (
          <>
            <ul className="">
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
                              setAgencyId(agency.id)
                              setAgencyNameQuery("")
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
              {/* Listado de resultados de búsqueda */}

            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
