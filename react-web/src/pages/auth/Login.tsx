import React from "react";
import LoginForm from "../../components/forms/LoginForm.tsx";

export const Login = () => {
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

            <LoginForm />
          </div>
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
