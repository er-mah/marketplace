import React, { useEffect, useMemo, useState } from "react";

import Creatable from "react-select/creatable";

export const CustomSingleSearch = ({
  label,
  options,
  errors,
  touched,
  isLoading,
  formErrorsFromApi,
  onSelect,
}) => {
  const [newOptions, setNewOptions] = useState([]);
  const [value, setValue] = useState({});

  const onChange = (newValue, actionMeta) => {
    onSelect(newValue);

    setValue(newValue);
  };

  useEffect(() => {
    if (options && options.length > 0) {
      setNewOptions([
        { value: 0, label: "Seleccioná una opción" },
        ...options.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ]);
    } else {
      setNewOptions([]);
    }
  }, [options]);

  // Check if option already exists
  const optionExists = useMemo(() => {
    return (inputValue) => {
      return newOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );
    };
  }, [newOptions]);

  // Objeto de configuración
  const selectConfig = {
    noOptionsMessage: () => "No hay opciones disponibles",
    placeholder: `Seleccionar ${label.toLowerCase()}`,

    formatCreateLabel: (inputValue) => {
      if (!optionExists(inputValue)) {
        return `Añadir ${inputValue}`;
      }
      return null;
    },
  };

  return (
    <>
      <Creatable
        {...selectConfig}
        className="basic-single"
        value={value}
        classNamePrefix="select"
        isLoading={isLoading}
        isSearchable
        isClearable
        options={newOptions}
        onChange={onChange}
      />
      {(errors && touched) || formErrorsFromApi ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-bold">Oops!</span>{" "}
          <span className="font-normal">
            {errors}
            {formErrorsFromApi}
          </span>
        </p>
      ) : null}
    </>
  );
};
