import { fullPaths } from "../../utils/routesConstants";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ChipsMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <div className={"flex items-center gap-2 overflow-x-auto px-4"}>
        <div
          className={`text-center font-bold p-2 rounded-lg cursor-pointer ${
            isActive(fullPaths.dashboard.userPublications)
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-300`}
          onClick={() => navigate(fullPaths.dashboard.userPublications)}
        >
          <span className={"whitespace-nowrap"}>Mis publicaciones</span>
        </div>
        <div
          className={`text-center font-bold p-2 rounded-lg cursor-pointer ${
            isActive(fullPaths.dashboard.createPublication)
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          } hover:bg-green-300`}
          onClick={() => navigate(fullPaths.dashboard.createPublication)}
        >
          <span className={"whitespace-nowrap"}>Crear publicación</span>
        </div>
        <div
            className={`text-center font-bold p-2 rounded-lg cursor-pointer ${
                isActive(fullPaths.dashboard.profile)
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-800"
            } hover:bg-green-300`}
            onClick={() => navigate(fullPaths.dashboard.profile)}
        >
          <span className={"whitespace-nowrap"}>Perfil</span>
        </div>
      </div>
    </div>
  );
};
