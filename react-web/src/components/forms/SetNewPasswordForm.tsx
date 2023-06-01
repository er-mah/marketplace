import { Field, Form, Formik } from "formik";

import React from "react";

import { toast, ToastContainer } from "react-toastify";
import { SetNewPasswordSchema } from "../../utils/validationSchemas/auth.ts";
import { useMutation } from "@apollo/client";
import { SET_NEW_PASSWORD_MUTATION } from "../../graphql/user/setNewPassword.ts";

export default function SetNewPasswordForm({ code }) {
  const [setNewPassword] = useMutation(SET_NEW_PASSWORD_MUTATION);

  /**
   * This function helps interact with the server and stores the JWT from the API
   * @param values
   */
  async function onNewPasswordSubmit(values) {
    await setNewPassword({
      variables: {
        recoveryToken: code,
        password: values.password,
        repeatPassword: values.repeat_password,
      },
    })
      .then((result: any) => {
        toast.success(
          "Has cambiado tu contraseña correctamente, " +
            result.data.setNewPassword.first_name,
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
        console.error(error);

        console.log(JSON.stringify(error));
        switch (error.message) {
          case "jwt malformed": {
            toast.error("Código inválido.", {
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
          case "Invalid token.": {
            toast.error("Código inválido.", {
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
            toast.error("Error al definir nueva contraseña. ", {
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
    <div className="">
      <ToastContainer />

      <Formik
        initialValues={{ password: "", recover_password: "" }}
        onSubmit={onNewPasswordSubmit}
        validationSchema={SetNewPasswordSchema}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <p className={"text-sm"}>
              Definí las nuevas credenciales para tu cuenta.{" "}
            </p>

            {/*PASSWORD*/}
            <div>
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
                  errors.password && touched.password
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {errors.password && touched.password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">{errors.password}</span>
                </p>
              ) : null}
            </div>

            {/*REPEAT PASSWORD*/}
            <div>
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
                  errors.repeat_password && touched.repeat_password
                    ? "bg-transparent outline-none border bg-red-50 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 p-2.5 dark:bg-red-100 dark:border-red-400"
                    : "text-gray-500 bg-transparent outline-none border focus:border-indigo-600 "
                }`}
              />
              {errors.repeat_password && touched.repeat_password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-bold">Oops!</span>{" "}
                  <span className="font-normal">{errors.repeat_password}</span>
                </p>
              ) : null}
            </div>

            <Field
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 cursor-pointer"
              name="setNewPasswordButton"
              value="Guardar cambios"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
