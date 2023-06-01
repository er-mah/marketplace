import { Field, Form, Formik } from "formik";
import { LoginSchema } from "../../utils/validationSchemas";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import React, { useState } from "react";
import { FetchResult, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { AuthCacheManager } from "../../apollo/authCacheManager.ts";
import { LOGIN_MUTATION } from "../../graphql/auth";
import { RESEND_ACCOUNT_VERIFICATION_CODE_MUTATION } from "../../graphql/user/resendVerificationCodeMutation.ts";
import { fullPaths } from "../../utils/routesConstants.js";

interface LoginFormValues {
  email: string;
  password: string;
}
interface VerificationCodeServerResponse {
  resendVerificationCode: string;
}

interface ServerResponse {
  login: {
    token: string;
    pending_steps: string;
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

  const [showResend, setShowResend] = useState(false);

  const [storedEmail, setStoredEmail] = useState("");

  // This code initializes a mutation function signIn using the useMutation hook provided by the Apollo Client
  const [signIn] = useMutation(LOGIN_MUTATION);

  const [resendVerificationCode] = useMutation(
    RESEND_ACCOUNT_VERIFICATION_CODE_MUTATION
  );

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
      .then(async (result: FetchResult<ServerResponse>) => {
        const response = result.data?.login;

        // Store token in cache
        await cacheManager.storeToken(response?.token);

        if (response?.pending_steps === "provideAdditionalData") {
          navigate(fullPaths.userAdditionalInfo);
        } else if (response?.pending_steps === "no additional steps") {
          navigate(fullPaths.dashboard);
        }
      })
      .catch(async (error) => {
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
          case "Please check your inbox for a verification code.": {
            setShowResend(true);
            await setStoredEmail(values.email);
            toast.info(error.graphQLErrors[0].extensions.details.message, {
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
      });
  }

  function handleResendButton() {
    resendVerificationCode({
      variables: {
        email: storedEmail,
      },
    })
      .then((_result: FetchResult<VerificationCodeServerResponse>) => {
        toast.success(
          "Enviamos a tu bandeja de correo el codigo de verificación",
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
      })
      .catch((_error) => {
        toast.success(
          "Enviamos a tu bandeja de correo el codigo de verificación",
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <Field
                id="email"
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

              {showResend ? (
                <div className="bg-white text-center lg:px-4 mt-4">
                  <div
                    className="p-2 bg-yellow-800 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex cursor-pointer"
                    role="alert"
                    onClick={() => handleResendButton()}
                  >
                    <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                      ?
                    </span>
                    <span className="font-semibold mr-2 text-left text-sm flex-auto">
                      Reenviar codigo de verificación
                    </span>
                    <svg
                      className="fill-current opacity-75 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>

              <div className={"relative"}>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    (errors.password && touched.password) ||
                    formErrorsFromApi.password
                      ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                      : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                  }`}
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute top-6 right-3 cursor-pointer transform -translate-y-1/2 focus:outline-none"
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
              className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-indigo-600 rounded-lg duration-150 cursor-pointer"
              name="loginButton"
              value="Iniciá sesión"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
