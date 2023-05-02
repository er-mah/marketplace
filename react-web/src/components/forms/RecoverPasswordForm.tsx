import { Field, Form, Formik } from "formik";

import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { RecoverPasswordSchema } from "../../utils/validationSchemas/auth.ts";
import { useMutation } from "@apollo/client";
import { SEND_PASSWORD_RECOVERY_MUTATION } from "../../graphql/user/sendPasswordRecoveryEmailMutation.ts";

interface RecoverPasswordFormFormValues {
  email: string;
}

export default function RecoverPasswordForm() {
  const initialErrors = {
    email: "",
  };

  const [sendPasswordRecoveryEmail] = useMutation(
    SEND_PASSWORD_RECOVERY_MUTATION
  );

  // This variable stores any error messages returned from the server when the request fails.
  const [formErrorsFromApi, setFormErrorsFromApi] = useState(initialErrors);

  // This code initializes a mutation function signIn using the useMutation hook provided by the Apollo Client
  //const [signIn] = useMutation(LOGIN_MUTATION);

  /**
   * This function helps interact with the server and stores the JWT from the API
   * @param values
   */
  async function onLoginSubmit(values: RecoverPasswordFormFormValues) {
    setFormErrorsFromApi({ ...initialErrors });

    await sendPasswordRecoveryEmail({
      variables: {
        email: values.email,
      },
    })
      .then((_result: any) => {
        toast.success(
          "El correo de recuperación ha sido enviado a tu bandeja de entrada",
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
      .catch((error) => {
        toast.error("Error al enviar el codigo de recuperación: " + error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  return (
    <div className="">
      <ToastContainer />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onLoginSubmit}
        validationSchema={RecoverPasswordSchema}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <p className={"text-sm"}>
              Si te olvidaste tu contraseña, no te preocupes.
            </p>
            <p className={"text-sm"}>
              Ingresá tu dirección correo electronico y, si encontramos alguna
              cuenta que coincida, te vamos a enviar un correo electronico para
              reestablecer tu contraseña.{" "}
            </p>
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
            </div>

            <Field
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 cursor-pointer"
              name="loginButton"
              value="Enviar un correo de reestablecimiento"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
