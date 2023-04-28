import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import routes from "./routes.js";

// CSS
import "./index.css";
//import "flowbite";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {routes.map((route) => (
            // @ts-ignore
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute) => (
                  <Route
                    // @ts-ignore
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Router>
    );
  }
}
export default App;
