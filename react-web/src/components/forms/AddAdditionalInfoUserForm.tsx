import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  CompleteAdditionalInfoSchema,
  OnlyUserAdditionalInfoSchema,
} from "../../utils/validationSchemas";
import { useQuery } from "@apollo/client";
import {
  GET_DEPARTMENTS_BY_PROVINCE_QUERY,
  GET_LOCALITIES_BY_DEPARTMENT_QUERY,
  GET_PROVINCES_QUERY,
} from "../../graphql";
import { SearchAgencies } from "./agency/SearchAgencies.tsx";
export const AddAdditionalInfoUserForm = () => {
  const [isAgencyRepresentative, setIsAgencyRepresentative] = useState(false);

  const [selectedUserProvinceId, setSelectedUserProvinceId] = useState(null);
  const [selectedUserDepartmentId, setSelectedUserDepartmentId] =
    useState(null);

  const [selectedAgencyProvinceId, setSelectedAgencyProvinceId] =
    useState(null);
  const [selectedAgencyDepartmentId, setSelectedAgencyDepartmentId] =
    useState(null);

  const [showCreateAgency, setShowCreateAgency] = useState(false);

  const {
    loading: provincesLoading,
    error: provincesError,
    data: { getAllProvinces: provinces } = {},
  } = useQuery(GET_PROVINCES_QUERY);

  const {
    loading: userDepartmentsLoading,
    error: userDepartmentsError,
    data: { getDepartmentsByProvinceId: userDepartments } = {},
  } = useQuery(GET_DEPARTMENTS_BY_PROVINCE_QUERY, {
    skip: !selectedUserProvinceId,
    variables: { provinceId: selectedUserProvinceId },
  });

  const {
    loading: userLocalitiesLoading,
    error: userLocalitiesError,
    data: { getLocalitiesByDepartmentId: userLocalities } = {},
  } = useQuery(GET_LOCALITIES_BY_DEPARTMENT_QUERY, {
    skip: !selectedUserDepartmentId,
    variables: { departmentId: selectedUserDepartmentId },
  });

  const {
    loading: agencyDepartmentsLoading,
    error: agencyDepartmentsError,
    data: { getDepartmentsByProvinceId: agencyDepartments } = {},
  } = useQuery(GET_DEPARTMENTS_BY_PROVINCE_QUERY, {
    skip: !selectedAgencyProvinceId,
    variables: { provinceId: selectedAgencyProvinceId },
  });

  const {
    loading: agencyLocalitiesLoading,
    error: agencyLocalitiesError,
    data: { getLocalitiesByDepartmentId: agencyLocalities } = {},
  } = useQuery(GET_LOCALITIES_BY_DEPARTMENT_QUERY, {
    skip: !selectedAgencyDepartmentId,
    variables: { departmentId: selectedAgencyDepartmentId },
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

  const [formErrorsFromApi, setFormErrorsFromApi] = useState(initialErrors);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    // Check if there's not a selected agency submitted
    if (!values.user_agency_id) {
      // Check if it is created
      if (!showCreateAgency) {
        setFormErrorsFromApi({
          ...formErrorsFromApi,
          user_agency_id: `Tenés que seleccionar una agencia o crearla haciendo click en el boton "Crear agencia" del menú desplegable de búsqueda.`,
        });
      }
    }
    // Set submission as completed
    setSubmitting(false);
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
    agency_province_id: "",
    agency_department_id: "",
    agency_locality_id: "",
    agency_name: "",
    agency_phone: "",
    agency_zip_code: "",
  };

  return (
    <>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <Formik
          initialValues={
            showCreateAgency ? completeInitialValues : onlyUserInitialValues
          }
          onSubmit={handleSubmit}
          validationSchema={
            showCreateAgency
              ? CompleteAdditionalInfoSchema
              : OnlyUserAdditionalInfoSchema
          }
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <code className="flex whitespace-normal overflow-auto text-sm todo">
                {JSON.stringify(values)}
              </code>
              <code className="flex whitespace-normal overflow-auto text-sm todo">
                {JSON.stringify(errors)}
              </code>

              {/* IS AGENCY REPRESENTATIVE ? */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-5">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">¿Sos agenciero?</p>
                  <p>
                    Especificá en caso de que representes una empresa, sus datos
                    correspondientes.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Field
                          type="checkbox"
                          name="user_is_agency_representative"
                          id="is_agency_representative"
                          className="sr-only peer"
                          onClick={() =>
                            setIsAgencyRepresentative(!isAgencyRepresentative)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Represento a una agencia
                        </span>
                      </label>
                      {isAgencyRepresentative ? (
                        <SearchAgencies
                          setShowCreateAgency={setShowCreateAgency}
                          setFieldValue={setFieldValue}
                          agencyIdFromForm={values.user_agency_id}
                          formErrorsFromApi={formErrorsFromApi}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* AGENCY DATA */}
              {showCreateAgency ? (
                <>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-7">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Creando tu agencia</p>
                      <p>Definí los datos de la agencia que representás.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <>
                          {/* NAME */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="agency_name"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Nombre de la agencia
                            </label>

                            <Field
                              id="agency_name"
                              name="agency_name"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_name && touched.agency_name) ||
                                formErrorsFromApi.agency_name
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.agency_name && touched.agency_name) ||
                            formErrorsFromApi.agency_name ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_name}
                                  {formErrorsFromApi.agency_name}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* PHONE */}
                          <div className="md:col-span-1">
                            <label
                              htmlFor="agency_phone"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Teléfono
                            </label>
                            <Field
                              id="agency_phone"
                              name="agency_phone"
                              type="tel"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_phone && touched.agency_phone) ||
                                formErrorsFromApi.agency_phone
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                            />
                            {(errors.agency_phone && touched.agency_phone) ||
                            formErrorsFromApi.agency_phone ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_phone}
                                  {formErrorsFromApi.agency_phone}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* EMAIL */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="agency_email"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Correo electrónico
                            </label>

                            <Field
                              id={"agency_email"}
                              name="agency_email"
                              type="email"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_email && touched.agency_email) ||
                                formErrorsFromApi.agency_email
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                            />
                            {(errors.agency_email && touched.agency_email) ||
                            formErrorsFromApi.agency_email ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_email}
                                  {formErrorsFromApi.agency_email}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* PROVINCE */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="agency_province_id"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Provincia
                            </label>

                            <Field
                              id="agency_province_id"
                              name="agency_province_id"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_province_id &&
                                  touched.agency_province_id) ||
                                formErrorsFromApi.agency_province_id
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              onClick={(event) => {
                                setSelectedAgencyProvinceId(event.target.value);
                                setSelectedAgencyDepartmentId(null);
                                values.agency_department_id = "0";
                                values.agency_locality_id = "0";
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

                            {(errors.agency_province_id &&
                              touched.agency_province_id) ||
                            provincesError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_province_id}
                                  {provincesError}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* DEPARTMENT */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="agency_department_id"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Departamento / Partido
                            </label>

                            <Field
                              id="agency_department_id"
                              name="agency_department_id"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_department_id &&
                                  touched.agency_department_id) ||
                                agencyDepartmentsError
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              disabled={!agencyDepartments}
                              onClick={(event) => {
                                setSelectedAgencyDepartmentId(
                                  event.target.value
                                );
                                values.agency_locality_id = "0";
                              }}
                            >
                              <option key={"0"} value={""}>
                                Seleccioná una opcion
                              </option>

                              {agencyDepartmentsLoading ? (
                                <></>
                              ) : (
                                agencyDepartments &&
                                agencyDepartments.map((department, index) => (
                                  <option key={index} value={department.id}>
                                    {department.name}
                                  </option>
                                ))
                              )}
                            </Field>

                            {(errors.agency_department_id &&
                              touched.agency_department_id) ||
                            agencyDepartmentsError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_department_id}
                                  {agencyDepartmentsError?.message}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* ZIP CODE */}
                          <div className="md:col-span-1">
                            <label
                              htmlFor="agency_zip_code"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Código postal
                            </label>

                            <Field
                              id="agency_zip_code"
                              name="agency_zip_code"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_zip_code &&
                                  touched.agency_zip_code) ||
                                formErrorsFromApi.agency_zip_code
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.agency_zip_code &&
                              touched.agency_zip_code) ||
                            formErrorsFromApi.agency_zip_code ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_zip_code}
                                  {formErrorsFromApi.agency_zip_code}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* LOCALITY */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="agency_locality_id"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Localidad
                            </label>

                            <Field
                              id="agency_locality_id"
                              name="agency_locality_id"
                              component="select"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_locality_id &&
                                  touched.agency_locality_id) ||
                                agencyLocalitiesError
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                              }`}
                              disabled={!agencyLocalities}
                            >
                              <option key={"0"} value={""}>
                                Seleccioná una opcion
                              </option>

                              {agencyLocalitiesLoading ? (
                                <></>
                              ) : (
                                agencyLocalities &&
                                agencyLocalities.map((locality, index) => (
                                  <option key={index} value={locality.id}>
                                    {locality.name}
                                  </option>
                                ))
                              )}
                            </Field>

                            {(errors.agency_locality_id &&
                              touched.agency_locality_id) ||
                            agencyLocalitiesError ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_locality_id}
                                  {agencyLocalitiesError}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* ADDRESS */}
                          <div className="md:col-span-3">
                            <label
                              htmlFor="agency_address"
                              className="block text-sm font-medium text-gray-800"
                            >
                              Dirección
                            </label>

                            <Field
                              id="agency_address"
                              name="agency_address"
                              type="text"
                              className={`mt-1 p-2 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm ${
                                (errors.agency_address &&
                                  touched.agency_address) ||
                                formErrorsFromApi.agency_address
                                  ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2 dark:bg-red-100 dark:border-red-400"
                                  : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                              }`}
                            />
                            {(errors.agency_address &&
                              touched.agency_address) ||
                            formErrorsFromApi.agency_address ? (
                              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-bold">Oops!</span>{" "}
                                <span className="font-normal">
                                  {errors.agency_address}
                                  {formErrorsFromApi.agency_address}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          {/* AGENCY PROFILE PICTURE
                          <div className="md:col-span-5 my-2 todo">
                            <form className="flex items-center space-x-6">
                              <div className="shrink-0">
                                <img
                                  className="h-16 w-16 object-cover rounded-full"
                                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                                  alt="Current profile photo"
                                />
                              </div>
                              <label className="block">
                                <span className="sr-only">
                                  Choose profile photo
                                </span>
                                <input
                                  type="file"
                                  className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                  "
                                />
                              </label>
                            </form>
                          </div>
                          */}
                        </>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* USER DATA */}
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-7">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Tus datos personales</p>
                  <p>Completá todos los datos para continuar.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <>
                      {/* DNI */}
                      <div className="md:col-span-3">
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
                      <div className="md:col-span-2">
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
                            setSelectedUserProvinceId(event.target.value);
                            setSelectedUserDepartmentId(null);
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
                            userDepartmentsError
                              ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                              : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                          }`}
                          disabled={!userDepartments}
                          onClick={(event) => {
                            setSelectedUserDepartmentId(event.target.value);
                            values.user_locality_id = "0";
                          }}
                        >
                          <option key={"0"} value={""}>
                            Seleccioná una opcion
                          </option>

                          {userDepartmentsLoading ? (
                            <></>
                          ) : (
                            userDepartments &&
                            userDepartments.map((department, index) => (
                              <option key={index} value={department.id}>
                                {department.name}
                              </option>
                            ))
                          )}
                        </Field>

                        {(errors.user_department_id &&
                          touched.user_department_id) ||
                        userDepartmentsError ? (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-bold">Oops!</span>{" "}
                            <span className="font-normal">
                              {errors.user_department_id}
                              {userDepartmentsError?.message}
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
                            userLocalitiesError
                              ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                              : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600"
                          }`}
                          disabled={!userLocalities}
                        >
                          <option key={"0"} value={""}>
                            Seleccioná una opcion
                          </option>

                          {userLocalitiesLoading ? (
                            <></>
                          ) : (
                            userLocalities &&
                            userLocalities.map((locality, index) => (
                              <option key={index} value={locality.id}>
                                {locality.name}
                              </option>
                            ))
                          )}
                        </Field>

                        {(errors.user_locality_id &&
                          touched.user_locality_id) ||
                        userLocalitiesError ? (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-bold">Oops!</span>{" "}
                            <span className="font-normal">
                              {errors.user_locality_id}
                              {userLocalitiesError?.message}
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
