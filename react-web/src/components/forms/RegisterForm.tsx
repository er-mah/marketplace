import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { RegisterSchema } from "../../utils/validationSchemas";
import { FetchResult, useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../graphql/auth";
import { toast, ToastContainer } from "react-toastify";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  repeat_password: string;
}

interface ServerResponse {
  register: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export default function RegisterForm() {
  // This code initializes a mutation function signIn using the useMutation hook provided by the Apollo Client
  const [signUp] = useMutation(REGISTER_MUTATION);

  // Defines button loading state
  const [isLoading, setIsLoading] = useState(false);

  const initialErrors = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  };

  const [formErrorsFromApi, setFormErrorsFromApi] = useState(initialErrors);

  async function onRegisterSubmit(values: RegisterFormValues) {
    setFormErrorsFromApi({ ...initialErrors });
    // Agregamos un pequeño timeout para dar tiempo a la UI para actualizar antes de ejecutar la mutación
    setTimeout(() => {
      setIsLoading(true);

      signUp({
        variables: {
          input: {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            repeat_password: values.repeat_password,
          },
        },
      })
        .then((result: FetchResult<ServerResponse>) => {
          toast.info(
            `Revisá tu bandeja en ${result.data?.register.email} buscando el email de verificación.`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );

          setIsLoading(false);
        })
        .catch((error) => {
          switch (error.message) {
            case "Failed to fetch": {
              toast.error("Error con la conexión al servidor", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              break;
            }

            case "Validation error on input form.": {
              const newErrors = { ...initialErrors };

              if (error.graphQLErrors.details.first_name) {
                newErrors.first_name = error.graphQLErrors.details.first_name;
              }

              if (error.graphQLErrors.details.last_name) {
                newErrors.last_name = error.graphQLErrors.details.last_name;
              }

              if (error.graphQLErrors.details.email) {
                newErrors.email = error.graphQLErrors.details.email;
              }

              if (error.graphQLErrors.details.password) {
                newErrors.password = error.graphQLErrors.details.password;
              }

              setFormErrorsFromApi(newErrors);
              break;
            }
            case "This email address is already registered.": {
              const newErrors = { ...initialErrors };
              newErrors.email = "Esta dirección de correo ya está registrada";
              setFormErrorsFromApi(newErrors);
              break;
            }
            default: {
              toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              break;
            }
          }

          setIsLoading(false);
        });
    }, 1000);

  }


  return (
    <div className={"w-full"}>
      <ToastContainer />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          repeat_password: "",
        }}
        onSubmit={onRegisterSubmit}
        validationSchema={RegisterSchema}
      >
        {({ errors, touched }) => (
          <Form className="mt-8 grid grid-cols-6 gap-6  ">
            {/*FIRST NAME*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre(s)
              </label>

              <Field
                id={"first_name"}
                name="first_name"
                type="text"

                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                  (errors.first_name && touched.first_name) ||
                  formErrorsFromApi.first_name
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {(errors.first_name && touched.first_name) ||
              formErrorsFromApi.first_name ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">
                    {errors.first_name}
                    {formErrorsFromApi.first_name}
                  </span>
                </p>
              ) : null}
            </div>

            {/*LAST NAME*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Apellidos(s)
              </label>

              <Field
                id={"last_name"}
                name="last_name"
                type="text"

                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                  (errors.last_name && touched.last_name) ||
                  formErrorsFromApi.last_name
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {(errors.last_name && touched.last_name) ||
              formErrorsFromApi.last_name ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">
                    {errors.last_name}
                    {formErrorsFromApi.last_name}
                  </span>
                </p>
              ) : null}
            </div>

            {/*EMAIL*/}
            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>

              <Field
                id={"email"}
                name="email"
                type="email"
                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                  (errors.email && touched.email) || formErrorsFromApi.email
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {(errors.email && touched.email) || formErrorsFromApi.email ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">
                    {errors.email}
                    {formErrorsFromApi.email}
                  </span>
                </p>
              ) : null}
            </div>

            {/*PASSWORD*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>

              <Field
                id={"password"}
                name="password"
                type="password"
                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                  (errors.password && touched.password) ||
                  formErrorsFromApi.password
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {(errors.password && touched.password) ||
              formErrorsFromApi.password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">
                    {errors.password}
                    {formErrorsFromApi.password}
                  </span>
                </p>
              ) : null}
            </div>

            {/*REPEAT PASSWORD*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="repeat_password"
                className="block text-sm font-medium text-gray-700"
              >
                Repetí tu contraseña
              </label>

              <Field
                id={"repeat_password"}
                name="repeat_password"
                type="password"
                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                  (errors.repeat_password && touched.repeat_password) ||
                  formErrorsFromApi.repeat_password
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {(errors.repeat_password && touched.repeat_password) ||
              formErrorsFromApi.repeat_password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">
                    {errors.repeat_password}
                    {formErrorsFromApi.repeat_password}
                  </span>
                </p>
              ) : null}
            </div>

            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                Al crear una cuenta, aceptás nuestros{" "}
                <a href="#" className="text-gray-700 underline todo">
                  términos y condiciones
                </a>
                .
              </p>
            </div>

            {/*SUBMIT BUTTON*/}
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4 relative">
              <Field
                type="submit"
                className={`inline-block shrink-0 rounded-md border border-green-600 bg-green-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-800 focus:outline-none focus:ring active:text-blue-500 hover:cursor-pointer ${
                  isLoading ? "opacity-50 pointer-events-none" : ""
                }`}
                name="registerButton"
                value="Creá tu cuenta"
              />

              {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-left p-3">
                    <ArrowPathIcon className="animate-spin h-5 w-5 text-white"/>
                  </div>
              )}

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                ¿Ya tenés una cuenta?{" "}
                <a href="/auth/login" className="text-gray-700 underline">
                  Iniciar sesión
                </a>
                .
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
