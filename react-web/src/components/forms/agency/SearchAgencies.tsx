import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_AGENCIES_BY_NAME_QUERY } from "../../../graphql/agency";
import {useFormikContext} from "formik";

let debounceTimeout;
export const SearchAgencies = ({
  setShowCreateAgency,
  agencyIdFromForm,
  formErrorsFromApi,
}) => {
  const [agencyNameQuery, setAgencyNameQuery] = useState("");
  const [selectedAgencyMessage, setSelectedAgencyMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const formik = useFormikContext();

  const {
    loading: agenciesLoading,
    error: _agenciesError,
    data: { searchAgencies: agencies } = {},
  } = useQuery(SEARCH_AGENCIES_BY_NAME_QUERY, {
    skip: !agencyNameQuery,
    variables: { query: agencyNameQuery },
  });

  const handleSearch = (e) => {
    const query = e.target.value;

    clearTimeout(debounceTimeout);
    setAgencyNameQuery(query);
    debounceTimeout = setTimeout(() => {
      return;
    }, 1000); // tiempo en milisegundos
  };

  const handleCreate = () => {
    setShowCreateAgency(true);
    setIsTouched(false);
    setAgencyNameQuery("")
    setSelectedAgencyMessage("Estás creando la agencia que vas a representar");
    formik.setFieldValue("user_agency_id", "-1");
    formik.setFieldValue("user_is_agency_representative", true);
  };

  const handleSelect = (agency) => {
    setShowCreateAgency(false);
    setIsTouched(false);
    setSelectedAgencyMessage("Agencia seleccionada: " + agency.name);

    formik.setFieldValue("user_agency_id", agency.id);
    formik.setFieldValue("user_is_agency_representative", true);
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
        <input
          className="mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm
          bg-transparent outline-none border focus:border-indigo-600"
          type="text"
          id={"search_agency"}
          placeholder="Buscar agencias (Ej: miautohoy.com)"
          value={agencyNameQuery}
          onChange={handleSearch}
          onFocus={() => setIsTouched(true)}
          onBlur={() => setIsTouched(true)}
        />
        <div className="absolute z-10 w-full bg-white rounded-b-md shadow-lg border-gray-400 text-sm text-gray-700">
          {agencyNameQuery && isTouched ? (
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
                        onClick={() => handleSelect(agency)}
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

                {/*

                TODO: APPLY WHEN WE HAVE ICONS
                Tailwind lists


                <ul role="list">
                  {#each people as person}
                    <li class="group/item hover:bg-slate-100 ...">
                      <img src="{person.imageUrl}" alt="" />
                      <div>
                        <a href="{person.url}">{person.name}</a>
                        <p>{person.title}</p>
                      </div>
                      <a class="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..." href="tel:{person.phone}">
                        <span class="group-hover/edit:text-gray-700 ...">Call</span>
                        <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ...">
                          <!-- ... -->
                        </svg>
                      </a>
                    </li>
                  {/each}
                </ul>




                */}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        {selectedAgencyMessage ? (
          <div className={"my-3"}>
            <p>
              <strong>{selectedAgencyMessage}</strong>
            </p>
          </div>
        ) : (
          <></>
        )}
        {!agencyIdFromForm && isTouched ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-bold">Oops!</span>{" "}
            <span className="font-normal">
              Tenés que seleccionar una agencia
            </span>
          </p>
        ) : null}
        {formErrorsFromApi.user_agency_id ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-bold">Oops!</span>{" "}
            <span className="font-normal">
              {formErrorsFromApi.user_agency_id}
            </span>
          </p>
        ) : null}
      </div>
    </>
  );
};
