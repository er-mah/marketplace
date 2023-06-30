import React from "react";
import {CreatePublicationForm} from "../../components/forms/publication/create/CreatePublicationForm.tsx";

export const CreatePublication = () => {
  return (
    <>
      <div className="flex items-top justify-center bg-gray-50 rounded-3xl">
        <div className="container max-w-screen-lg mx-auto  p-3">
          <div className="mb-3">
            <h2 className="font-semibold text-xl text-gray-600 mt-2">
              Creando publicación
            </h2>
            <p className="text-gray-500 mt-2">
              En el siguiente formulario, necesitamos que completes la
              información del vehículo que estás vendiendo para publicarlo en
              nuestra tienda virtual.
            </p>
          </div>
            <CreatePublicationForm />
        </div>
      </div>
    </>
  );
};
