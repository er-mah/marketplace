import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  CompleteAdditionalInfoSchema,
  OnlyUserAdditionalInfoSchema,
} from "../../utils/validationSchemas/user.ts";
import { useQuery } from "@apollo/client";
import {
  GET_DEPARTMENTS_BY_PROVINCE_QUERY,
  GET_LOCALITIES_BY_DEPARTMENT_QUERY,
  GET_PROVINCES_QUERY,
} from "../../graphql";
import { SearchAgencies } from "./agency/SearchAgencies.tsx";
export const AddAdditionalInfoUserForm = () => {
  const [isAgencyRepresentative, setIsAgencyRepresentative] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [showCreateAgency, setShowCreateAgency] = useState(false);

  const {
    loading: provincesLoading,
    error: provincesError,
    data: { getAllProvinces: provinces } = {},
  } = useQuery(GET_PROVINCES_QUERY);

  const {
    loading: departmentsLoading,
    error: departmentsError,
    data: { getDepartmentsByProvinceId: departments } = {},
  } = useQuery(GET_DEPARTMENTS_BY_PROVINCE_QUERY, {
    skip: !selectedProvince,
    variables: { provinceId: selectedProvince },
  });

  const {
    loading: localitiesLoading,
    error: localitiesError,
    data: { getLocalitiesByDepartmentId: localities } = {},
  } = useQuery(GET_LOCALITIES_BY_DEPARTMENT_QUERY, {
    skip: !selectedDepartment,
    variables: { departmentId: selectedDepartment },
  });

  const initialErrors = {
    address: "",
    phone: "",
    is_agency_representative: "",
    dni: "",
    agency_id: "",
    nestedDropdown: {
      province_id: "",
      department_id: "",
      locality_id: "",
    },
  };

  const [formErrorsFromApi, _setFormErrorsFromApi] = useState(initialErrors);

  const onSubmit = (values) => {
    console.log(values);
  };

  const onlyUserInitialValues = {
    user_address: "",
    user_phone: "",
    user_is_agency_representative: false,
    user_dni: "",
    user_agency_id: "",
    user_zip_code: "",
    user_province_id: "",
    user_department_id: "",
    user_locality_id: "",
  };

  const completeInitialValues = {
    user_address: "",
    user_phone: "",
    user_is_agency_representative: true,
    user_dni: "",
    user_agency_id: "",
    user_zip_code: "",
    user_province_id: "",
    user_department_id: "",
    user_locality_id: "",
    agency_address: "",
    agency_email: "",
    agency_locality_id: "",
    agency_name: "",
    agency_phone: "",
  };

  return (
    <>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <Formik
          initialValues={
            showCreateAgency ? completeInitialValues : onlyUserInitialValues
          }
          onSubmit={onSubmit}
          validationSchema={
            showCreateAgency
              ? CompleteAdditionalInfoSchema
              : OnlyUserAdditionalInfoSchema
          }
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <code class="flex whitespace-normal overflow-auto text-sm">
                {JSON.stringify(values)}
              </code>
              <div class="w-full h-full  items-center justify-center">
                <pre class="w-full max-w-full max-h-full  text-sm md:text-base lg:text-lg"></pre>
              </div>

              {/* IS AGENCY REPRESENTATIVE ? */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-5">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">¿Sos agenciero?</p>
                  <p>Especificá en caso de que representes una empresa, sus datos correspondientes.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <Field
                            type="checkbox"
                            name="user_is_agency_representative"
                            id="is_agency_representative"
                            className="sr-only peer"
                            onClick={() =>
                                setIsAgencyRepresentative(!isAgencyRepresentative)
                            }
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Represento a una agencia
                  </span>
                      </label>
                      {isAgencyRepresentative && (
                          <div>
                            <SearchAgencies
                                setShowCreateAgency={setShowCreateAgency}
                                setFieldValue={setFieldValue}
                            />
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              {/* AGENCY DATA */}
              {showCreateAgency ? (
                <>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-5">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Creando tu agencia</p>
                      <p>Definí los datos de la agencia que representás.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <>
                          {/* DNI */}
                          <div className="md:col-span-5">
                            <label
                              htmlFor="dni"
                              className="block text-sm font-medium text-gray-800"
                            >
                              DNI
                            </label>

                            <Field
                              id="dni"
                              name="dni"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.dni && touched.dni) ||
                                formErrorsFromApi.dni
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.dni && touched.dni) ||
                            formErrorsFromApi.dni ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.dni}
                                  {formErrorsFromApi.dni}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* PHONE */}
                          <div className="md:col-span-5">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Teléfono
                            </label>
                            <Field
                              id="phone"
                              name="phone"
                              type="tel"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.phone && touched.phone) ||
                                formErrorsFromApi.phone
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                            />
                            {(errors.phone && touched.phone) ||
                            formErrorsFromApi.phone ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.phone}
                                  {formErrorsFromApi.phone}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* PROVINCE */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="province"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Provincia
                            </label>

                            <Field
                              id="province"
                              name="province"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.province && touched.province) ||
                                formErrorsFromApi.province
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              onClick={(event) => {
                                setSelectedProvince(event.target.value);
                                setSelectedDepartment(null);
                                values.user_department_id = "0";
                                values.user_locality_id = "0";
                              }}
                              disabled={!provinces}
                            >
                              <option key={"0"} value={""}>
                                Seleccioná una opcion
                              </option>

                              {provincesLoading ? (
                                <></>
                              ) : (
                                provinces &&
                                provinces.map((province, index) => (
                                  <option key={index} value={province.id}>
                                    {province.name}
                                  </option>
                                ))
                              )}
                            </Field>

                            {(errors.province && touched.province) ||
                            provincesError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.province}
                                  {provincesError}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* DEPARTMENT */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Departamento / Partido
                            </label>

                            <Field
                              id="department"
                              name="department"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.department && touched.department) ||
                                departmentsError
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              disabled={!departments}
                              onClick={(event) => {
                                setSelectedDepartment(event.target.value);
                                values.user_locality_id = "0";
                              }}
                            >
                              <option key={"0"} value={""}>
                                Seleccioná una opcion
                              </option>

                              {departmentsLoading ? (
                                <></>
                              ) : (
                                departments &&
                                departments.map((department, index) => (
                                  <option key={index} value={department.id}>
                                    {department.name}
                                  </option>
                                ))
                              )}
                            </Field>

                            {(errors.department && touched.department) ||
                            departmentsError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.department}
                                  {departmentsError?.message}
                                </span>
                              </p>
                            ) : null}

                            {errors.department && touched.department ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.department}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* ZIP CODE */}
                          <div className="md:col-span-1">
                            <label
                              htmlFor="dni"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Código postal
                            </label>

                            <Field
                              id="zip_code"
                              name="zip_code"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.zip_code && touched.zip_code) ||
                                formErrorsFromApi.zip_code
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.zip_code && touched.zip_code) ||
                            formErrorsFromApi.zip_code ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.zip_code}
                                  {formErrorsFromApi.zip_code}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* LOCALITY */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="locality"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Localidad
                            </label>

                            <Field
                              id="locality"
                              name="locality"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.locality && touched.locality) ||
                                localitiesError
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              disabled={!localities}
                            >
                              <option key={"0"} value={""}>
                                Seleccioná una opcion
                              </option>

                              {localitiesLoading ? (
                                <></>
                              ) : (
                                localities &&
                                localities.map((locality, index) => (
                                  <option key={index} value={locality.id}>
                                    {locality.name}
                                  </option>
                                ))
                              )}
                            </Field>

                            {(errors.locality && touched.locality) ||
                            localitiesError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.locality}
                                  {localitiesError}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* ADDRESS */}
                          <div className="md:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Dirección
                            </label>

                            <Field
                              id="address"
                              name="address"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.address && touched.address) ||
                                formErrorsFromApi.address
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.address && touched.address) ||
                            formErrorsFromApi.address ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.address}
                                  {formErrorsFromApi.address}
                                </span>
                              </p>
                            ) : null}
                          </div>
                        </>

                        {/* IS AGENCY REPRESENTATIVE ? */}
                        <div className="md:col-span-5">
                          <div className="inline-flex items-center">
                            <Field
                              type="checkbox"
                              name="is_agency_representative"
                              id="is_agency_representative"
                              className="form-checkbox"
                              onClick={() =>
                                setIsAgencyRepresentative(
                                  !isAgencyRepresentative
                                )
                              }
                            />
                            <label
                              htmlFor="agency_representative"
                              className="ml-2"
                            >
                              Represento a una agencia
                            </label>
                          </div>
                          {isAgencyRepresentative && (
                            <div>
                              <p className={"todo"}>
                                Aquí va el componente de búsqueda/agregar de
                                agencia.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}


              {/* USER DATA */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Mis datos personales</p>
                  <p>Completá todos los datos para continuar.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <>
                      {/* DNI */}
                      <div className="md:col-span-5">
                        <label
                            htmlFor="dni"
                            className="block text-sm font-medium text-gray-800"
                        >
                          DNI
                        </label>

                        <Field
                            id="dni"
                            name="user_dni"
                            type="text"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_dni && touched.user_dni) ||
                                formErrorsFromApi.user_dni
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                            }`}
                        />
                        {(errors.user_dni && touched.user_dni) ||
                        formErrorsFromApi.user_dni ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_dni}
                                {formErrorsFromApi.user_dni}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* PHONE */}
                      <div className="md:col-span-5">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Teléfono
                        </label>
                        <Field
                            id="phone"
                            name="user_phone"
                            type="tel"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_phone && touched.user_phone) ||
                                formErrorsFromApi.user_phone
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                            }`}
                        />
                        {(errors.user_phone && touched.user_phone) ||
                        formErrorsFromApi.user_phone ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_phone}
                                {formErrorsFromApi.user_phone}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* PROVINCE */}
                      <div className="md:col-span-2">
                        <label
                            htmlFor="province"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Provincia
                        </label>

                        <Field
                            id="province"
                            name="user_province_id"
                            component="select"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_province_id &&
                                    touched.user_province_id) ||
                                formErrorsFromApi.user_province_id
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                            }`}
                            onClick={(event) => {
                              setSelectedProvince(event.target.value);
                              setSelectedDepartment(null);
                              values.user_department_id = "0";
                              values.user_locality_id = "0";
                            }}
                            disabled={!provinces}
                        >
                          <option key={"0"} value={""}>
                            Seleccioná una opcion
                          </option>

                          {provincesLoading ? (
                              <></>
                          ) : (
                              provinces &&
                              provinces.map((province, index) => (
                                  <option key={index} value={province.id}>
                                    {province.name}
                                  </option>
                              ))
                          )}
                        </Field>

                        {(errors.user_province_id &&
                            touched.user_province_id) ||
                        provincesError ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_province_id}
                                {provincesError}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* DEPARTMENT */}
                      <div className="md:col-span-2">
                        <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Departamento / Partido
                        </label>

                        <Field
                            id="department"
                            name="user_department_id"
                            component="select"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_department_id &&
                                    touched.user_department_id) ||
                                departmentsError
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                            }`}
                            disabled={!departments}
                            onClick={(event) => {
                              setSelectedDepartment(event.target.value);
                              values.user_locality_id = "0";
                            }}
                        >
                          <option key={"0"} value={""}>
                            Seleccioná una opcion
                          </option>

                          {departmentsLoading ? (
                              <></>
                          ) : (
                              departments &&
                              departments.map((department, index) => (
                                  <option key={index} value={department.id}>
                                    {department.name}
                                  </option>
                              ))
                          )}
                        </Field>

                        {(errors.user_department_id &&
                            touched.user_department_id) ||
                        departmentsError ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_department_id}
                                {departmentsError?.message}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* ZIP CODE */}
                      <div className="md:col-span-1">
                        <label
                            htmlFor="zip_code"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Código postal
                        </label>

                        <Field
                            id="zip_code"
                            name="user_zip_code"
                            type="text"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_zip_code && touched.user_zip_code) ||
                                formErrorsFromApi.zip_code
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                            }`}
                        />
                        {(errors.user_zip_code && touched.user_zip_code) ||
                        formErrorsFromApi.zip_code ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_zip_code}
                                {formErrorsFromApi.zip_code}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* LOCALITY */}
                      <div className="md:col-span-2">
                        <label
                            htmlFor="locality"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Localidad
                        </label>

                        <Field
                            id="locality"
                            name="user_locality_id"
                            component="select"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_locality_id &&
                                    touched.user_locality_id) ||
                                localitiesError
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                            }`}
                            disabled={!localities}
                        >
                          <option key={"0"} value={""}>
                            Seleccioná una opcion
                          </option>

                          {localitiesLoading ? (
                              <></>
                          ) : (
                              localities &&
                              localities.map((locality, index) => (
                                  <option key={index} value={locality.id}>
                                    {locality.name}
                                  </option>
                              ))
                          )}
                        </Field>

                        {(errors.user_locality_id &&
                            touched.user_locality_id) ||
                        localitiesError ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_locality_id}
                                {localitiesError?.message}
                            </span>
                            </p>
                        ) : null}
                      </div>

                      {/* ADDRESS */}
                      <div className="md:col-span-3">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-800"
                        >
                          Dirección
                        </label>

                        <Field
                            id="address"
                            name="user_address"
                            type="text"
                            className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.user_address && touched.user_address) ||
                                formErrorsFromApi.user_address
                                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                            }`}
                        />
                        {(errors.user_address && touched.user_address) ||
                        formErrorsFromApi.address ? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              <span className="font-bold">Oops!</span>{" "}
                              <span className="font-normal">
                              {errors.user_address}
                                {formErrorsFromApi.address}
                            </span>
                            </p>
                        ) : null}
                      </div>
                    </>
                  </div>
                </div>
              </div>


              {/* SUBMIT BUTTON */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-3">
                <div className="text-gray-600"></div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Field
                          type="submit"
                          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded cursor-pointer"
                          name="save"
                          value="Guardar mis datos"
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
