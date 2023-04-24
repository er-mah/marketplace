import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FetchResult, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../components/Alert.tsx";
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

// Login validation schema that defines the form validation rules
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este no es el formato de un email valido")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

const Login = () => {
  // This cacheManager is used to manage the logged user token
  const cacheManager = new AuthCacheManager();

  // This is used to redirect after the user is authenticated
  const navigate = useNavigate();

  // This variable stores any error messages returned from the server when the login request fails.
  const [errorFromServer, setErrorFromServer] = useState("");

  const [errorInForm, setErrorInForm] = useState("");

  // This variable is used to toggle the visibility of the password input field between plain text and obscured characters.
  const [showPassword, setShowPassword] = useState(false);

  // This code initializes a mutation function signIn using the useMutation hook provided by the Apollo Client
  const [signIn] = useMutation(LOGIN_MUTATION);

  // Callback function used by the Alert to hide the toast whenever is needed
  const dismissErrorMessage = () => {
    setErrorFromServer("");
  };

  // Show/hide password in plain text
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearErrorInForm = () => {
    setErrorInForm("");
  };

  /**
   * This function helps interact with the server and stores the JWT from the API
   * @param values
   */
  function onLoginSubmit(values: LoginFormValues) {
    setErrorInForm("");

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
            setErrorFromServer("Error con la conexión al servidor");
            break;
          }
          case "Could not find user.": {
            setErrorInForm("Credenciales inválidas");
            break;
          }
          case "Wrong credentials.": {
            setErrorInForm("Credenciales inválidas");
            break;
          }
          default: {
            setErrorFromServer(error.message);
            break;
          }
        }
      });
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-light-green sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img
            src="https://i-static.techmo.global/uploads/techmo-normal.svg"
            width={200}
            className="mx-auto"
            alt="TechMo logo"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Accedé con tu cuenta
            </h3>
            <p className="">
              ¿No tenés una cuenta?{" "}
              <a
                href="/auth/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Registrate
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg ">
          <div className="grid grid-cols-2 gap-x-3 todo">
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100 ">
              <img
                className={"w-5 h-5"}
                src="https://i-static.techmo.global/uploads/mini-google.svg"
                alt="Google logo login button"
              />
            </button>
            <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <img
                className={"w-5 h-5"}
                src="https://i-static.techmo.global/uploads/mini-facebook.svg"
                alt="Facebook logo login button"
              />
            </button>
          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              O continuá con
            </p>
          </div>
          <Alert
            message={errorFromServer}
            description={""}
            duration={3000}
            onDismiss={dismissErrorMessage}
          ></Alert>
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
                    onClick={() => clearErrorInForm()}
                    className={`w-full mt-2 px-3 py-2 ${
                      (errors.email && touched.email) || errorInForm
                        ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                        : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                    } shadow-sm rounded-lg`}
                  />

                  {(errors.email && touched.email) || errorInForm ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-bold">Oops!</span>{" "}
                      <span className="font-normal">
                        {errors.email}
                        {errorInForm}
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
                      onClick={() => clearErrorInForm()}
                      className={`w-full mt-2 px-3 py-2 ${
                        (errors.password && touched.password) || errorInForm
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
        <div className="text-center todo">
          <a href="#" className="hover:text-indigo-600">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
