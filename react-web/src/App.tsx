import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "flowbite";

import { Auth, NotFoundPage, HomePage } from "./pages";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { DashboardPage } from "./pages/Dashboard.tsx";
import VerifyAccountPage from "./pages/user/VerifyAccount.tsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth/*"} element={<Auth />} />
          <Route path={"/dashboard"} element={<DashboardPage />} />
          <Route path="/cuenta/verificar" element={<VerifyAccountPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={"/not-found"} />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
