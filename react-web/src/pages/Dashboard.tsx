import React, { useEffect, useState } from "react";
import { AuthCacheManager } from "../apollo/authCacheManager.ts";

export const DashboardPage = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const authCacheManager = new AuthCacheManager();

  useEffect(() => {
    authCacheManager.getToken().then((r) => {
      setToken(JSON.stringify(r));
    });
    authCacheManager.getLoggedUser().then((r) => {
      setUser(JSON.stringify(r));
    });
  });

  return (
    <div>
      <h1>Bienvenido!!</h1>
      <p>Tu token {token}</p>
      <p>Tus datos {user}</p>
    </div>
  );
};
