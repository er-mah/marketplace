import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/misc/LoadingSpinner.tsx";
import { FetchResult, useMutation } from "@apollo/client";
import { VERIFY_ACCOUNT_MUTATION } from "../../graphql/user/verifyAccountMutation.ts";
import { RESEND_ACCOUNT_VERIFICATION_CODE_MUTATION } from "../../graphql/user/resendVerificationCodeMutation.ts";
import { toast, ToastContainer } from "react-toastify";
import { fullPaths } from "../../utils/routesConstants.js";
import { jwtUtils } from "../../utils/jwt.ts";

interface VerificationCodeServerResponse {
  resendVerificationCode: string;
}

export const VerifyAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [correctlyVerified, setCorrectlyVerified] = useState(false);

  const [errorsInVerification, setErrorsInVerification] = useState(false);

  const [verifyAccount] = useMutation(VERIFY_ACCOUNT_MUTATION);
  const [resendVerificationCode] = useMutation(
    RESEND_ACCOUNT_VERIFICATION_CODE_MUTATION
  );

  useEffect(() => {
    // Extract token from url
    const code = searchParams.get("c");

    if (!code) {
      navigate(fullPaths.login);
    } else {
      verifyAccount({
        variables: {
          verificationToken: code,
        },
      })
        .then((result) => {
          if (result.data) {
            setCorrectlyVerified(true);
          }

          setLoading(false);
          return;
        })
        .catch(async (e) => {
          setErrorsInVerification(true);

          if (e.message === "Account already verified.") {
            setErrorsInVerification(false);
            setCorrectlyVerified(true);

            setLoading(false);
          }

          if (e.graphQLErrors[0].message === "jwt expired") {
            setErrorsInVerification(true);
            const emailFromJWT = await jwtUtils.getEmailFromToken(code);

            await resendVerificationCode({
              variables: {
                email: emailFromJWT,
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
                setTimeout(() => {
                  setErrorsInVerification(true);

                  setLoading(false);
                }, 1000);
              })
              .catch((_error) => {
                return;
              });

            setTimeout(() => {
              setErrorsInVerification(true);

              setLoading(false);
            }, 1000);
            return;
          }
        });
    }
  }, [navigate, resendVerificationCode, searchParams, verifyAccount]);

  return (
    <div>
      {loading ? <LoadingSpinner isLoading={loading} /> : <></>}
      <ToastContainer />
      {correctlyVerified ? (
        <>
          <main className=" select-none w-full h-screen flex flex-col items-center justify-center bg-light-green sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
              <div className="text-center">
                <img
                  src="https://i-static.techmo.global/uploads/techmo-normal.svg"
                  width={200}
                  className="mx-auto pointer-events-none"
                  alt="TechMo logo"
                />
                <div className="mt-5 space-y-2">
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                    Verificaste tu cuenta
                  </h3>
                </div>
              </div>
              <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg text-center">
                <div>
                  <p>¡Perfecto, ya verificaste tu cuenta!</p>
                  <p>Ahora solamente queda que inicies sesión.</p>
                </div>

                <div>
                  <a
                    href={fullPaths.login}
                    className="w-full px-4 py-2 button text-white font-medium bg-green-600 hover:bg-green-500 active:bg-indigo-600 rounded-lg duration-150 cursor-pointer"
                  >
                    Iniciar sesión
                  </a>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <></>
      )}

      {errorsInVerification ? (
        <main className=" select-none w-full h-screen flex flex-col items-center justify-center bg-light-green sm:px-4">
          <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
              <img
                src="https://i-static.techmo.global/uploads/techmo-normal.svg"
                width={200}
                className="mx-auto pointer-events-none"
                alt="TechMo logo"
              />
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Tu código expiró
                </h3>
              </div>
            </div>
            <div className="bg-white shadow p-4 py-6 space-y-4 sm:p-6 sm:rounded-lg">
              <p>¡Hola! Parece que tu token ha expirado.</p>
              <p>
                No te preocupes, hemos enviado un nuevo token a tu correo
                electrónico.
              </p>
              <p>
                Por favor, revisá tu bandeja de entrada y seguí las
                instrucciones para continuar. Si necesitás ayuda adicional, no
                dudes en contactarnos. ¡Gracias por usar nuestros servicios!
              </p>
            </div>
          </div>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
};
