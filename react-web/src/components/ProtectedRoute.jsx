import React, { useEffect, useState } from "react";
import { AuthCacheManager } from "../apollo/authCacheManager";
import { Navigate, Route } from "react-router-dom";
import { fullPaths } from "../utils/routesConstants";

const authCacheManager = new AuthCacheManager();

export function ProtectedRoute({ component: Component, ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authCacheManager
      .getLoggedUser()
      .then((response) => {
        setAuthenticated(true);
      })
      .catch((e) => {
        setAuthenticated(false);
      });
  });

  return (
    <>
      {authenticated ? (
        <Component />
      ) : (
        <Navigate to={fullPaths.login} replace />
      )}
    </>
  );
}
