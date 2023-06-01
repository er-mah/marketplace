import React from "react";
import {AddAdditionalInfoUserForm} from "../../components/forms/AddAdditionalInfoUserForm.tsx";

export const AddUserAdditionalInfoPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className={"mb-6"}>
            <h2 className="font-semibold text-xl text-gray-600">
              Añadí datos adicionales
            </h2>
            <p className="text-gray-500 ">
              Para poder ofrecerte la mejor experiencia posible, necesitamos que
              nos ayudes completando algunos datos importantes en el siguiente
              formulario.
            </p>
          </div>

          <AddAdditionalInfoUserForm />
        </div>
      </div>
    </div>
  );
};
