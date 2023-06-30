import React, { useEffect, useState } from "react";
import { AuthCacheManager } from "../apollo/authCacheManager.ts";
import { Header } from "../components/Header";
import {Sidebar} from "./dashboard/Sidebar";
import {ChipsMenu} from "./dashboard/ChipsMenu";

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

        <div className="w-full md:hidden">
          <ChipsMenu />
        </div>
        <div className="flex flex-grow">
          <div className="md:w-1/5">
            <div className="hidden md:block h-full">
              <Sidebar />
            </div>
          </div>
          <div className="md:w-4/5 overflow-y-auto lg:h-auto flex flex-col">
            <div className="p-4 flex-grow">
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
