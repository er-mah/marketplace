import React, { useState } from "react";

import CreatableSelect from "react-select/creatable";
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_BRANDS_QUERY } from "../../../../graphql/publication/vehicle/getCCAVehicleBrandsQuery.ts";
import { GET_VEHICLE_MODELS_BY_BRAND_QUERY } from "../../../../graphql/publication/vehicle/getCCAVehicleModelsByBrandQuery.ts";
import { GET_VEHICLE_YEARS_BY_MODEL_QUERY } from "../../../../graphql/publication/vehicle/getCCAVehicleYearsByModelQuery.ts";
import { GET_VEHICLE_VERSIONS_BY_MODEL_QUERY } from "../../../../graphql/publication/vehicle/getCCAVehicleVersionsByModelQuery.ts";
import { CustomSingleSearch } from "../../customInputElements/CustomSingleSearch.jsx";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export const CustomSelect = () => {
  return <CreatableSelect isClearable options={options} />;
};

export const SelectVehicleSection = ({
  touched,
  errors,
  formErrorsFromApi,
}) => {
  const [selectedVehicleFields, setSelectedVehicleFields] = useState({
    dropdownBrandID: "",
    dropdownModelID: "",
    dropdownYear: "",
    dropdownVersionID: "",
    selectedBrand: "",
    selectedModel: "",
    selectedYear: "",
    selectedVersion: "",
  });

  const {
    loading: brandsLoading,
    error: _brandsError,
    data: { getVehicleBrands: brands } = {},
    refetch: refetchBrands,
  } = useQuery(GET_VEHICLE_BRANDS_QUERY);

  const {
    loading: modelsLoading,
    error: _modelsError,
    data: { getVehicleModelsByBrandName: models } = {},
    refetch: refetchModels,
  } = useQuery(GET_VEHICLE_MODELS_BY_BRAND_QUERY, {
    skip: !selectedVehicleFields.selectedBrand,
    variables: { brand: selectedVehicleFields.selectedBrand },
  });

  const {
    loading: yearsLoading,
    error: _yearsError,
    data: { getVehicleYearsByModelID: years } = {},
    refetch: refetchYears,
  } = useQuery(GET_VEHICLE_YEARS_BY_MODEL_QUERY, {
    skip: !selectedVehicleFields.dropdownModelID,
    variables: { modelId: selectedVehicleFields.dropdownModelID },
  });

  const {
    loading: versionsLoading,
    error: _versionsError,
    data: { getVehicleVersionsByYear: versions } = {},
    refetch: refetchVersions,
  } = useQuery(GET_VEHICLE_VERSIONS_BY_MODEL_QUERY, {
    skip:
      !selectedVehicleFields.dropdownModelID ||
      !selectedVehicleFields.dropdownYear,
    variables: {
      modelId: selectedVehicleFields.dropdownModelID,
      year: selectedVehicleFields.dropdownYear,
    },
  });

  const selectBrand = async (selection) => {
    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      dropdownBrandID: selection.value,
      dropdownModelID: "",
      dropdownVersion: "",
      dropdownYear: "",
      selectedBrand: "",
    }));

    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      selectedBrand: selection.label,
    }));

    await refetchModels();
    await refetchBrands();
  };

  const selectModel = async (selection) => {
    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      dropdownModelID: selection.value,
      dropdownYear: "",
      dropdownVersion: "",
      selectedModel: "",
    }));

    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      selectedModel: selection.label,
    }));

    await refetchYears();
    await refetchModels();
    await refetchBrands();
  };

  const selectYear = async (selection) => {
    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      dropdownYear: selection.label,
      dropdownVersion: "",
      selectedYear: "",
    }));

    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      selectedYear: selection.label,
    }));

    await refetchVersions();
    await refetchYears();
    await refetchModels();
    await refetchBrands();
  };

  const selectVersion = (selection) => {
    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      dropdownVersion: selection.value,
      selectedVersion: "",
    }));

    setSelectedVehicleFields((prevState) => ({
      ...prevState,
      selectedVersion: selection.label,
    }));
  };

  return (
    <>
      {JSON.stringify(selectedVehicleFields)}
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-7">
        <div className="text-gray-600">
          <p className="font-medium text-lg">Datos de tu vehículo</p>
          <p>Definí los datos requeridos para agregar a la publicación.</p>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
            <>
              {/* BRAND */}
              <div className="md:col-span-2">
                <CustomSingleSearch
                  label={"Marca"}
                  name={"vehicle_brand"}
                  touched={touched.vehicle_brand}
                  options={brands}
                  isLoading={brandsLoading}
                  errors={errors.vehicle_brand}
                  formErrorsFromApi={formErrorsFromApi.vehicle_brand}
                  onSelect={selectBrand}
                  value={selectedVehicleFields.dropdownBrandID}
                />
              </div>

              {/* MODEL */}
              <div className="md:col-span-2">
                <CustomSingleSearch
                  label={"Modelo"}
                  name={"vehicle_model"}
                  touched={touched.vehicle_model}
                  options={models}
                  isLoading={modelsLoading}
                  errors={errors.vehicle_model}
                  formErrorsFromApi={formErrorsFromApi.vehicle_model}
                  onSelect={selectModel}
                  value={selectedVehicleFields.dropdownModelID}
                />
              </div>

              {/* YEAR */}
              <div className="md:col-span-2">
                <CustomSingleSearch
                  label={"Año"}
                  name={"vehicle_year"}
                  touched={touched.vehicle_year}
                  options={years}
                  isLoading={yearsLoading}
                  errors={errors.vehicle_year}
                  formErrorsFromApi={formErrorsFromApi.vehicle_year}
                  onSelect={selectYear}
                  value={selectedVehicleFields.dropdownYear}
                />
              </div>

              {/* VERSION */}
              <div className="md:col-span-2">
                <CustomSingleSearch
                  label={"Versión"}
                  name={"vehicle_version"}
                  touched={touched.vehicle_version}
                  options={versions}
                  isLoading={versionsLoading}
                  errors={errors.vehicle_version}
                  formErrorsFromApi={formErrorsFromApi.vehicle_version}
                  onSelect={selectVersion}
                  value={selectedVehicleFields.dropdownVersionID}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
