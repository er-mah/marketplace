import React, { useEffect, useState } from "react";
import { AuthCacheManager } from "../apollo/authCacheManager.ts";
import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { fullPaths } from "../utils/routesConstants";
import {Sidebar} from "./dashboard/Sidebar";

const authCacheManager = new AuthCacheManager();

export const Dashboard = ({ ChildComponent }) => {

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    authCacheManager.getToken().then((r) => {
      setToken(JSON.stringify(r));
    });
    authCacheManager.getLoggedUser().then((r) => {
      setUser(JSON.stringify(r));
    });
  });


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow ">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 overflow-y-auto bg-red-200">
          <div className="p-4">
            {ChildComponent ? (
              <ChildComponent />
            ) : (
              <p>Selecciona un componente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
