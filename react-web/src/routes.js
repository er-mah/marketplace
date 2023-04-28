import { Navigate } from "react-router-dom";
import { NotFoundPage, HomePage } from "./pages";
import { DashboardPage } from "./pages/Dashboard.tsx";
import VerifyAccountPage from "./pages/user/VerifyAccount.tsx";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/auth/*",
    children: [
      { path: "", element: <Navigate to="/auth/login" /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/auth" replace /> },
    ],
  },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/cuenta/verificar", element: <VerifyAccountPage /> },
  { path: "/404", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to={"/404"} replace /> },
];

export default routes;
