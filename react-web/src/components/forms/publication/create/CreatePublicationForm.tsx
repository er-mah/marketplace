import React, { useState } from "react";
import { Field, Form, Formik } from "formik";

import { CreatePublicationSchema } from "../../../../utils/validationSchemas/publication.ts";
/*
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_BRANDS_QUERY } from "../../../graphql/publication/vehicle/getCCAVehicleBrandsQuery.ts";
import {
  GET_VEHICLE_MODELS_BY_BRAND_QUERY
} from "../../../graphql/publication/vehicle/getCCAVehicleModelsByBrandQuery.ts";
import {
  GET_VEHICLE_VERSIONS_BY_MODEL_QUERY
} from "../../../graphql/publication/vehicle/getCCAVehicleVersionsByModelQuery.ts";

 */

import {SelectVehicleSection} from "./SelectVehicleSection.tsx";

export const CreatePublicationForm = () => {
  const initialValues = {
    vehicle_brand: "",
    vehicle_model: "",
    vehicle_year: "",
    vehicle_version: "",

    vehicle_state: "",
    vehicle_segment: "",
    kms: "",
    fuel: "",
    description: "",
    locality_id: "",
    currency: "",
    price: "",

    vehicle_comfort: {
      climatizer: false,
      centralLocking: false,
      multifunctionSteeringWheel: false,
      cruiseControl: false,
      airConditioning: false,
      leatherUpholstery: false,
      powerSteering: false,
    },
    vehicle_security: {
      stabilityControl: false,
      tractionControl: false,
      absBrakes: false,
      fogLights: false,
      rearCamera: false,
      isofixSystem: false,
      tirePressure: false,
    },
    vehicle_entertainment: {
      amFmRadio: false,
      usbPort: false,
      voiceCommand: false,
      multifunctionDisplay: false,
      bluetooth: false,
      gps: false,
      auxiliaryConnection: false,
    },
  };

  const initialErrors = {
    vehicle_brand: "",
    vehicle_model: "",
    vehicle_year: "",
    vehicle_version: "",

    vehicle_state: "",
    vehicle_segment: "",
    kms: "",
    fuel: "",
    description: "",
    locality_id: "",
    currency: "",
    price: "",

    vehicle_comfort: {
      climatizer: "",
      centralLocking: "",
      multifunctionSteeringWheel: "",
      cruiseControl: "",
      airConditioning: "",
      leatherUpholstery: "",
      powerSteering: "",
    },
    vehicle_security: {
      stabilityControl: "",
      tractionControl: "",
      absBrakes: "",
      fogLights: "",
      rearCamera: "",
      isofixSystem: "",
      tirePressure: "",
    },
    vehicle_entertainment: {
      amFmRadio: "",
      usbPort: "",
      voiceCommand: "",
      multifunctionDisplay: "",
      bluetooth: "",
      gps: "",
      auxiliaryConnection: "",
    },
  };

  const [formErrorsFromApi, _setFormErrorsFromApi] = useState(initialErrors);
  const handleSubmit = async (values) => {
    console.log(values);
  };

  /*
  const vehicleStateOpts = [
    { value: "nuevo", label: "Nuevo" },
    { value: "usado", label: "Usado" },
  ];

  const vehicleFuelOpts = [
    { value: "diesel", label: "Diesel" },
    { value: "nafta", label: "Nafta" },
    { value: "nafta_gnc", label: "Nafta / GNC" },
    { value: "turbo_diesel", label: "Turbo Diesel" },
    { value: "hibrido", label: "Híbrido" },
    { value: "electrico", label: "Eléctrico" },
    { value: "otro", label: "Otro" },
  ];

  const vehicleSegmentOpts = [
    { value: "alta_gama", label: "Alta Gama" },
    { value: "ciudad", label: "Ciudad" },
    { value: "familia", label: "Familia" },
    { value: "todo_terreno", label: "Todo Terreno" },
    { value: "utilitario", label: "Utilitario" },
    { value: "otro", label: "Otro" },
  ];

  const vehicleCurrencyOpts = [
    { value: "usd", label: "Dólares americanos" },
    { value: "ars", label: "Pesos argentinos" },
  ];

 */





  return (
    <>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={CreatePublicationSchema}
          enableReinitialize={false}
        >
          {({ values, errors, touched }) => (
            <Form>
              {JSON.stringify(values)}
              {/* VEHICLE SELECTION */}
              <SelectVehicleSection errors={errors} touched={touched} formErrorsFromApi={formErrorsFromApi}/>

              {/* SUBMIT BUTTON */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-7">
                <div className="text-gray-600"></div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Field
                          type="submit"
                          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded cursor-pointer"
                          name="save"
                          value="Crear publicacion"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
