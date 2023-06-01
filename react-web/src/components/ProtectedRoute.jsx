import React, { useEffect, useState } from "react";
import { AuthCacheManager } from "../apollo/authCacheManager";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { fullPaths } from "../utils/routesConstants";

const authCacheManager = new AuthCacheManager();

const isAuthenticated = async () => {
  const token = await authCacheManager.getToken();
  let user = await authCacheManager.getLoggedUser();

  if (token && !user) {
    await authCacheManager.fetchAndStoreUser();
  }

  user = await authCacheManager.getLoggedUser();

  // Verifica si el token existe y si hay un usuario autenticado
  return token && user;
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      navigate(fullPaths.login); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  };

  useEffect(() => {
    checkAuthentication();
  });

  return <Component />;
};
