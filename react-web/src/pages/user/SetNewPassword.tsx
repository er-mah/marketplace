import React, { useEffect, useState } from "react";
import { fullPaths } from "../../utils/routesConstants.js";
import SetNewPasswordForm from "../../components/forms/SetNewPasswordForm.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/misc/LoadingSpinner.tsx";

export const SetNewPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    // Extract token from url
    const code = searchParams.get("c");

    if (!code) {
      navigate(fullPaths.login);
    } else {
      setVerificationCode(code);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate, searchParams]);

  return (
    <>
      {loading ? <LoadingSpinner isLoading={loading} /> : <></>}
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
                Nueva contraseña
              </h3>
              <p className="">
                ¿Te la acordaste la anterior?{" "}
                <a
                  href={fullPaths.login}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Iniciá sesión
                </a>
              </p>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg ">
            <SetNewPasswordForm code={verificationCode} />
          </div>
        </div>
      </main>
    </>
  );
};

export default SetNewPasswordPage;
