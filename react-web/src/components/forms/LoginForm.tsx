import { Field, Form, Formik } from "formik";
import { LoginSchema } from "../../utils/validationSchemas";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import React, { useState } from "react";
import { FetchResult, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import {toast, ToastContainer} from "react-toastify";
import { AuthCacheManager } from "../../apollo/authCacheManager.ts";
import { LOGIN_MUTATION } from "../../graphql/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

interface ServerResponse {
  login: {
    id: string;
    token: string;
  };
}

export default function LoginForm() {
  // This cacheManager is used to manage the logged user token
  const cacheManager = new AuthCacheManager();

  // This is used to redirect after the user is authenticated
  const navigate = useNavigate();

  const initialErrors = {
    email: "",
    password: "",
  };

  // This variable stores any error messages returned from the server when the request fails.
  const [formErrorsFromApi, setFormErrorsFromApi] = useState(initialErrors);

  // This variable is used to toggle the visibility of the password input field between plain text and obscured characters.
  const [showPassword, setShowPassword] = useState(false);

  // This code initializes a mutation function signIn using the useMutation hook provided by the Apollo Client
  const [signIn] = useMutation(LOGIN_MUTATION);

  // Show/hide password in plain text
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * This function helps interact with the server and stores the JWT from the API
   * @param values
   */
  function onLoginSubmit(values: LoginFormValues) {
    setFormErrorsFromApi({ ...initialErrors });

    signIn({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    })
      .then((result: FetchResult<ServerResponse>) => {
        const tokenFromApi = result.data?.login.token;

        // Store token in cache
        cacheManager.storeToken(tokenFromApi);

        //Me quiero traer el usuario para despues guardarlo en la cache para despues verlo en el dashboard
        cacheManager.fetchAndStoreUser();

        navigate("/dashboard");
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

          case "Could not find user.": {
            const newErrors = { ...initialErrors };
            newErrors.email = "Credenciales inválidas";
            setFormErrorsFromApi(newErrors);
            break;
          }
          case "Wrong credentials.": {
            const newErrors = { ...initialErrors };
            newErrors.email = "Credenciales inválidas";
            setFormErrorsFromApi(newErrors);
            break;
          }
          default: {
            console.log(JSON.stringify(error))
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
      });
  }

  return (
    <div className="my-5">
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onLoginSubmit}
        validationSchema={LoginSchema}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <div>
              <label className="font-medium">Correo electrónico</label>
              <Field
                name="email"
                type="email"
                className={`w-full mt-2 px-3 py-2 ${
                  (errors.email && touched.email) || formErrorsFromApi.email
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                } shadow-sm rounded-lg`}
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

            <div>
              <label className="font-medium">Contraseña</label>
              <div className={"relative"}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full mt-2 px-3 py-2 ${
                    (errors.password && touched.password) ||
                    formErrorsFromApi.password
                      ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                      : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                  } shadow-sm rounded-lg`}
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute top-7 right-3  cursor-pointer transform -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span> {errors.password}
                </p>
              ) : null}
            </div>

            <Field
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              name="loginButton"
              value="Iniciá sesión"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
