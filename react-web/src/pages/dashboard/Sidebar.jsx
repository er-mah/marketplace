import { fullPaths } from "../../utils/routesConstants";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="p-4">
      <button
        className={`block w-full text-center font-bold py-2 px-4 mb-2 rounded-lg ${
          isActive(fullPaths.dashboard.userPublications)
            ? "bg-green-200 text-green-800"
            : "bg-gray-200 text-gray-800"
        } hover:bg-green-300`}
        onClick={() => navigate(fullPaths.dashboard.userPublications)}
      >
        Mis publicaciones
      </button>
      <button
        className={`block w-full text-center font-bold py-2 px-4 mb-2 rounded-lg ${
          isActive(fullPaths.dashboard.profile)
            ? "bg-green-200 text-green-800"
            : "bg-gray-200 text-gray-800"
        } hover:bg-green-300`}
        onClick={() => navigate(fullPaths.dashboard.profile)}
      >
        Perfil
      </button>
      <button
        className={`block w-full text-center font-bold py-2 px-4 mb-2 rounded-lg ${
          isActive(fullPaths.dashboard.createPublication)
            ? "bg-green-200 text-green-800"
            : "bg-gray-200 text-gray-800"
        } hover:bg-green-300`}
        onClick={() => navigate(fullPaths.dashboard.createPublication)}
      >
        Crear publicación
      </button>
    </div>
  );
};
