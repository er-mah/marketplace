import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "flowbite";

import { Auth, NotFoundPage, HomePage } from "./pages";
import "./index.css";
import { DashboardPage } from "./pages/Dashboard.tsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={"/auth/*"} element={<Auth />} />
          <Route path={"/dashboard"} element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
