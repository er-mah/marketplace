import { Navigate } from "react-router-dom";
import { NotFoundPage, HomePage } from "./pages";
import { DashboardPage } from "./pages/Dashboard.tsx";
import VerifyAccountPage from "./pages/user/VerifyAccount.tsx";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import RecoverPasswordPage from "./pages/user/RecoverPassword";
import SetNewPasswordPage from "./pages/user/SetNewPassword";

const routes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/auth/*",
    children: [
      { path: "", element: <Navigate to="/auth/login" /> },
      { path: "login", element: <LoginPage /> },
      { path: "registro", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/auth" replace /> },
    ],
  },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/cuenta/verificar", element: <VerifyAccountPage /> },
  { path: "/cuenta/recuperar", element: <RecoverPasswordPage /> },
  { path: "/cuenta/nuevas-credenciales", element: <SetNewPasswordPage /> },
  { path: "/not-found", element: <NotFoundPage /> },
  { path: "*", element: <Navigate to={"/not-found"} replace /> },
  { path: "/terminos-y-condiciones", element: <NotFoundPage /> },

];

export default routes;
